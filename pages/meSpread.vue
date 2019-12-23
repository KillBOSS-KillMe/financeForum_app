<template>
	<view class="meSpread">
		<view class="head">
			<view class="meSpreadHead">
				<text class="balance">总余额</text>
				<text class="money">￥13254</text>
				<button class="withdraw" type="primary">提现</button>
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
.meSpread{
	width: 750rpx;
}
.head{
	width: 690rpx;
	padding: 10rpx 30rpx;
	background: #2390DC;
	height: 184rpx;
}
.head .meSpreadHead{
	width: 690rpx;
	height: 290rpx;
	background: #fff;
	box-shadow: 0px 1px 26px 0px rgba(202,202,202,0.6);
	border-radius: 10rpx;
	margin-top: 60rpx;
}
.balance{
	text-align: center;
	font-size: 30rpx;
	font-weight: 700;
	color: #737373;
	border-bottom: 1rpx solid #ECECEC;
	padding:30rpx 0;
	margin: 0 30rpx;
}
.money{
	font-size: 40rpx;
	font-weight: 700;
	color: #2390DC;
	text-align: center;
	margin: 44rpx 0;
}
.withdraw{
	width: 259rpx;
	height: 70rpx;
	background: #2390DC;
	box-shadow: 0px 10px 45px 0px rgba(35,144,220,0.6);
}
</style>
