<template>
	<view class="payType">
		<view class="head">
			<text>您本次交易需要支付的金额</text>
			<view>
				<text>RMB.</text>
				<text class="money">{{options.money}}</text>
			</view>
		</view>
		<!-- #ifdef APP-PLUS || H5 -->
		<view class="content">
			<radio-group @change="radioChange" :id="index" style="width: 690rpx;display: flex;">
				<view class="item">
					<label class="radio">
						<radio value="wechat" checked="true" />
					</label>
					<uni-icon type="" class="iconfont iconweixin1"></uni-icon>
					<text>微信支付</text>
				</view>
				<view class="item">
					<label class="radio">
						<radio value="aliply" /></label>
					<uni-icon type="" class="iconfont iconzhifubao"></uni-icon>
					<text>支付宝支付</text>
				</view>
			</radio-group>
		</view>
		<button type="primary" class="iAgree" @tap="iAgree">立即支付</button>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="content">
			<view class="item">
				<uni-icon type="" class="iconfont iconweixin1"></uni-icon>
				<text>微信支付</text>
			</view>
		</view>
		<button type="primary" class="iAgree" @tap="wxAppletPay">立即支付</button>
		<!-- #endif -->
	</view>
</template>

<script>
	const app = getApp()
	import helper from '../common/helper.js';
	export default {
		data() {
			return {
				options: {},
				userInfo: {},
				index: '0',
				payType: 'wechat'
			};
		},
		onLoad(options) {
			this.userInfo = app.globalData.userInfo
			// console.log(this.userInfo)
			// console.log(options)
			this.options = options
			con
		},
		methods: {
			radioChange(e) {
				console.log(e);
				this.payType = e.detail.value;
			},
			wxAppletPay() {
				// 微信小程序支付
				uni.showLoading({
					title: '支付信息加载中...',
					duration: 1000000
				});
				uni.request({
					url: `${helper.requestUrl}/bay-vip`,
					method: 'POST',
					header: {
						authorization: app.globalData.token
					},
					data: {
						member_id: this.options.id,
						app_type: 'miniapp',
						pay_type: 'wechat'
					},
					success: res => {
						// console.log(res);
						uni.hideLoading();
						res = helper.null2str(res)
						if (res.statusCode == 200) {
							this.runRecharge(res.data)
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'none',
								duration: 2000
							});
						}
					}
				});
			},
			runRecharge(payNode) {
				uni.showToast({
					title: "支付加载中...",
					icon: 'loading',
					duration: 1000000
				});
				uni.requestPayment({
					provider: 'wxpay',
					timeStamp: payNode.timeStamp,
					nonceStr: payNode.nonceStr,
					package: payNode.package,
					signType: payNode.signType,
					paySign: payNode.paySign,
					success: res => {
						uni.hideToast()
						res = helper.null2str(res)
						// console.log(res)
						// console.log('success:' + JSON.stringify(res));
						uni.showToast({
							title: "支付成功",
							icon: 'success',
							duration: 2000
						});
						// 两秒后返回上一页
						setTimeout(e => {
							uni.reLaunch({
								url:'/pages/paySuccess'
							})
						}, 2000)
					},
					fail: err => {
						uni.showToast({
							title: "支付失败",
							icon: 'none',
							duration: 2000
						});
					}
				});
			},
			iAgree() {
				console.log(this.payType);
				// uni.showToast({
				// 	title: this.payType
				// })
				uni.request({
					url: `${helper.requestUrl}/buy-vip`,
					method: 'POST',
					header: {
						authorization: app.globalData.token
					},
					data: {
						member_id: this.options.id,
						app_type: 'app',
						pay_type: this.payType
					},
					success: res => {
						console.log(res);
						console.log(res.data,'****************')
						// 调起支付
						// this.appWxpay(res.data)
						uni.request({
							url: `${helper.requestUrl}/wechat-second-sign`,
							method: 'POST',
							header: {
								authorization: app.globalData.token
							},
							data: {
								wechat_data: JSON.stringify(res.data)
							},
							success: data => {
								console.log(data);
								console.log(JSON.stringify(data.data))
								// 调起支付
								this.appWxpay(data.data)
								
							}
						});
						
					}
				});
			},
			appWxpay(payNode) {
				// let u = typeof JSON.stringify(payNode)
				// payNode.packageValue ='Sign=WXPay'
				// payNode.sign='B3A0B850A70CC3AC8C214EE062531388'
				// payNode.noncestr = 'OOo2rWtclOyKF1X6'
				// payNode.prepayid= 'wx11180748726260182c649e131874986700'
				// payNode.timeStamp='1578737268'
				// payNode.appid='wx1a5d6f1f8c7065c6'
				// payNode.partnerid = '1573212951'

				// payNode.sign = payNode.sign.toLowerCase()
				console.log(JSON.stringify(payNode))
				// uni.showToast({
				// 	title: u,
				// 	icon: 'none',
				// 	duration: 9000
				// });
				uni.requestPayment({
				    provider: 'wxpay',
				    orderInfo: JSON.stringify(payNode), //微信、支付宝订单数据
						// provider: 'wxpay',
						// appid: payNode.appid,
						// timeStamp: String(payNode.timeStamp),
						// nonceStr: payNode.noncestr,
						// package: payNode.package,
						// signType: payNode.signType,
						// paySign: payNode.paySign,
				    success: function (res) {
							uni.showToast({
								title: "支付成功",
								icon: 'success',
								duration: 2000
							});
							// 两秒后返回上一页
							setTimeout(e => {
								uni.reLaunch({
									url:'/pages/paySuccess'
								})
							}, 2000)
								console.log(res);
				        console.log('success:' + JSON.stringify(res));
				    },
				    fail: function (err) {
							uni.showToast({
								title: JSON.stringify(err),
								icon: 'none',
								duration: 2000
							});
							// console.log(res);
				   //      console.log('fail:' + JSON.stringify(err));
				    },
				});
			}
		}
		
	};
</script>

<style>
	.payType {
		width: 690rpx;
		padding: 30rpx;
	}

	.head {
		display: flex;
		align-content: flex-end;
		align-items: flex-end;
		font-size: 30rpx;
		font-weight: 800;
		color: #000000;
	}

	.head>text:before {
		content: '';
		display: inline-block;
		margin-right: 16rpx;
		width: 10rpx;
		height: 26rpx;
		border-radius: 10rpx;
		background: #2390dc;
	}

	.head view {
		display: flex;
		margin-left: 20rpx;
	}

	.head view {
		color: #4e9dd6;
		font-size: 26rpx;
		display: flex;
		align-items: flex-end;
		align-content: flex-end;
	}

	.head view text {
		font-size: 26rpx;
	}

	.head .money {
		font-size: 48rpx;
		line-height: 14rpx;
		height: 30rpx;
	}

	.content {
		margin-top: 40rpx;
		display: flex;
		justify-content: center;
	}

	.item {
		width: 280rpx;
		height: 320rpx;
		padding: 30rpx;
		/* background: rgba(255,255,255,1); */
	}

	.cur {
		box-shadow: 0rpx 1rpx 26rpx 0rpx rgba(202, 202, 202, 0.6);
	}

	.item text {
		text-align: center;
		color: #000000;
		font-weight: 700;
		font-size: 28rpx;
	}

	.item .iconfont.iconweixin1,
	.iconzhifubao {
		text-align: center;
		display: block;
		color: #008000;
		font-size: 80rpx;
	}

	.iconzhifubao {
		color: #007aff;
	}

	.item .radio {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 30rpx;
	}

	.iAgree {
		width: 630rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: #2390dc;
		box-shadow: 0rpx 10rpx 45rpx 0rpx rgba(35, 144, 220, 0.6);
		font-size: 32rpx;
		font-weight: 700;
		margin-top: 80rpx;
	}
</style>
