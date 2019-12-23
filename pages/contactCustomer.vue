<template>
	<view class="contactCustomer">
		<view class="headList">
			<view class="left">
				<image src="../static/customer.png" mode=""></image>
				<text>联系客服</text>
			</view>
			<view class="right">
				<view>
					<image src="../static/cancellation.png" mode=""></image>
					<text>账号解封</text>
				</view>
				
			</view>
		</view>
		<view class="headList">
			<view class="left" style="background: #FE572A;">
				<image src="../static/join.png" mode=""></image>
				<text>商务合作</text>
			</view>
			<view class="right" style="background: #FDBB29;">
				<view>
					<image class="vip" src="../static/vip.png" mode=""></image>
					<text>账号解封</text>
				</view>
				
			</view>
		</view>
		<view class="list">
			<text>嘉合骏论坛</text>
			<view class="item">
				<text>联系QQ</text>
				<view>123456789</view>
			</view>
			<view class="item">
				<text>客服QQ</text>
				<view>123456789</view>
			</view>
			<view class="item">
				<text>客服微信</text>
				<view>123456789</view>
			</view>
			<view class="item">
				<text>备用微信</text>
				<view>123456789</view>
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
.contactCustomer{
	width: 690rpx;
	padding: 20rpx 30rpx;
}
.contactCustomer .headList{
	display: flex;
	justify-content: space-between;
	margin-bottom: 20rpx;
}
.contactCustomer .headList .left{
	width: 435rpx;
	height: 230rpx;
	background: #19B7F8;
	display: flex;
	justify-content: center;
	align-items: center;
}
.contactCustomer .headList .right{
	width: 235rpx;
	background: #18CF7F;
	height: 230rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.contactCustomer .headList image{
	width: 96rpx;
	height: 96rpx;
}
.contactCustomer .headList .left image{
	margin-right: 24rpx;
}
.contactCustomer .headList text{
	font-size: 34rpx;
	font-weight: 600;
	color: #fff;
}
.contactCustomer .headList .right >view{
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	width: 200rpx;
}
.contactCustomer .headList .right >view text{
	margin-top: 22rpx;
}
.contactCustomer .headList .vip{
	width: 112rpx;
	height: 48rpx;
}
.contactCustomer .list{
	margin: 20rpx 0;
}
.contactCustomer .list>text{
	font-size: 28rpx;
	color: #000;
	font-weight: 600;
	border-bottom: 2rpx solid #ececec;
	padding: 20rpx 0;
}
.contactCustomer .list .item{
	display: flex;
	justify-content: space-between;
	height: 88rpx;
	align-items: center;
}
.contactCustomer .list .item text{
	width: 400rpx;
	border-bottom: 2rpx solid #ececec;
	font-size: 28rpx;
	color: #000;
	font-weight: 600;
	padding-bottom: 6rpx;
}
.contactCustomer .list .item view{
	font-size: 28rpx;
	color: #2390DC;
	/* font-weight: 600; */
	border: 1rpx solid #2390DC;
	border-radius: 10rpx;
	padding: 6rpx 16rpx;
}
</style>
