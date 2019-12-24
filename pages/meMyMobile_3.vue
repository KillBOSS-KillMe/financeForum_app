<template>
	<view>
		<view class="list">
			<view class="item" @tap="goMyMobile" data-name="meMyMobile_1">
				<view>手机号更换</view>
				<view>
					1899999999999
					<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
				</view>
			</view>
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
			goMyMobile(e){
				let url = e.target.dataset.name
				uni.navigateTo({
					url: `/pages/${url}`
				})
			}
		}
	}
</script>

<style>
	.list{
		width: 750rpx;
		height: auto;
		border-top: 2rpx solid #F3F3F3;
	}
	.item{
		width: 690rpx;
		height: 90rpx;
		margin: 0 30rpx;
		border-bottom: 2rpx solid #110F53;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #333333;
		font-size: 28rpx;
	}
	.iconfont{
		margin-left: 10rpx;
	}
</style>
