<template>
	<view>
		<!-- <view class="list">
			<view class="item" @tap="goMyMobile" data-name="meMyMobile_2">
				<view>手机号更换</view>
				<view>
					1899999999999
					<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
				</view>
			</view>
		</view> -->
		<view class="head">
			<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
			<span>199999999999</span>
		</view>
		<view class="con">
			<view class="item">
				<label>姓名：</label>
				<input type="text" />
			</view>
			<view class="item">
				<label>身份证：</label>
				<input type="text" />
			</view>
			<view class="item IQCode">
				<label>验证码：</label>
				<input type="text" />
				<view class="getCode">获取验证码</view>
			</view>
		</view>
		
		<view class="submit">
			<view @tap="goMyMobile" data-name="meMyMobile_2">下一步</view>
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
	.head{
		width: 750rpx;
		height: 256rpx;
		height: auto;
		border-top: 2rpx solid #F3F3F3;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
	}
	.head .iconfont{
		width: 95rpx;
		height: 95rpx;
		margin: 35rpx 0;
		border-radius: 95rpx;
		font-size: 62rpx;
		color: #fff;
		background-color: #3e8cfd;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.head span{
		margin-bottom: 50rpx;
	}
	
	.con {
		width: 750rpx;
		height: auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
	}
	.con .item{
		width: 605rpx;
		height: 75rpx;
		padding: 0 20rpx;
		margin: 20rpx 0;
		border: 1rpx solid #dedede;
		border-radius: 10rpx;
		
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	.con label{
		width: 210rpx;
		font-size: 26rpx;	
		font-weight: 600;
	}
	.con input{
		width: 405rpx;
		font-size: 24rpx;
	}
	.con .IQCode input{
		width: 250rpx;
	}
	.con .getCode{
		width: 140rpx;
		color: #ef4c4c;
		font-size: 25rpx;
		display: flex;
		align-items: center;
		justify-content: center;
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
