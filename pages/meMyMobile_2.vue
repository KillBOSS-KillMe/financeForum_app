<template>
	<view>
		<view class="con">
			<view class="item">
				<label>新手机号：</label>
				<input type="number"  @input="inputValue" data-name="mobile"/>
			</view>
			<view class="item IQCode">
				<label>验证码：</label>
				<input type="number"  @input="inputValue" data-name="code"/>
				<view class="getCode" @tap="getCode">{{time}}</view>
			</view>
			<view class="item">
				<label>密码：</label>
				<input type="password" @input="inputValue" data-name="password"/>
			</view>
		</view>
		
		<view class="submit">
			<view @tap="goMyMobile" data-name="meMyMobile_3">确认</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	import helper from '../common/helper.js';
	export default {
		data() {
			return {
				formNode: {
					password: '',
					code: '',
					mobile: '',
					verification_key: ''
				},
				currentTime: 60, // 倒计时初始值
				time: '获取验证码',
				showNo: false
			}
		},
		methods: {
			inputValue(e){
				let formNode = this.formNode
				let name = e.currentTarget.dataset.name
				let value = e.detail.value
				formNode[name] = value
				this.formNode = formNode
				console.log(this.formNode)
			},
			// 获取验证码
			getCode() {
				console.log(1)
				if (this.showNo) {
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
				// uni.showToast({
				// 	title: "请求发送中...",
				// 	icon: 'loading',
				// 	duration: 1000
				// });
				this.showNo = true
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
						this.showNo = false
					}
				}, 1000)
			},
			goMyMobile(e){
				let url = e.target.dataset.name
				
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
				uni.showLoading({
				  title: '修改中...',
					duration: 1000
				});
				uni.request({
					url: `${helper.requestUrl}/user/mobile-replace`, //仅为示例，并非真实接口地址。
					method: 'POST',
					header: {
						authorization: app.globalData.token
					},
					data: this.formNode,
					success: (res) => {
						console.log(res);
						uni.hideLoading();
						res = helper.null2str(res)
						console.log(res)
						if (res.data.status_code == 200) {
							uni.navigateTo({
								url: `/pages/${url}`
							})
						} else {
							uni.showToast({
								title: res.data.message,
								icon: "none"
							});
						}
				
					}
				});
			}
		}
	}
</script>

<style>
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
