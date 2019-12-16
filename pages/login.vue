<template>
	<view class="login">
		<view class="item">
			<input type="text" placeholder="请输入用户名/手机号" @input="getLoginName" />
		</view>
		<view class="item">
			<input type="password" placeholder="请输入密码" @input="getLoginPaw" />
			<view class="forget">
				<text @tap="goForgetPassword">忘记密码</text>
			</view>
		</view>
		<view class="item">
			<view class="submit" @tap="login">登录</view>
		</view>
		<view class="item">
			<view class="registered" @tap="goRegistered">注册</view>
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
			// 获取登录名
			getLoginName(e) {
				this.loginName = e.detail.value
				console.log(this.loginName)
			},
			// 获取密码
			getLoginPaw(e) {
				this.loginPaw = e.detail.value
				console.log(this.loginPaw)
			},
			// 进入忘记密码页
			goForgetPassword() {
				console.log(1111)
				uni.navigateTo({
					url: '../forgetPassword/forgetPassword'
				});
			},
			// 进入注册页
			goRegistered() {
				uni.navigateTo({
					url: `../registered/registered`
				});
			}
		},
		
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
		padding: 40rpx;
	}
	input{
		width: 630rpx;
		height: 80rpx;
		border-radius: 10rpx;
		background-color: #F8F8F8;
		color: #333333;
		font-size: 30rpx;
		padding: 0 20rpx;
	}
	.forget{
		display: flex;
		align-items: center;
		justify-content: flex-end;
		font-size: 23rpx;
		color: #999999;
		padding-top: 20rpx;
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
