<template>
	<view>
		<view class="topBorder"></view>
		<view class="list">
			<view class="item">
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
			
		}
	}
</script>

<style>
	.topBorder{
		width: 750rpx;
		height: 16rpx;
		opacity: 1;
		background: #F3F3F3;
	}
	.list{
		width: 750rpx;
		height: auto;
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
