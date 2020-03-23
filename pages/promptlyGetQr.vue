<template>
	<view class="promptlyGetQr">
		<view>
			<view class="item">
				<uni-icon type="" class="iconfont iconhuabanfuben"></uni-icon>
				<input type="text" :value="userInfo.user_setting_account" @input="getValue" data-name="user_setting_account" placeholder="请输入用户名" disabled="disabled"/>
			</view>
			<view class="item">
				<uni-icon type="" class="iconfont iconsuo"></uni-icon>
				<input type="password" @input="getValue" data-name="user_setting_passwd" value="" placeholder="请输入密码" />
			</view>
			<view class="item">
				<input type="text" value="" @input="codeValue" placeholder="请输入验证码" />
				<view class="code" @tap="tapCode">{{arrCode}}</view>
			</view>
		</view>
		<button type="" class="determine" @tap="next(2)">获取推广二维码</button>
	</view>
</template>

<script>
	const app = getApp();
	import helper from '../common/helper.js';
	export default {
		data() {
			return {
				code: '',
				arrCode: '',
				formNode: {
					user_setting_account: '',
					user_setting_passwd: ''
				},
				codeInput: '',
				userInfo: {}
			}
		},
		onLoad() {
			this.tapCode(),
			this.getUserInfo()
		},
		random(a, b) {
			return Math.round(Math.random() * (a - b) + b)
		},
		
		methods: {
			tapCode() {
				this.code = ''
				let arr = []
				let arr1 = []
				for (var i = 0; i < 26; i++) {
					arr.push(String.fromCharCode(65 + i)); //向数组中添加26位大写字母
				}
				for (var i = 0; i < 26; i++) {
					arr.push(String.fromCharCode(97 + i)); //向数组中添加26位小写字母
				}
				for (var j = 0; j <= 9; j++) {
					arr.push(j); // 向数组中添加0-9共10位数字
				}
				for (var m = 0; m < 4; m++) {
					var index=Math.floor(Math.random()*arr.length);
					console.log(index,'888')
					arr1.push(arr[index]);
					
				}
				let arr2 = arr1.join("")
				this.arrCode = arr2.toString()
			},
			getValue(e){
				let formNode = this.formNode
				let name = e.currentTarget.dataset.name
				let value = e.detail.value
				formNode[name] = value
				this.formNode = formNode
			},
			codeValue(e){
				this.codeInput = e.detail.value
				console.log(e)
			},
			next(e) {
				if(this.formNode.user_setting_passwd == ''){
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					})
					return false
				}else if(this.codeInput == ''){
					uni.showToast({
						title: '验证码不正确',
						icon: 'none'
					})
					this.tapCode()
					return false
				}else if(this.codeInput != this.arrCode){
					uni.showToast({
						title: '验证码不正确',
						icon: 'none'
					})
					this.tapCode()
					return false
				}
				uni.request({
					url: `${helper.requestUrl}/promote-createmycode`,
					method: 'POST',
					header: {
						authorization: app.globalData.token
					},
					data: this.formNode,
					success: res => {
						res = helper.null2str(res);
						if(res.data.code == '0'){
							uni.showToast({
								title: res.data.tip_msg,
								icon: "none"
							});
							setTimeout( e =>{
								uni.redirectTo({
									url: `/pages/showCode`
								})
							},1000)
						}else{
							uni.showToast({
								title: res.data.tip_msg,
								icon: "none"
							});
						}
						
					}
				})
			},
			getUserInfo() {
				// 用户信息获取
				uni.showLoading({
				  title: '用户信息获取中...'
				});
				uni.request({
					url: `${helper.requestUrl}/me`,
					method: 'POST',
					header: {
						authorization: app.globalData.token
					},
					success: res => {
						uni.hideLoading();
						res = helper.null2str(res)
						if (res.statusCode == 200) {
							this.userInfo = res.data
							this.formNode.user_setting_account = this.userInfo.user_setting_account
						}
					}
				})
			}
		}
	}
</script>

<style>
	.promptlyGetQr {
		width: 690rpx;
		padding: 30rpx;
	}

	.item {
		width: 630rpx;
		height: 75rpx;
		background: #ffffff;
		box-shadow: 0rpx 1rpx 36rpx 0rpx rgba(212, 212, 212, 0.6);
		border-radius: 36rpx;
		margin-bottom: 30rpx;
		display: flex;
		align-items: center;
		padding: 0 30rpx;
	}

	.item input {
		font-size: 24rpx;
		font-weight: 700;
		color: #b2b2b2;
		width: 580rpx;
	}

	.item .iconfont {
		font-size: 24rpx;
		color: #19B7F8;
		margin-right: 16rpx;
	}

	.item .code {
		/* width: 153rpx; */
		background: rgba(101, 179, 233, 0.8);
		box-shadow: 0rpx 1rpx 36rpx 0rpx rgba(212, 212, 212, 0.6);
		font-size: 26rpx;
		font-weight: 700;
		color: #ffffff;
		border-radius: 60rpx;
		text-align: center;
		padding: 6rpx 24rpx;
		letter-spacing: 4rpx;
	}

	.determine {
		position: fixed;
		border: none;
		color: #fff;
		bottom: 60rpx;
		left: 127rpx;
		font-size: 28rpx;
		font-weight: 700;
		width: 511rpx;
		height: 62rpx;
		background: #4e9ed8;
		line-height: 62rpx;
		text-align: center;
		border-radius: 60rpx;
		box-shadow: 0rpx 15rpx 38rpx 0rpx rgba(78, 158, 216, 0.6);
	}
</style>
