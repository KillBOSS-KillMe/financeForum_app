<template>
	<view class="paySuccess">
		<image src="../static/logo.png" mode=""></image>
		<text>本次交易支付成功</text>
		<view>
			<button type="primary">返回首页</button>
			<button type="primary">查看会员</button>
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
.paySuccess{
	width: 690rpx;
	padding: 50rpx 30rpx;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
}
.paySuccess image{
	width: 258rpx;
	height: 274rpx;
}
.paySuccess text{
	width: 600rpx;
	text-align: center;
	font-size: 28rpx;
	font-weight: 700;
	color: #737373;
	margin: 20rpx 0;
}
.paySuccess view{
	width: 600rpx;
	display: flex;
	justify-content: space-between;
	margin-top: 40rpx;
}
.paySuccess view button{
	width: 258rpx;
	height: 80rpx;
	line-height: 80rpx;
	font-size: 32rpx;
	font-weight: 700;
}
</style>
