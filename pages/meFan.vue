<template>
	<view>
		<view class="search">
			<input type="text" />
			<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
		</view>
		<view class="list" v-if="list.length > 0">
			<block v-for="(item,index) in list" :key="index">
				<view class="item">
					<image :src="imgUrl + item.avatar" v-if="item.avatar != ''"></image>
					<image src="../static/a.jpg" v-else></image>
					<view class="con">
						<view>
							<text class="title">{{item.name}}</text>
							<!-- 性别（m 男 f 女 no_set 未设置） -->
							<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-" v-if="item.sex == 'm'"></uni-icon>
							<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-" v-if="item.sex == 'f'"></uni-icon>
							<!-- <text class="label" v-if="item.vip > 1">管理员VIP{{item.vip}}级</text> -->
							<text class="label">{{item.type}}</text>
						</view>
						<view class="info">{{item.signature}}</view>
					</view>
					<view class="operating">
						<view :data-id="item.user_id" :data-index="index" @tap="delFollows">取消</view>
					</view>
				</view>
			</block>
		</view>
		<view class="nullList" v-if="list.length == 0">暂无列表数据</view>
	</view>
</template>

<script>
	const app = getApp()
	import helper from '../common/helper.js';
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			// 加载关注列表
			this.getList()
		},
		methods: {
			getList() {
				// 加载关注列表
				uni.showLoading({
				  title: '加载中...',
					duration: 1000000
				});
				uni.request({
					url: `${helper.requestUrl}/user/fans`,
					method: 'GET',
					header: {
						authorization: app.globalData.token
					},
					success: res => {
						uni.hideLoading();
						res = helper.null2str(res)
						console.log(res)
						if (res.data.status_code == '1') {
							this.list = res.data.data
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'none'
							});
						}
					}
				})
			},
			delFollows(e) {
				let id = e.currentTarget.dataset.id
				let index = e.currentTarget.dataset.index
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
						res = helper.null2str(res)
						console.log(res)
						if (res.data.status_code == '1') {
							this.list.splice(index, 1)
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
				})
			}
		}
	}
</script>

<style >
	.search{
		width: 650rpx;
		height: 70rpx;
		margin: 0 30rpx;
		padding: 0 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #F9F9F9;
	}
	.search .iconfont{
		width: 40rpx;
		height: 40rpx;
		font-size: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.search input{
		width: 640rpx;
		height: 40rpx;
		font-size: 30rpx;
	}
	
	
	.list{
		width: 750rpx;
		height: auto;
	}
	.item{
		width: 690rpx;
		height: 170rpx;
		border-radius: 10rpx;
		background-color: #F9F9F9;
		margin: 20rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	.item image{
		width: 118rpx;
		height: 118rpx;
		border-radius: 118rpx;
		margin: 20rpx;
	}
	.item .con{
		width: 390rpx;
		height: 118rpx;
		border-radius: 118rpx;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		flex-direction: column;
	}
	.item .con view{
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
	.item .label{
		font-size: 18rpx;
		padding: 5rpx 10rpx;
		border-radius: 30rpx;
		color: #fff;
		background-color: #D2BF8E;
	}
	.item .iconfont {
		font-size: 22rpx;
		margin: 0 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.item .con .info{
		color: #666666;
		font-size: 26rpx;
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	.operating{
		width: 100rpx;
		height: 118rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		flex-direction: column;
		padding-left: 20rpx;
	}
	.operating view{
		width: 100rpx;
		height: 60rpx;
		font-size: 26rpx;
		color: #fff;
		background-color: #B8B8B8;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
