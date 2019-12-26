<template>
	<view class="experience">
		<view class="item">
			<image class="logo" src="../static/logo.png" mode=""></image>
			<text>贷款口子交流</text>
		</view>
		<view class="item">
			<image class="logo" src="../static/logo.png" mode=""></image>
			<text>信用卡交流</text>
		</view>
		<view class="item">
			<image class="logo" src="../static/logo.png" mode=""></image>
			<text>会员帮助中心</text>
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
			
		}
	}
</script>

<style>
.experience{
	width: 690rpx;
	padding: 10rpx 30rpx;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}
.item{
	display: flex;
	margin-bottom: 40rpx;
	align-items: center;
}

.item .logo{
	width: 58rpx;
	height: 58rpx;
	margin-right: 20rpx;
}
.item>text{
	font-size: 30rpx;
	font-weight: 600;
	color: #333333;
}
</style>
