<template>
	<view class="exchangList">
		<view class="head">
			<view class="headInfo">
				<view class="headLeft">
					<image :src="imgUrl + cityInfo.img" mode=""></image>
					<text>{{ cityInfo.title }}</text>
				</view>
				<text class="follow" @tap="addFollow('city')" v-if="is_follow == 0">关注</text>
				<text class="follow" @tap="addFollow('city')" v-if="is_follow == 1">已关注</text>
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
				<view class="contentItem contentLeft" @tap="getDateil(item.id)" v-if="item.user.id != userInfo">
					<!-- <image :src="item.avatar" mode=""></image> -->
					<image :src="imgUrl + item.user.avatar" mode=""></image>
					<view class="right">
						<view class="title">
							<!-- <text class="headTitle">{{ item.name }}</text> -->
							<text class="headTitle">{{ item.user.name }}</text>
							<!-- <text class="form">{{ item.created_at }}</text> -->
						</view>
						<view class="itemContent">{{ item.content }}</view>
					</view>
				</view>
				<view class="contentItem contentRight" @tap="getDateil(item.id)" v-if="item.user.id == userInfo">
					<image :src="imgUrl + item.user.avatar" mode=""></image>
					<view class="right clearfix">
						<view class="title">
							<!-- <text class="headTitle">{{ item.name }}</text> -->
							<text class="headTitle">{{ item.user.name }}</text>
							<!-- <text class="form">{{ item.created_at }}</text> -->
						</view>
						<view class="itemContent">{{ item.content }}</view>
					</view>
				</view>
			</block>
		</view>
		<view class="bottom">
			<input type="text" :value="inputValue" @input="inputV" placeholder="写评论" placeholder-class="postContent" />
			<uni-icons type="" class="iconfont iconziyuan" @tap="postContent"></uni-icons>
		</view>
		<!-- <button type="default" class="bottom">123</button> -->
		<!-- #ifndef MP-WEIXIN -->
		<!-- <view class="post" @tap="getPost"><uni-icon type="" class="iconfont iconxiepinglun"></uni-icon></view> -->
		<!-- #endif -->
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
			list: [
				// {avatar: 'https://jinrong.beaconway.cn/uploads/files/images/202004/01/1_1585715979_KEJLhcJznd.jpg',name: '来来来',title: 'nxjvnjdxflxzfkjbig',created_at: '2018-10-20',type: '0'},
				// {avatar: 'https://jinrong.beaconway.cn/uploads/files/images/202004/01/1_1585715979_KEJLhcJznd.jpg',name: '来来来',title: 'nxjvnjdxflxzfkjbig',created_at: '2018-10-20',type: '1'},
				// {avatar: 'https://jinrong.beaconway.cn/uploads/files/images/202004/01/1_1585715979_KEJLhcJznd.jpg',name: '来来来',title: 'nxjvnjdxflxzfkjbig',created_at: '2018-10-20',type: '0'},
			],
			page: '1',
			pageList: '1',
			tipList: [],
			total: '',
			is_follow: '',
			token: '',
			inputValue: '',
			userInfo: {}
		};
	},
	onLoad(e) {
		console.log(e);
		this.token = uni.getStorageSync('token');
		this.imgUrl = helper.imgUrl;
		uni.setNavigationBarTitle({
			title: e.title
		});
		this.cityInfo = e;
		this.getList();
		this.see_stickyList();
		this.user();
	},
	methods: {
		user() {
			uni.request({
				url: `${helper.requestUrl}/me`,
				method: 'POST',
				header: {
					authorization: this.token
				},
				success: res => {
					uni.hideLoading();
					res = helper.null2str(res);
					this.userInfo = res.data.id;
					console.log(this.userInfo, '+++++---------------------+++');
				}
			});
		},
		// 发布
		getPost() {
			uni.navigateTo({
				url: `/pages/post?id=${this.cityInfo.id}`
			});
		},
		// 置顶加载更多
		getMore() {
			this.page++;
			this.see_stickyList();
		},
		onReachBottom() {
			this.pageList++;
			this.getList();
		},
		// 跳转帖子详情
		// getDateil(e) {
		// 	uni.navigateTo({
		// 		url: `/pages/articleDetail?id=${e}`
		// 	});
		// },
		inputV(e) {
			console.log(e);
			this.inputValue = e.detail.value;
		},
		postContent() {
			if (this.inputValue == '') {
				uni.showToast({
					title: '请输入发表内容',
					icon: 'none'
				});
				return false;
			}
			uni.request({
				url: `${helper.requestUrl}/message/sendMessageWithCityId`,
				method: 'POST',
				header: {
					authorization: this.token
				},
				data: {
					city_id: this.cityInfo.id,
					content: this.inputValue
				},
				success: res => {
					res = helper.null2str(res);
					console.log(res, '**************');

					if (res.data.status_code == 200) {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						});
						this.list = [];
						this.pageList = '1';
						this.inputValue = '';
						this.getList();
					}
				}
			});
		},
		// 帖子列表
		getList() {
			uni.request({
				url: `${helper.requestUrl}/message/getMessageByCityId`,
				method: 'POST',
				header: {
					authorization: this.token
				},
				data: {
					city_id: this.cityInfo.id,
					page: this.pageList,
					page_size: '10'
				},
				success: res => {
					res = helper.null2str(res);
					console.log(res, '++++++++');

					if (res.data.status_code == 200) {
						console.log(res.data.data.data, '/////////////////////////////////');
						this.list = this.list.concat(res.data.data.data);
						this.is_follow = res.data.is_follow;
					}
				}
			});
		},
		see_stickyList() {
			uni.request({
				url: `${helper.requestUrl}/posts/city-posts`,
				method: 'GET',
				header: {
					authorization: this.token
				},
				data: {
					city_id: this.cityInfo.id,
					see_sticky: '1', //置顶
					page: this.page,
					page_size: '3'
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
					authorization: this.token
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
						this.is_follow = 1;
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
	width: 690rpx;
	padding: 20rpx 30rpx;
}
.exchangList {
	width: 750rpx;
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
	padding: 18rpx 30rpx 100rpx;
	width: 690rpx;
}
.contentItem {
	display: flex;
	justify-content: space-between;
	align-content: flex-start;
	align-items: flex-start;
	padding: 30rpx 0;
}
.contentItem > image {
	width: 80rpx;
	height: 80rpx;
	border-radius: 80rpx;
	overflow: hidden;
}
.contentItem .right {
	width: 574rpx;
}
.contentLeft .right .itemContent {
	/* width: 530rpx; */
	background-color: #218fda;
	color: #ffffff;
	font-size: 26rpx;
	padding: 20rpx;
	border-radius: 0 20rpx 20rpx;
	font-weight: 600;
	display: initial;
}
.contentItem .right .title {
	display: flex;
	justify-content: space-between;
	margin-bottom: 10rpx;
}
.clearfix:after,
.clearfix:before {
	content: '';
	display: table;
}
.clearfix:after {
	clear: both;
}
.clearfix {
	zoom: 1;
}
.headTitle {
	width: 300rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 26rpx;
	text-align: left;
	color: #676767;
	margin-bottom: 10rpx;
}
.contentItem .right .title .form {
	color: #2390dc;
	font-weight: 400;
	width: 170rpx;
	overflow: hidden;
	/* text-overflow: ellipsis; */
	white-space: nowrap;
	font-size: 28rpx;
	font-weight: 700;
	text-align: right;
}
.contentRight {
	flex-direction: row-reverse;
	justify-content: space-between;
}
.contentRight .right .title {
	flex-direction: row-reverse;
}
.contentRight .headTitle {
	text-align: right;
	color: #676767;
}
.contentRight .itemContent {
	text-align: left !important;
	font-size: 26rpx;
	color: #454545;
	font-weight: 600;
	background-color: #f6f6f6;
	display: initial;
	float: right;
	/* width: 530rpx; */
	padding: 20rpx;
	border-radius: 20rpx 0 20rpx 20rpx;
}
/* .contentItem .right .itemContent {
	-webkit-line-clamp: 3;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	font-size: 28rpx;
	font-weight: 700;
/* 	text-align: left;
	color: #666;
	line-height: 46rpx;
} */
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
.bottom {
	width: 690rpx;
	padding: 20rpx 30rpx;
	background-color: #ffffff;
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	justify-content: space-between;
	border-top: 1rpx solid #b8b8b8;
	align-items: center;
}
.bottom input {
	width: 550rpx;
	height: 30rpx;
	padding: 14rpx 20rpx;
	border-radius: 30rpx;
	border: 1rpx solid #b8b8b8;
	color: #000000;
	font-size: 28rpx;
}
.bottom .iconfont {
	color: #b8b8b8;
	font-size: 60rpx;
}
.postContent {
	color: #b8b8b8;
	font-size: 28rpx;
}
</style>
