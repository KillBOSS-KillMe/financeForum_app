<template>
	<view class="meFollow">
		<view class="inv-h-w">
			<view :class="['inv-h', Inv == 0 ? 'inv-h-se' : '']" @tap="changeTab(0)">板块</view>
			<view :class="['inv-h', Inv == 1 ? 'inv-h-se' : '']" @tap="changeTab(1)">城市</view>
			<view :class="['inv-h', Inv == 2 ? 'inv-h-se' : '']" @tap="changeTab(2)">人</view>
		</view>
		<view class="list" v-if="Inv == 0">
			<block v-for="(item, index) in list" :key="index">
				<view class="item">
					<image :src="imgUrl + item.icon" v-if="item.icon != ''"></image>
					<image src="../static/imgLost.png" v-else></image>
					<view class="con">
						<view>
							<text class="title">{{ item.title }}</text>
						</view>
						<view class="info">{{ item.introduction }}</view>
					</view>
					<view class="operating"><view :data-id="item.follow_id" :data-index="index" @tap="delFollows">取消</view></view>
				</view>
			</block>
		</view>
		<view class="list" v-if="Inv == 1">
			<block v-for="(item, index) in list" :key="index">
				<view class="item">
					<image :src="imgUrl + item.icon" v-if="item.icon != ''"></image>
					<image src="../static/imgLost.png" v-else></image>
					<view class="con">
						<view>
							<text class="title">{{ item.city_name }}</text>
						</view>
					</view>
					<view class="operating"><view :data-id="item.follow_id" :data-index="index" @tap="delFollows">取消</view></view>
				</view>
			</block>
		</view>
		<view class="list" v-if="Inv == 2">
			<block v-for="(item, index) in list" :key="index">
				<view class="item">
					<image :src="imgUrl + item.avatar" v-if="item.avatar != ''"></image>
					<image src="../static/imgLost.png" v-else></image>
					<view class="con">
						<view>
							<text class="title">{{ item.name }}</text>
							<!-- 性别（m 男 f 女 no_set 未设置） -->
							<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-" v-if="item.sex == 'm'"></uni-icon>
							<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-" v-if="item.sex == 'f'"></uni-icon>
							<!-- <text class="label" v-if="item.vip > 1">管理员VIP{{item.vip}}级</text> -->
							<text class="label">{{ item.type }}</text>
						</view>
						<view class="info">{{ item.signature }}</view>
					</view>
					<view class="operating"><view :data-id="item.follow_id" :data-index="index" @tap="delFollows">取消</view></view>
				</view>
			</block>
		</view>
		
	</view>
</template>

<script>
const app = getApp();
import helper from '../common/helper.js';
export default {
	data() {
		return {
			list: [],
			imgUrl: '',
			Inv: '0',
			tabType: 'board'
		};
	},
	onLoad() {
		// 加载关注列表
		this.getList()
		this.imgUrl = helper.imgUrl;
	},
	methods: {
		changeTab(e) {
			console.log(e);
			this.Inv = e;
			this.page = '1';
			if (this.Inv == 0) {
				// 最新
				this.tabType = 'board';
			} else if (this.Inv == 1) {
				// 热门
				this.tabType = 'city';
			} else if (this.Inv == 2) {
				// 推荐
				this.tabType = 'user';
			}
			this.list = [];
			this.getList();
		},

		getList() {
			// 加载关注列表
			uni.request({
				url: `${helper.requestUrl}/user/follows`,
				method: 'GET',
				header: {
					authorization: app.globalData.token
				},
				data:{
					type: this.tabType
				},
				success: res => {
					res = helper.null2str(res);
					console.log(res);
					if (res.data.status_code == '200') {
						this.list = res.data.data;
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						});
					}
				}
			});
		},
		delFollows(e) {
			let id = e.currentTarget.dataset.id;
			let index = e.currentTarget.dataset.index;
			uni.showLoading({
				title: '执行中...',
				duration: 1000000
			});
			uni.request({
				url: `${helper.requestUrl}/user/del_follow`,
				method: 'POST',
				header: {
					authorization: app.globalData.token
				},
				data: {
					follow_id: id
				},
				success: res => {
					uni.hideLoading();
					res = helper.null2str(res);
					console.log(res);
					if (res.data.status_code == '1') {
						this.list.splice(index, 1);
						uni.showToast({
							title: res.data.message
						});
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
.meFollow {
	width: 690rpx;
	padding: 30rpx;
}
.inv-h-w {
	display: flex;
}
.inv-h {
	font-size: 32rpx;
	flex: 1;
	text-align: center;
	color: #999999;
	font-weight: 600;
}
.inv-h-se {
	color: #2390dc;
	font-weight: 600;
}
.inv-h-se:after {
	content: ' ';
	display: block;
	border-bottom: 6rpx solid #2390dc;
	width: 46rpx;
	margin: 10rpx auto 0;
	border-radius: 3rpx;
}

.search {
	width: 650rpx;
	height: 70rpx;
	margin: 0 30rpx;
	padding: 0 20rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: #f9f9f9;
}
.search .iconfont {
	width: 40rpx;
	height: 40rpx;
	font-size: 40rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.search input {
	width: 640rpx;
	height: 40rpx;
	font-size: 30rpx;
}

.list {
	width: 690rpx;
	height: auto;
}
.item {
	width: 690rpx;
	height: 170rpx;
	border-radius: 10rpx;
	background-color: #f9f9f9;
	margin: 20rpx 30rpx;
	display: flex;
	align-items: center;
	justify-content: flex-start;
}
.item image {
	width: 118rpx;
	height: 118rpx;
	border-radius: 118rpx;
	margin: 20rpx;
}
.item .con {
	width: 390rpx;
	height: 118rpx;
	border-radius: 118rpx;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	flex-direction: column;
}
.item .con view {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.item .title {
	font-size: 24rpx;
	margin: 0 10rpx;
	font-size: 24rpx;
	font-weight: 600;
	color: #333333;
}
.item .label {
	font-size: 18rpx;
	padding: 5rpx 10rpx;
	border-radius: 30rpx;
	color: #fff;
	background-color: #d2bf8e;
}
.item .iconfont {
	font-size: 22rpx;
	margin: 0 10rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.item .con .info {
	color: #666666;
	font-size: 26rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}
.operating {
	width: 100rpx;
	height: 118rpx;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex-direction: column;
	padding-left: 20rpx;
}
.operating view {
	width: 100rpx;
	height: 60rpx;
	font-size: 26rpx;
	color: #fff;
	background-color: #b8b8b8;
	border-radius: 10rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
