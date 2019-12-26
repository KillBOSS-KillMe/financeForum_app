<template>
	<view>
		<view class="head">
			<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
			<span class="title">更换成功</span>
			<span>请使用新手机号新密码进行登录！</span>
		</view>
		
		<view class="submit">
			<view @tap="goMyMobile" data-name="meMyMobile_2">我知道了</view>
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
			goMyMobile(e){
				// 进入个人中心
				uni.reLaunch({
					url: './me'
				});
			}
		}
	}
</script>

<style>
	.head{
		width: 750rpx;
		height: auto;
		height: auto;
		border-top: 2rpx solid #F3F3F3;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
	}
	.head .iconfont{
		width: 172rpx;
		height: 172rpx;
		margin: 60rpx 0;
		border-radius: 172rpx;
		font-size: 130rpx;
		color: #fff;
		background-color: #3e8cfd;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.head .title{
		font-size: 32rpx;
		font-weight: 600;
		color: #333;
		margin-bottom: 30rpx;
	}
	.head span{
		font-size: 28rpx;
		color: #333;
		margin-bottom: 50rpx;
	}

	.submit view{
		width: 630rpx;
		height: 80rpx;
		color: #fff;
		font-size: 32rpx;
		
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 15px;
    border-radius: 2px;
    background-color: #2390DC;
    box-shadow: 5px 5px 5px 0 #2390DC;
    -webkit-box-shadow: #2390DC 0px 0px 10px;
    -moz-box-shadow: #2390DC 0px 0px 10px;
	}
	.submit{
		width: 750rpx;
		height: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 50rpx 0;
	}
</style>
