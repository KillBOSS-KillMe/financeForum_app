<template>
	<view class="login">
		<view class="item">
			<input type="text" placeholder="请输入用户名/手机号" @input="getLoginName" />
		</view>
		<view class="item">
			<input type="number" style="width: 400rpx;" placeholder="请输入验证码" @input="getLoginName" />
			<view class="getCode">
				<text @tap="getCode">获取验证码</text>
			</view>
		</view>
		<view class="item">
			<input type="password" placeholder="请输入密码" @input="getLoginPaw" />
			<!-- <view class="forget">
				<text @tap="forgetPassword">忘记密码</text>
			</view> -->
		</view>
		<view class="item">
			<input type="password" placeholder="请再次输入密码" @input="getLoginName" />
		</view>
		<view class="item">
			<view class="submit" @tap="login">确定</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			console.log(this.title)
		},
		methods: {
			getLoginName(e) {
				this.loginName = e.detail.value
				console.log(this.loginName)
				
			},
			getLoginPaw(e) {
				this.loginPaw = e.detail.value
				console.log(this.loginPaw)
			}
		}
	}
</script>

<style>
	.login {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 100rpx;
	}
	.item{
		width: 670rpx;
		height: auto;
		padding:0 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		align-content: center;
	}
	input{
		width: 630rpx;
		height: 80rpx;
		border-radius: 10rpx;
		border: 1rpx solid #F8F8F8;
		color: #999999;
		font-size: 30rpx;
		padding: 0 20rpx;
		margin-bottom: 60rpx;
	}
	.getCode{
		margin-bottom: 60rpx;
	}
	.getCode text{
		color: #2390DC;
		font-size: 30rpx;
		border: 1rpx solid #2390DC;
		height: 78rpx;
		line-height: 78rpx;
		border-radius: 10rpx;
		padding: 0 16rpx;
	}
	.submit{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 670rpx;
		height: 80rpx;
		border-radius: 10rpx;
		background-color: #2390DC;
		color: #ffffff;
		font-size: 30rpx;
		font-weight: 600;
	}
	.registered{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 670rpx;
		height: 80rpx;
		border-radius: 10rpx;
		background-color: #ffffff;
		color: #666666;
		font-size: 30rpx;
		font-weight: 600;
	}
</style>
