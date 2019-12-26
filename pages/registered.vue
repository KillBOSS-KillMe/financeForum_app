<template>
	<view class="login">
		<view class="item">
			<input type="text" placeholder="请输入手机号" @input="getLoginName" data-name="mobile" />
		</view>
		<view class="item">
			<input type="number" style="width: 400rpx;" data-name="code" placeholder="请输入验证码" @input="getLoginName" />
			<view class="getCode">
				<text @tap="getCode">{{time}}</text>
			</view>
		</view>
		<view class="item">
			<input type="password" placeholder="请输入密码" data-name="password" @input="getLoginName" />
		</view>
		<view class="item">
			<input type="password" placeholder="请再次输入密码" data-name="password1" @input="getLoginName" />
		</view>
		<view class="item">
			<view class="submit" @tap="login">立即注册</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	import helper from '../common/helper.js';
	export default {
		data() {
			return {
				title: 'Hello',
				disabled: false,
				currentTime: 60, // 倒计时初始值
				time: '获取验证码',
				formNode: {
					mobile: '', // 手机号
					code: '', // 验证码
					password: '', //密码
					verification_key: '', //
					password1: ''
				}
			}
		},
		onLoad() {
			console.log(this.title)
		},
		methods: {
			getLoginName(e) {
				let formNode = this.formNode
				let name = e.currentTarget.dataset.name
				let value = e.detail.value
				formNode[name] = value
				this.formNode = formNode
				// this.loginName = e.detail.value
				console.log(this.formNode)

			},
			// 获取验证码
			getCode() {
				if (this.disabled) {
					return false
				}
				if (this.formNode.mobile == '') {
					wx.showToast({
						title: "请输入手机号",
						icon: 'none',
						duration: 2000
					});
					return false
				}
				if (this.formNode.mobile.length != 11) {
					wx.showToast({
						title: "请输入正确的手机号",
						icon: 'none',
						duration: 2000
					});
					return false
				}
				uni.showToast({
					title: "请求发送中...",
					icon: 'loading',
					duration: 1000
				});
				this.disabled = true
				console.log(helper.requestUrl)
				uni.showLoading({
				  title: '加载中...',
					duration: 1000000
				});
				uni.request({
					url: `${helper.requestUrl}/send_sms`,
					method: 'POST',
					data: {
						mobile: this.formNode.mobile
					},
					success: (res) => {
						console.log(res);
						uni.hideLoading();
						res = helper.null2str(res)
						if (res.statusCode == 200) {
							this.formNode.verification_key = res.data.key
							this.countdown();
						} else {
							uni.showToast({
								title: res.data.message
							});
						}

					}
				});
			},
			//倒计时
			countdown() {
				var currentTime = this.currentTime;
				this.time = `倒计时${currentTime}秒`
				var interval = setInterval(() => {
					this.time = '倒计时' + (currentTime - 1) + '秒'
					currentTime--
					if (currentTime <= 0) {
						clearInterval(interval)
						this.time = '重新获取'
						this.currentTime = 60
						this.disabled = false
					}
				}, 1000)
			},
			//立即注册
			login() {
				if (this.formNode.mobile == '') {
					uni.showToast({
						title: "请输入手机号",
						icon: 'none',
						duration: 2000
					});
					return false
				}
				if (this.formNode.mobile.length != 11) {
					uni.showToast({
						title: "请输入正确的手机号",
						icon: 'none',
						duration: 2000
					});
					return false
				}
				if (this.formNode.code == '') {
					uni.showToast({
						title: "请输入验证码",
						icon: 'none',
						duration: 2000
					});
					return false
				}
				if (this.formNode.password == '') {
					uni.showToast({
						title: "请输入密码",
						icon: 'none',
						duration: 2000
					});
					return false
				}
				if (this.formNode.password1 == '') {
					uni.showToast({
						title: "请确认密码",
						icon: 'none',
						duration: 2000
					});
					return false
				}
				if (this.formNode.password != this.formNode.password1) {
					uni.showToast({
						title: "请输入密码一致",
						icon: 'none',
						duration: 2000
					});
					return false
				}
				// uni.showToast({
				// 	title: "注册中...",
				// 	icon: 'loading',
				// 	duration: 1000000
				// })
				uni.showLoading({
				  title: '注册中...',
					duration: 1000000
				});
				uni.request({
					url: `${helper.requestUrl}/register`, //仅为示例，并非真实接口地址。
					method: 'POST',
					data: this.formNode,
					success: (res) => {
						console.log(res);
						uni.hideLoading();
						res = helper.null2str(res)
						if (res.data.status_code == 1) {
							uni.showToast({
								title: res.data.message,
							});
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
		padding: 0 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		align-content: center;
	}

	input {
		width: 630rpx;
		height: 80rpx;
		border-radius: 10rpx;
		border: 1rpx solid #F8F8F8;
		color: #999999;
		font-size: 30rpx;
		padding: 0 20rpx;
		margin-bottom: 60rpx;
	}

	.getCode {
		margin-bottom: 60rpx;
	}

	.getCode text {
		color: #2390DC;
		font-size: 30rpx;
		border: 1rpx solid #2390DC;
		height: 78rpx;
		line-height: 78rpx;
		border-radius: 10rpx;
		padding: 0 16rpx;
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
