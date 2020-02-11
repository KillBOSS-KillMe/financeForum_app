<template>
	<view class="commissionSet">
		<view class="head"></view>
		<view class="headContent">
			<view class="item">
				<text class="itemTitle">当前奖励比例</text>
				<view class="itemInput">
					<input type="number" value="" placeholder="请输入奖励比例"/>
					<label>%</label>
				</view>
			</view>
			<view class="item">
				<text class="itemTitle">下级奖励比例</text>
				<view class="itemInput">
					<input type="number" value="" placeholder="请输入奖励比例"/>
					<label>%</label>
				</view>
			</view>
		</view>
		<button type="" class="determine">确认</button>
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
	.commissionSet{
		width: 750rpx;
	}
	.head{
		width: 750rpx;
		height: 140rpx;
		background: #2390DC;
	}
	.headContent{
		width: 642rpx;
		margin: -90rpx 30rpx 30rpx;
		padding: 24rpx;
		height: 258rpx;
		background: #ffffff;
		border-radius: 10rpx;
		box-shadow: 0rpx 10rpx 44rpx 0rpx rgba(192,192,192,0.45); 
	}
	.itemTitle{
		font-size: 26rpx;
		font-weight: 700;
		color: #666666;
	}
	.itemInput{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 18rpx 0;
	/* 	width: 600rpx;
		height: 26rpx;
		background: #f4f4f4;
		border: 1rpx solid #ffffff;
		border-radius: 23rpx;
		padding: 10rpx 20rpx;
		overflow: hidden; */
	}
	.itemInput input{
			width: 546rpx;
			background: #f4f4f4;
			border: 1rpx solid #ffffff;
			border-radius: 26rpx;
			padding: 10rpx 30rpx;
			overflow: hidden;
			font-size: 24rpx;
			color: #999;
	}
	.itemInput label{
		font-size: 20rpx;
		font-weight: 700;
		color: #666666;
		vertical-align: middle;
	}
	.determine{
		width: 650rpx;
	
		background: #2390dc;
		border: none;
		position: fixed;
		bottom: 60rpx;
		left: 50rpx;
		box-shadow: 0rpx 10rpx 45rpx 0rpx rgba(35,144,220,0.6); 
		border-radius: 60rpx;
		font-size: 32rpx;
		font-weight: 700;
		color: #ffffff;
	}
</style>
