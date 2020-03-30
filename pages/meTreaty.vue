<template>
	<view class="meTreaty">
		<!-- <view class="online"></view> -->
		<view class="content">
			<text>开通会员须知</text>
			<view class="font">
				<text>
					子诺新微金APP充值前须知
					1． 充值389元权益：
					1. 体验时长3个月；
					2. 可享受本站10个板块内容，具体请看(会员区别).
					 
					二．充值1289元权益：
					1. 体验时长12个月；
					2. 可享受本站25个板块内容，具体请看(会员区别).
					 
					三．充值2189元权益：
					1. 体验时长36个月，可享受本站所有板块内容，具体请看(会员区别).
					2. 可进全国金融从业资深人员QQ交流群；
					3. 可以得到平台老师平台内所有内容专业免费指导。
					 
					四．如需升级会员，可在七天内（含七天）联系客服人员，补齐差价即可升级。超过七天则不可补差价升级，需全额支付会员费。
					 
					5． (本站属虚拟知识产品)一经充值，概不不能退款，充值前请您慎重！
					备注：以上内容最终解释权归子诺新微金所有！
				</text>
				<!-- <text>会员区别：一年会员有【实战视频技术+营销软件下载的权限】。永久会员全站无任何的限制，并且支持一对一技术解答，还赠大额花呗收款码，国美后台！开通	vip	会员服务您只需要一次性支付对应的会员等级得钱，以后无需向本交流支付其它的任何费用！付款成功后自动开通VIP，如遇为正常开通，请退出账号重新登录即可！（年费/永久）会员可联系客服加入会员技术交流群！</text> -->
				<view class="qq">请联系客服QQ/邮箱：<text>1071076818 / 1718444444</text></view>
			</view>
		</view>
		<button type="primary" class="iAgree" @tap="iAgree(1)">我同意</button>
	</view>
</template>

<script>
	const app = getApp()
	import helper from '../common/helper.js';
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			iAgree(e){
				app.globalData.vipIndex= e
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style>
.meTreaty{
	width: 750rpx;
}
.meTreaty .online{
	width: 750rpx;
	height: 24rpx;
	background: #F2F2F2;
}
.content{
	width: 690rpx;
	padding:30rpx;
}
.content>text{
	font-size: 28rpx;
	font-weight: 600;
	color: #333;
	margin-top: 20rpx;
}
.font>text{
	font-size: 24rpx;
	color: #333;
	margin-top: 30rpx;
	line-height: 36rpx;
}
.qq{
	margin-top: 14rpx;
	display: flex;
	font-size: 24rpx;
	color: #333;
}
.qq>text{
	color: #2390DC;
}
.iAgree{
	width: 630rpx;
	height: 80rpx;
	line-height: 80rpx;
	background: #2390DC;
	box-shadow: 0rpx 10rpx 45rpx 0rpx rgba(35,144,220,0.6);
	font-size: 32rpx;
	font-weight: 700;
	margin-top: 60rpx;
}
</style>
