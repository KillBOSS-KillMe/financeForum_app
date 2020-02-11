<template>
	<view class="getQrCode">
		<view class="head"></view>
		<view class="headContent">
			<view class="item">
				<view class="headItem">
					<uni-icon type="" class="iconfont iconhuabanfuben"></uni-icon>
					<text class="itemTitle">请输入账号</text>
				</view>
				<input type="number" class="itemInput" value="" placeholder="请输入账号" />
			</view>
			<view class="item">
				<view class="headItem">
					<uni-icon type="" class="iconfont iconsuo"></uni-icon>
					<text class="itemTitle">请输入密码</text>
				</view>
				<input type="number" class="itemInput" value="" placeholder="请输入密码" />
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
	.getQrCode {
		width: 750rpx;
	}

	.head {
		width: 750rpx;
		height: 140rpx;
		background: #2390DC;
	}
	.headItem{
		display: flex;
		align-items: flex-end;
	}
	.headItem .iconfont{
		color: #2390DC;
		font-size: 24rpx;
		margin-right: 12rpx;
	}
	.headContent {
		width: 642rpx;
		margin: -90rpx 30rpx 30rpx;
		padding: 24rpx;
		height: 258rpx;
		background: #ffffff;
		border-radius: 10rpx;
		box-shadow: 0rpx 10rpx 44rpx 0rpx rgba(192, 192, 192, 0.45);
	}

	.itemTitle {
		font-size: 26rpx;
		font-weight: 700;
		color: #666666;
	}

	.itemInput {
		width: 580rpx;
		background: #f4f4f4;
		border: 1rpx solid #ffffff;
		border-radius: 26rpx;
		padding: 10rpx 30rpx;
		overflow: hidden;
		font-size: 24rpx;
		color: #999;
		margin: 20rpx 0;
	}

	.determine {
		width: 650rpx;
		background: #2390dc;
		border: none;
		position: fixed;
		bottom: 60rpx;
		left: 50rpx;
		box-shadow: 0rpx 10rpx 45rpx 0rpx rgba(35, 144, 220, 0.6);
		border-radius: 60rpx;
		font-size: 32rpx;
		font-weight: 700;
		color: #ffffff;
	}
</style>
