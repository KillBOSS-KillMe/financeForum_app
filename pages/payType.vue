<template>
	<view class="payType">
		<view class="head">
			<text>您本次交易需要支付的金额</text>
			<view>
				<text>RMB.</text>
				<text class="money">{{money.money}}</text>
			</view>
		</view>
		<view class="content">
			<radio-group @change="radioChange" :id="index" style="width: 690rpx;display: flex;">
				<view class="item">
					<label class="radio"><radio value="wechat" checked="true" /></label>
					<uni-icon type="" class="iconfont iconweixin1"></uni-icon>
					<text>微信支付</text>
				</view>
				<view class="item">
					<label class="radio"><radio value="aliply" /></label>
					<uni-icon type="" class="iconfont iconzhifubao"></uni-icon>
					<text>支付宝支付</text>
				</view>
			</radio-group>
		</view>
		<button type="primary" class="iAgree" @tap="iAgree">立即支付</button>
	</view>
</template>

<script>
	const app = getApp()
	import helper from '../common/helper.js';
export default {
	data() {
		return {
			index: '0',
			payType: 'wechat',
			money: ''
		};
	},
	onLoad(e) {
		console.log(e)
		this.money = e
	},
	methods: {
		radioChange(e) {
			console.log(e);
			this.payType = e.detail.value;
		},
		iAgree() {
			console.log(this.payType);
			uni.request({
				url: `${helper.requestUrl}/bay-vip`,
				method: 'POST',
				header: {
					authorization: app.globalData.token
				},
				data:{
					member_id: this.money.id,
					pay_type: this.payType
				},
				success: res => {
					console.log(res);
					// 调起支付
					uni.requestPayment({
						provider: 'alipay',
						orderInfo: {
							dealId: res.dealId,
							appKey: res.appKey,
							totalAmount: res.totalAmount,
							tpOrderId: res.tpOrderId,
							dealTitle: res.dealTitle,
							rsaSign: res.rsaSign,
							bizInfo: res.bizInfo
						}, //订单数据
						success: function(res) {
							// console.log('success:' + JSON.stringify(res));
						},
						fail: function(err) {
							// console.log('fail:' + JSON.stringify(err));
						}
					});
				}
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
.head > text:before {
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
	justify-content: space-between;
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
