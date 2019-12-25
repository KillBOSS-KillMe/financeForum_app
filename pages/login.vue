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
	const app = getApp()
	export default {
		data() {
			return {
				loginPaw: '',
				loginName: ''
			}
		},
		onLoad() {

		},
		methods: {
			// 获取登录名
			getLoginName(e) {
				this.loginName = e.detail.value
			},
			// 获取密码
			getLoginPaw(e) {
				this.loginPaw = e.detail.value
			},
			// 进入忘记密码页
			goForgetPassword() {
				uni.navigateTo({
					url: '/pages/forgetPassword'
				});
			},
			// 进入注册页
			goRegistered() {
				uni.navigateTo({
					url: `/pages/registered`
				});
			},
			login() {
				console.log(this.loginName, this.loginPaw)
				if (this.loginName == '') {
					uni.showToast({
						title: "请输入手机号或者用户名",
						icon: 'none',
						duration: 2000
					});
					return false
				}
				if (this.loginPaw == '') {
					uni.showToast({
						title: "请输入密码",
						icon: 'none',
						duration: 2000
					});
					return false
				}
				uni.showToast({
					title: "登录中...",
					icon: 'loading',
					duration: 10000
				})
				uni.request({
					url: `${app.globalData.requestUrl}/login`,
					method: 'POST',
					data: {
						username: this.loginName,
						password: this.loginPaw
					},
					success: (res) => {
						console.log(res);
						if (res.statusCode == 200) {
							uni.showToast({
								title: '登录成功',
								icon: "none"
							});
							console.log(res.data.access_token)
							app.globalData.token = `${res.data.token_type} ${res.data.access_token}`
							console.log(app.globalData.token)
							uni.reLaunch({
								url: './index'
							});
						} else {
							uni.showToast({
								title: res.data.message,
								icon: "none"
							});
						}
					}
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

	.item {
		width: 670rpx;
		height: auto;
		padding: 40rpx;
	}

	input {
		width: 630rpx;
		height: 80rpx;
		border-radius: 10rpx;
		background-color: #F8F8F8;
		color: #333333;
		font-size: 30rpx;
		padding: 0 20rpx;
	}

	.forget {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		font-size: 23rpx;
		color: #999999;
		padding-top: 20rpx;
	}

	.submit {
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

	.registered {
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
