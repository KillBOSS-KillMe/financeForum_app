<template>
	<view class="exchangList">
		<view class="head">
			<view class="headInfo">
				<view class="headLeft">
					<view><uni-icon type="" class="iconfont" :class="cityInfo.img"></uni-icon></view>
					<text>{{ cityInfo.title }}</text>
				</view>
				<text class="follow" @tap="addFollow('board')" v-if="is_follow == 0">关注</text>
				<text class="follow" @tap="addFollow('board')" v-if="is_follow == 1">已关注</text>
			</view>
			<view class="headList">
				<block v-for="(item, index) in tipList" :key="index">
					<view class="headItem" @tap="getDateil(item.id)">
						<text class="tip">置顶</text>
						<text class="text">{{ item.title }}</text>
					</view>
				</block>
				<text class="more" @tap="getMore" v-if="tipList.length < total">查看更多</text>
			</view>
		</view>
		<view class="content">
			<block v-for="(item, index) in list" :key="index">
				<view class="contentItem" @tap="getDateil(item.id)">
					<image :src="imgUrl + item.user.avatar" mode=""></image>
					<view class="right">
						<view class="title">
							<text class="headTitle">{{ item.user.name }}</text>
							<text class="form">来自 {{ item.from_board }}</text>
						</view>
						<view class="itemContent">{{ item.title }}</view>
						<view class="icon">
							<text>{{ item.created_at }}</text>
							<view class="iconRight">
								<view>
									<uni-icon type="" class="iconfont icondianzan"></uni-icon>
									<text>{{ item.like }}</text>
								</view>
								<view>
									<uni-icon type="" class="iconfont iconhuifu"></uni-icon>
									<text>{{ item.comments_count }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>
		<!-- <view class="post" @tap="getPost"><uni-icon type="" class="iconfont iconzhizhang5"></uni-icon></view> -->
	</view>
</template>

<script>
const app = getApp();
import helper from '../common/helper.js';
export default {
	data() {
		return {
			imgUrl: '',
			cityInfo: {},
			see_sticky: '',
			list: [],
			page: '1',
			pageList: '1',
			tipList: [],
			total: '',
			is_follow: ''
		};
	},
	onLoad(e) {
		console.log(e);
		this.imgUrl = helper.imgUrl;
		uni.setNavigationBarTitle({
			title: e.title
		});
		this.cityInfo = e;
		this.getBordList()
		this.getSee_stickyList()
	},
	methods: {
		// 发布
		getPost() {
			uni.navigateTo({
				url: `/pages/post?id=${38}&type=${'网友交流'}`
			});
		},
		// 置顶加载更多
		getMore() {
			this.page++;
			this.getSee_stickyList()
		},
		onReachBottom(){
			this.pageList++;
			this.getBordList()
		},
		// 跳转帖子详情
		getDateil(e) {
			uni.navigateTo({
				url: `/pages/articleDetail?id=${e}`
			});
		},
		getBordList() {
			uni.request({
				url: `${helper.requestUrl}/posts/board-posts`,
				method: 'GET',
				header: {
					authorization: app.globalData.token
				},
				data: {
					see_sticky: '0', //帖子
					board_id: this.cityInfo.id,
					bank_id: '0',
					child_id: '0',
					page: this.pageList,
					page_size: '10'
				},
				success: res => {
					res = helper.null2str(res);
					console.log(res, '++++++++');
					if (res.data.status_code == 200) {
						this.list = this.list.concat(res.data.data);
						this.is_follow = res.data.is_follow
					}
				}
			});
		},
		// 网友交流
		getSee_stickyList() {
			uni.request({
				url: `${helper.requestUrl}/posts/board-posts`,
				method: 'GET',
				header: {
					authorization: app.globalData.token
				},
				data: {
					board_id: this.cityInfo.id,
					bank_id: '0',
					child_id: '0',
					see_sticky: '1', //置顶
					page: this.page,
					page_size: '3',
				},
				success: res => {
					res = helper.null2str(res);
					console.log(res, '++++++++');
					if (res.data.status_code == 200) {
						this.total = res.data.total;
						this.tipList = this.tipList.concat(res.data.data);
					}
				}
			});
		},
		addFollow(type) {
			// 关注用户
			uni.request({
				url: `${helper.requestUrl}/user/add_follow`,
				method: 'POST',
				header: {
					authorization: app.globalData.token
				},
				data: {
					follow_id: this.cityInfo.id,
					type: type
				},
				success: res => {
					uni.hideLoading();
					res = helper.null2str(res);
					console.log(res);
					if (res.data.status_code == 200) {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 2000
						});
						this.is_follow = 1
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						});
					}
				}
			});
		}
	}
};
</script>

<style>
page {
	background-color: #f8f8f8;
}
.head {
	padding: 18rpx;
	background-color: #ffffff;
	border-radius: 8rpx;
}
.exchangList {
	width: 690rpx;
	margin: 20rpx 30rpx;
}
.headInfo {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1rpx solid #e8e8e8;
	padding-bottom: 10rpx;
}
.headInfo .headLeft {
	display: flex;
	align-items: center;
}
.headLeft>view{
	width: 90rpx;
	height: 90rpx;
	border-radius: 90rpx;
	display: flex;
	justify-content: center;
	align-content: center;
	align-items: center;
	margin: 0 auto;
	color: #ffffff !important;
	font-size: 48rpx;
	margin-right: 14rpx;
	background-image: linear-gradient(#F9A2A2, #F46969);
}
.post {
	width: 96rpx;
	height: 96rpx;
	border-radius: 96rpx;
	display: flex;
	justify-content: center;
	align-content: center;
	align-items: center;
	margin: 0 auto;
	background-image: linear-gradient(#a1ddf9, #6bd2f4);
	position: fixed;
	z-index: 9;
	right: 0;
	top: 60vh;
}
.post .iconfont {
	color: #ffffff !important;
	font-size: 46rpx;
}
.headInfo .headLeft image {
	width: 100rpx;
	height: 100rpx;
	overflow: hidden;
	border-radius: 8rpx;
	margin-right: 14rpx;
}
.headInfo .headLeft > text {
	font-size: 28rpx;
	color: #000000;
	-webkit-line-clamp: 1;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
}
.headInfo > text {
	padding: 6rpx 18rpx;
	background-color: #2390dc;
	border-radius: 10rpx;
	color: #ffffff;
	font-size: 26rpx;
}
.headList .headItem {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-top: 16rpx;
}
.headList .headItem .tip {
	color: #e22929;
	font-size: 22rpx;
	border: 1rpx solid #e22929;
	padding: 0 10rpx;
	border-radius: 8rpx;
	margin-right: 12rpx;
}
.headList .headItem .text {
	width: 542rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 26rpx;
	text-align: left;
	color: #333333;
}
.more {
	font-size: 26rpx;
	text-align: center;
	color: #999;
	border-top: 1rpx solid #e8e8e8;
	padding-top: 16rpx;
	margin-top: 16rpx;
}
.content {
	margin-top: 18rpx;
	background-color: #ffffff;
	border-radius: 8rpx;
	padding: 18rpx;
}
.contentItem {
	display: flex;
	justify-content: space-between;
	align-content: flex-start;
	align-items: flex-start;
	margin-bottom: 40rpx;
}
.contentItem > image {
	width: 80rpx;
	height: 80rpx;
	border-radius: 80rpx;
	overflow: hidden;
}
.contentItem .right {
	width: 560rpx;
}
.contentItem .right .title {
	display: flex;
	justify-content: space-between;
}
.headTitle {
	width: 300rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 28rpx;
	font-weight: 700;
	text-align: left;
	color: #333333;
}
.contentItem .right .title .form {
	color: #2390dc;
	font-weight: 400;
	width: 250rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 28rpx;
	font-weight: 700;
	text-align: right;
}
.contentItem .right .itemContent {
	-webkit-line-clamp: 3;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	font-size: 28rpx;
	font-weight: 700;
	text-align: left;
	color: #666;
}
.contentItem .right .icon {
	display: flex;
	justify-content: space-between;
	margin-top: 8rpx;
}
.contentItem .right .icon .iconRight,
.contentItem .right .icon .iconRight > view {
	display: flex;
	align-items: center;
}

.contentItem .right .icon text {
	font-size: 24rpx;
	font-weight: 400;
	text-align: left;
	color: #999999;
}
.contentItem .right .iconfont {
	font-size: 26rpx;
	color: #999999;
	margin: 0 6rpx 0 10rpx;
}
</style>
