<template>
	<view class="teamPeopleDetail">
		<view class="bg"></view>
		<view class="head">
			<image class="headImg" :src="imgUrl+info.avatar" mode=""></image>
			<view class="headInfo">
				<text class="name">{{info.name}}</text>
				<view class="infoTip">
					<text v-if="info.type == 'normal'">{{info.level_name}}</text>
					<text v-if="info.type == 'member'" style="background-color: #C6A25D;">{{info.level_name}}</text>
					<text v-if="info.type == 'manager'" style="background-color: #00a65a;">{{info.level_name}}</text>
					<text v-if="info.index == 'one'">一级代理</text>
					<text v-if="info.index == 'two'">二级代理</text>
				</view>
			</view>
		</view>
		<view class="form">
			<view class="item">
				<text>电话:</text>
				<text>{{info.mobile}}</text>
			</view>
			<view class="item">
				<text>加入时间:</text>
				<text>{{info.created_at}}</text>
			</view>
			<view class="item">
				<text>微信号:</text>
				<text>{{info.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	import helper from '../common/helper.js';
	export default {
		data() {
			return {
				info:{},
				imgUrl: '',
			}
		},
		onLoad(option) {
			this.imgUrl = helper.imgUrl;
			console.log(option)
			this.info = JSON.parse(decodeURIComponent(option.itemDetail));
		},
		methods: {
			
		}
	}
</script>

<style>
.teamPeopleDetail{
	width: 750rpx;
}
.bg{
	width: 690rpx;
	padding: 30rpx;
	height: 110rpx;
	background: #2390DC;
}
.head{
	width: 690rpx;
	padding: 30rpx;
	margin-top: -160rpx;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
}
.head .headImg{
	width: 116rpx;
	height: 116rpx;
	border: 4rpx solid #fff;
	border-radius: 116rpx;
	z-index: 99;
}
.head .headInfo{
	width: 690px;
	background: #ffffff;
	box-shadow: 0rpx 10rpx 44rpx 0rpx rgba(205,205,205,0.45); 
	margin-top: -60rpx;
	border-radius: 10rpx;
	padding-top: 60rpx;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
}
.head .name{
	width: 690rpx;
	font-size: 32rpx;
	font-weight: 700;
	color: #333333;
	margin: 10rpx 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	text-align: center;
}
.infoTip{
	display: flex;
	justify-content: space-between;
	margin:6rpx 0 30rpx;
}
.infoTip text{
	background: #2390dc;
	border-radius: 4rpx;
	font-size: 18rpx;
	font-weight: 400;
	color: #ffffff;
	margin-right: 16rpx;
	padding: 5rpx 12rpx;
}
.form{
	width: 650rpx;
	margin: 0 auto;
	background: #ffffff;
	box-shadow: 0px 10px 44px 0px rgba(205,205,205,0.45); 
	padding: 0 20rpx;
}
.form .item{
	border-bottom: 2rpx solid #eeeeee;
	display: flex;
	justify-content: space-between;
	padding: 16rpx 0;
}
.form .item text{
	font-size: 24rpx;
	font-weight: 700;
	color: #666666;
}
</style>
