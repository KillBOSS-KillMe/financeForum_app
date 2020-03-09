<template>
	<view class="getQrCode">
		<view class="head"></view>
		<view class="headContent">
			<view class="item">
				<view class="headItem">
					<uni-icon type="" class="iconfont iconhuabanfuben"></uni-icon>
					<text class="itemTitle">请输入账号</text>
				</view>
				<input type="number" class="itemInput" @input="getValue" data-name='user_setting_account' :value="formNode.user_setting_account" placeholder="请输入账号" />
			</view>
			<view class="item">
				<view class="headItem">
					<uni-icon type="" class="iconfont iconsuo"></uni-icon>
					<text class="itemTitle">请输入密码</text>
				</view>
				<input type="password" class="itemInput" @input="getValue" data-name='user_setting_passwd' value="" placeholder="请输入密码" />
			</view>
		</view>
		<button type="" class="determine" @tap="determine">确认</button>
	</view>
</template>

<script>
	const app = getApp()
	import helper from '../common/helper.js';
	export default {
		data() {
			return {
				formNode: {
					user_setting_account: '',
					user_setting_passwd: '',
					post_type: 'post'
				}
			}
		},
		onLoad(e) {
			console.log(e,'n')
			this.formNode.user_setting_account = e.item
		},
		methods: {
			getValue(e){
				let formNode = this.formNode
				let name = e.currentTarget.dataset.name
				let value = e.detail.value
				formNode[name] = value
				this.formNode = formNode
			},
			determine(){
				if(this.formNode.user_setting_account == ''){
					uni.showToast({
						title: '请输入账号',
						icon:'none'
					})
					return false
				}
				if(this.formNode.user_setting_passwd == ''){
					uni.showToast({
						title: '请输入密码',
						icon:'none'
					})
					return false
				}
				if(this.formNode.user_setting_passwd.length <'6'){
					uni.showToast({
						title: '请输入6位数密码',
						icon:'none'
					})
					return false
				}
				uni.request({
					url: `${helper.requestUrl}/promote-getmycode`,
					method: 'POST',
					header: {
						authorization: app.globalData.token
					},
					data: this.formNode,
					success: res => {
						// uni.hideLoading();
						res = helper.null2str(res);
						console.log(res,'**');
						if (res.data.code == 0) {
							uni.showToast({
								title: res.data.tip_msg,
								icon: 'none'
							});
							setTimeout( e =>{
								uni.navigateBack({
									delta: 2
								})
							},2000)
						} else {
							uni.showToast({
								title: res.data.tip_msg,
								icon: 'none'
							});
						}
					}
				});
			}
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
