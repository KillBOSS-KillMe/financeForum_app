<template>
	<view class="paySuccess">
		<image src="../static/success.png" mode=""></image>
		<text>本次交易支付成功</text>
		<view>
			<button type="" @tap="payClick(1)">返回首页</button>
			<button type="" @tap="payClick(2)">查看会员</button>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	import helper from '../common/helper.js';
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			payClick(e){
				console.log(e)
				if(e== 1){
					uni.reLaunch({
						url:'/pages/index'
					})
				}else if(e == 2){
					uni.reLaunch({
						url:'/pages/me'
					})
				}
			}
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
	color: #fff;
	background: #2390DC;
	border:none;
}
</style>
