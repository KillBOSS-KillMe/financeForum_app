<template>
	<view>
		<view class="head">
			<view>
				<uni-icon type="" class="iconfont iconshoujihaomaguizheng"></uni-icon>
			</view>
			<span>{{mobile}}</span>
		</view>
		<view class="con">
<!-- 			<view class="item">
				<label>新手机号：</label>
				<input type="text" />
			</view> -->
			<view class="item IQCode">
				<label>验证码：</label>
				<input type="number" @input="inputValue"/>
				<view  class="getCode" v-if="noShow == 0">{{time}}</view>
				<view class="getCode" v-else @tap="getCode">{{time}}</view>
			</view>
		</view>
		
		<view class="submit">
			<view @tap="goMyMobile" data-name="meMyMobile_2">下一步</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	import helper from '../common/helper.js';
	export default {
		data() {
			return {
				mobile: '',
				currentTime: 60, // 倒计时初始值
				time: '获取验证码',
				noShow: 1,
				verification_key: '',
				mobileCode: ''
			}
		},
		onLoad(e) {
			console.log(e)
			this.mobile = e.num
		},
		methods: {
			inputValue(e){
				console.log(e)
				this.mobileCode = e.detail.value
			},
			goMyMobile(e){
				let url = e.target.dataset.name
				if(this.mobileCode == ""){
					uni.showToast({
						title: '请获取验证码',
						icon: 'none'
					})
				}else{
					uni.request({
						url: `${helper.requestUrl}/user/old-mobile-verification`,
						method: 'POST',
						header: {
							authorization: app.globalData.token
						},
						data: {
							code: this.mobileCode,
							verification_key: this.verification_key
						},
						success: (res) => {
							console.log(res);
							uni.hideLoading();
							res = helper.null2str(res)
							if (res.statusCode == 200) {
								uni.navigateTo({
									url: `/pages/${url}`
								})
							} else {
								uni.showToast({
									title: res.data.message
								});
							}
					
						}
					});
				}
				
				// uni.navigateTo({
				// 	url: `/pages/${url}`
				// })
			},
			getCode(){
				uni.request({
					url: `${helper.requestUrl}/send_sms`,
					method: 'POST',
					data: {
						mobile: this.mobile
					},
					success: (res) => {
						console.log(res);
						uni.hideLoading();
						res = helper.null2str(res)
						if (res.statusCode == 200) {
							this.verification_key = res.data.key
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
						this.noShow = 1
					} else if(currentTime > 0){
						this.noShow = 0
					}
					
				}, 1000)
			},
		}
	}
</script>

<style>
	.head{
		width: 750rpx;
		height: 256rpx;
		border-top: 2rpx solid #F3F3F3;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	.head .iconfont{
		font-size: 62rpx;
		color: #fff;
		text-align: center;
	}
	.head>view{
		background-color: #3e8cfd;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 95rpx;
		height: 95rpx;
		margin: 35rpx 0;
		border-radius: 95rpx;
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
