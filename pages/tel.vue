<template>
	<view class="tel">
		<view class="item">
			<text>手机服务密码重置</text>
			<view class="itemList">
				<view>移动的发送<text>“6021 证件号码 新密码”</text>到10086</view>
				<view>电信的发送<text>“503#机主名称#身份证”</text>到10001</view>
				<view>联通的发送<text>“MMCZ#新密码#身份证后6位”</text>到10010</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="item">
			<text>手机实名查询</text>
			<view class="itemList">
				<view>移动的发送<text>“608”</text>到10086查询</view>
				<view>电信的发送<text>“504”</text>到10001查询</view>
				<view>联通需要拨打人工客服10010查询</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.tel{
	width: 750rpx;
}
.item{
	width: 690rpx;
	padding: 30rpx;
}
.item>text{
	font-size: 30rpx;
	font-weight: 700;
	color: #333;
}
.item>text:before{
	content: '';
	width: 12rpx;
	height: 26rpx;
	background: #2390DC;
	display: inline-block;
	margin-right: 14rpx;
	border-radius: 10rpx;
}
.item .itemList view{
	display: flex;
	font-size: 28rpx;
	font-weight: 600;
	color: #333;
	margin-top: 30rpx;
	/* justify-content: ; */
}
.item .itemList view text{
	color: #dc8f63;
}
</style>
