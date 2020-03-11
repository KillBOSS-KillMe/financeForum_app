<template>
	<view class="pageSearch">
		<uni-icon type="" @tap="goCode" class="iconfont iconsaoyisao"></uni-icon>
		<!-- <image class="code" src="../static/imgLost.png" mode=""></image> -->
		<view class="searchBox" @tap="goSearch">
			<input type="text" disabled />
		</view>
		<view class="service" @tap="goMe">
			<uni-icon type="" class="iconfont iconyonghuguanli"></uni-icon>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			goCode() {
				uni.scanCode({
					success: res => {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
			},
			goSearch() {
				// 进入搜索页
				uni.navigateTo({
					url: `/pages/search`
				})
			},
			goMe() {
				// 进入个人中心
				uni.switchTab({
					url: `/pages/me`
				})
			}
		}
	}
</script>

<style>
	.pageSearch {
		width: 690rpx;
		background: #2390DC;
		padding: 20rpx 30rpx;
		display: flex;
		justify-content: space-between;
		align-content: center;
		align-items: center;
	}

	.service {
		width: 60rpx;
		height: 60rpx;
		border-radius: 60rpx;
		background: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
	}
 .service .iconfont{
	 font-size: 36rpx;
	 color: #999999;
 }
	.code {
		width: 50rpx;
		height: 50rpx;
	}

	.searchBox {
		width: 532rpx;
		height: 70rpx;
		background: #fff;
		border-radius: 10rpx;
	}
	.searchBox input {
		width: 492rpx;
		height: 70rpx;
		padding: 0 20rpx;
	}

	.iconsaoyisao {
		color: #fff;
		width: 50rpx;
		height: 50rpx;
		font-size: 50rpx;
	}
</style>
