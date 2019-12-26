<template>
	<view class="joinMenber">
		<view class="joinHead">
			<text>在线支付</text>
			<view class="headItem">
				<view class="left">
					<view class="image">
						<image src="../static/joinMenberZFB.png" mode=""></image>
					</view>
					<text>微信支付宝支付</text>
				</view>
				<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
			</view>
			<view class="headItem">
				<view class="left">
					<view class="image">
						<image src="../static/joinMemberKf.png" mode=""></image>
					</view>
					<text>联系客服开通</text>
				</view>
				<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
			</view>
		</view>
		<view class="line"></view>
		<view class="menber">
			<text>会员特权</text>
			<view class="memberList">
				<block v-for="(item,index) in list" :key="index">
					<view class="item">
						<view class="itemImg">
							<image :src="item.img" mode=""></image>
						</view>
						<view>
							<text class="title">{{item.title}}</text>
							<text class="content">{{item.content}}</text>
						</view>
					</view>
				</block>
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
				list:[
					{id:'1',img:'../static/logo.png',title:'cvxc',content:'非常高的放管服改革吃饭v幸福感v修改和对方忍痛割肉割'},
					{id:'1',img:'../static/logo.png',title:'所发生的给对方你',content:'非常高的放管服改革吃饭v幸福感v修改和对方忍痛割肉割'}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.joinMenber{
	width: 750rpx;
	/* padding: 20rpx 30rpx; */
}
.joinMenber .joinHead{
	width: 690rpx;
	padding: 10rpx 30rpx;
}
.joinMenber .joinHead>text{
	font-size: 34rpx;
	font-weight: 700;
	color:#333;
	margin-bottom: 24rpx;
}
.joinMenber .joinHead .headItem{
	border-top: 1rpx solid #ECECEC;
	padding: 26rpx 0;
}
.joinMenber .joinHead .headItem,.headItem .left{
	display: flex;
	justify-content: space-between;
}
.headItem .left .image{
	width: 100rpx;
	height: 50rpx;
	margin-right: 20rpx;
	display: flex;
	justify-content: center;
}
.headItem .left .image>image{
	width: 70rpx;
	height: 46rpx;
}
.headItem .left>text{
	font-size: 28rpx;
	font-weight: 700;
	color:#333;
}
.headItem:last-child .left .image>image{
	width: 42rpx;
	height: 46rpx;
}
.menber{
	width: 690rpx;
	padding:30rpx;
}
.menber>text{
	font-size: 34rpx;
	font-weight: 700;
	color:#333;
}
.menber .memberList{
	display: flex;
	justify-content: flex-start;
	margin-top: 20rpx;
}
.menber .memberList .item{
	width: 330rpx;
	display: flex;
	align-items: center;
	margin-top: 26rpx;
	margin-right: 27rpx;
}
.menber .memberList .item>view{
	width: 220rpx;
}
.menber .memberList .item:nth-child(2n){
	margin-right: 0;
}
.menber .memberList .item .itemImg{
	width: 90rpx;
	height: 90rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 20rpx;
}
.menber .memberList .item .itemImg image{
	width: 50rpx;
	height: 60rpx;
}
.menber .memberList .item .title{
	font-size: 28rpx;
	font-weight: 700;
	color:#333;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin-bottom: 10rpx;
}
.menber .memberList .item .content{
	font-size: 20rpx;
	color: #999999;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
