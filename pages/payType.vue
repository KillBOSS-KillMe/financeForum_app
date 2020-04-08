<template>
	<view class="payType">
		<view class="head">
			<text>您本次交易需要支付的金额</text>
			<view>
				<text>RMB.</text>
				<text class="money">{{options.money}}</text>
			</view>
		</view>
		<!-- #ifdef APP-PLUS -->
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
		<button type="primary" class="iAgree" @tap="iAgree('app')">立即支付</button>
		<!-- #endif -->
		<!-- #ifdef H5 -->
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
		<button type="primary" class="iAgree" @tap="iAgree('h5')">立即支付</button>
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
	// #ifdef H5
	import wxj from '../components/h5.js';
	// #endif
	export default {
		data() {
			return {
				options: {},
				userInfo: {},
				index: '0',
				payType: 'wechat',
				token: ''
			};
		},
		onLoad(options) {
			this.token = uni.getStorageSync('token')
			this.userInfo = app.globalData.userInfo
			this.options = options
		},
		methods: {
			radioChange(e) {
				console.log(e,'支付类型');
				this.payType = e.detail.value;
			},
			wxAppletPay() {
				// 微信小程序支付
				uni.showLoading({
					title: '支付信息加载中...',
					duration: 1000000
				});
				uni.request({
					url: `${helper.requestUrl}/buy-vip`,
					method: 'POST',
					header: {
						authorization: this.token
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
							uni.redirectTo({
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
			iAgree(app_type) {
				uni.request({
					url: `${helper.requestUrl}/buy-vip`,
					method: 'POST',
					header: {
						authorization: this.token
					},
					data: {
						member_id: this.options.id,
						app_type: app_type,
						pay_type: this.payType
					},
					success: res => {
						// 调起支付
						console.log(res.data,'zhifu')
						// #ifdef APP-PLUS
						this.appWxpay(res.data)
						// #endif
						// #ifdef H5
						this.h5Wxpay(res.data)
						// #endif
					}
				});
			},
			// h5支付
			h5Wxpay(payNode){
				console.log(payNode,'h5')
				wxj.config({
						debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId:payNode.appId, // 必填，公众号的唯一标识
						timestamp: payNode.timeStamp,// 必填，生成签名的时间戳
						nonceStr: payNode.nonceStr, // 必填，生成签名的随机串
						signType: payNode.signType, // 必填，签名，见附录1
						jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
				wxj.ready(function(){  
				   wxj.chooseWXPay({
				     timestamp: payNode.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
				     nonceStr: payNode.nonceStr, // 支付签名随机串，不长于 32 位
				     package: payNode.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
				     signType: payNode.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
				     paySign: payNode.paySign, // 支付签名
				     success: function (res) {
				   		console.log('支付成功')
				       // 支付成功后的回调函数
				     }
				   });
				});
			
			},
			// app 支付
			appWxpay(payNode) {
				console.log(payNode,'-------------------------------------')
				let payTypeWxpay = ''
				if(this.payType == 'wechat'){
					payTypeWxpay = 'wxpay'
				}else{
					payTypeWxpay = 'alipay'
				}
				uni.requestPayment({
				    provider: payTypeWxpay,
				    orderInfo: payNode, //微信、支付宝订单数据
				    success: function (res) {
							console.log(res,'chenggong')
							// 两秒后返回上一页
							setTimeout(e => {
								uni.redirectTo({
									url:'/pages/paySuccess'
								})
							}, 2000)
				    },
				    fail: function (err) {
							console.log(err)
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
