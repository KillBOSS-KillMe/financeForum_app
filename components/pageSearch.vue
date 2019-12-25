<template>
	<view class="pageSearch">
		<uni-icon type="" @tap="goCode" class="iconfont iconsaoyisao"></uni-icon>
		<!-- <image class="code" src="../static/a.jpg" mode=""></image> -->
		<view class="searchBox">
			<input type="text" @input="getSearchKey" />
		</view>
		<image class="service" src="../static/b.jpg" mode=""></image>
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
			getSearchKey(e) {
				console.log(e.detail.value)
				this.searchKey = e.detail.value
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
		border-radius: 50rpx;
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
