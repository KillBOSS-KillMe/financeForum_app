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
			<!-- #ifdef MP-WEIXIN -->
				<view class="submit" @tap="wxGetCode">登录</view>
			<!-- #endif -->
			<!-- #ifdef APP-PLUS || H5 -->
				<view class="submit" @tap="appLogin">登录</view>
			<!-- #endif -->
			
		</view>
		<view class="item">
			<view class="registered" @tap="goRegistered">注册</view>
		</view>
		<!-- #ifdef APP-PLUS || H5 -->
		<view class="tip">登录即代表同意<text @tap="getTip(1)">"用户协议"</text>和<text  @tap="getTip(2)">"隐私政策"</text></view>
			<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="skip">
			<text @tap="getSkip">取消</text>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	const app = getApp()
	import helper from '../common/helper.js';
	export default {
		data() {
			return {
				loginPaw: '',
				loginName: '',
				token: ''
			}
		},
		onShow() {
			// uni.hideHomeButton()
		},
		onLoad() {
			console.log(helper.requestUrl)
		},
		methods: {
			getSkip() {
				console.log(123)
				uni.switchTab({
					url: '/pages/index'
				});
			},
			getTip(e){
				console.log(e)
				uni.navigateTo({
					url: `/pages/tip?type=${e}`
				})
			},
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
			// #ifdef MP-WEIXIN
				// 微信小程序获取code
				wxGetCode() {
					uni.login({
						success: res => {
							console.log(res.data)
							if (res.code) {
								//发起网络请求
								this.login(res.code)
								console.log(res.code)
							} else {
								console.log('登录失败！' + res.errMsg)
							}
						}
					});
				},
			// #endif
			appLogin() {
				this.login()
			},
			login(code = '') {
				if (this.loginName == '') {
					uni.showToast({
						title: '请输入手机号或者用户名',
						icon: 'none',
						duration: 2000
					});
					return false
				}
				if (this.loginPaw == '') {
					uni.showToast({
						title: '请输入密码',
						icon: 'none',
						duration: 2000
					});
					return false
				}
				uni.showLoading({
				  title: '登录中...',
					duration: 10000
				});
				console.log(code)
				uni.request({
					url: `${helper.requestUrl}/login`,
					method: 'POST',
					data: {
						username: this.loginName,
						password: this.loginPaw,
						wx_code: code
					},
					success: res => {
						console.log(res);
						uni.hideLoading();
						res = helper.null2str(res)
						if (res.statusCode == 200) {
							// 登录的账号和密码存入缓存
							uni.setStorageSync('login_name', this.loginName);
							uni.setStorageSync('login_pwd', this.loginPaw);
							console.log(res.data.token_type+res.data.access_token)
							// let newToken=new Array(res.data.token_type, res.data.access_token);
							// newToken.join('  ');
							// console.log(newToken)
							
							uni.showToast({
								title: '登录成功',
								icon: "none"
							});
							this.token = `${res.data.token_type} ${res.data.access_token}`
							uni.setStorageSync('token',this.token)
							setTimeout(() => {
								// 进入登录页
								uni.reLaunch({
									url: './index'
								});
							}, 1000)
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'none'
							});
						}
					}
				});
			},
			null2str(res) {
				for (let x in res) {
					if (res[x] === null) { // 如果是null 把直接内容转为 ''
						res[x] = ''
					} else {
						if (Array.isArray(res[x])) { // 是数组遍历数组 递归继续处理
							res[x] = res[x].map(z => {
								return this.null2str(z)
							})
						}
						if (typeof(res[x]) === 'object') { // 是json 递归继续处理
							res[x] = this.null2str(res[x])
						}
					}
				}
				return res
			}
		},

	}
</script>

<style lang="scss">
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
	.skip{
		display: flex;
		align-items: center;
		justify-content: flex-end;
		width: 670rpx;
		border-radius: 10rpx;
		color: #666666;
		font-size: 30rpx;
		font-weight: 600;
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
	.tip{
		width: 690rpx;
		display: flex;
		color: #666666;
		font-size: 26rpx;
		justify-content: center;
		margin-top: 20rpx;
		text{
			color: #033d5d;
		}
	}
</style>
