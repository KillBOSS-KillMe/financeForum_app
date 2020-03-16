<template>
	<view class="exchangList">
		<view class="head">
			<view class="headInfo">
				<view class="headLeft">
					<image src="../static/imgLost.png" mode=""></image>
					<text></text>
				</view>
				<text>关注</text>
			</view>
			<view class="headList">
				<view class="headItem">
					<text class="tip">置顶</text>
					<text class="text">123</text>
				</view>
				<text class="more" @tap="getMore">查看更多</text>
			</view>
		</view>
		<view class="content">
			<block v-for="(item,index) in list" :key='index'>
				<view class="contentItem">
					<image src="../static/1.png" mode=""></image>
					<view class="right">
						<view class="title">
							<text class="headTitle">999999999999999999999999999999999999</text>
							<text class="form">来自 222222222222222222222222</text>
						</view>
						<view class="itemContent">123</view>
						<view class="icon">
							<text>2012</text>
							<view class="iconRight">
								<view>
									<uni-icon type="" class="iconfont icondianzan"></uni-icon>
									<text>12</text>
								</view>
								<view>
									<uni-icon type="" class="iconfont iconhuifu"></uni-icon>
									<text>12</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>
		<view class="post" @tap="getPost"><uni-icon type="" class="iconfont iconxiepinglun"></uni-icon></view>
	</view>
</template>

<script>
const app = getApp();
import helper from '../common/helper.js';
export default {
	data() {
		return {
			imgUrl: ''
		};
	},
	onLoad(e) {
		this.imgUrl = helper.imgUrl
		uni.setNavigationBarTitle({
			title: e.title
		});
	},
	methods: {
		// 发布
		getPost(){
			uni.navigateTo({
				url: `/pages/experience`
			});
		},
		// 置顶加载更多
		getMore(){
			this.page = '1'
		}
	}
};
</script>

<style>
page {
	background-color: #F8F8F8;
}
.head {
	padding: 18rpx;
	background-color: #ffffff;
	border-radius: 8rpx;
}
.exchangList {
	width: 690rpx;
	margin: 20rpx 30rpx;
}
.headInfo {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1rpx solid #e8e8e8;
	padding-bottom: 10rpx;
}
.headInfo .headLeft {
	display: flex;
	align-items: center;
	
}
.post{
	width: 96rpx;
	height: 96rpx;
	border-radius: 96rpx;
	display: flex;
	justify-content: center;
	align-content: center;
	align-items: center;
	margin: 0 auto;
	background-image: linear-gradient(#A1DDF9, #6BD2F4);
	position: fixed;
	z-index: 9;
	right: 0;
	top: 60vh;
}
.exchang .nav .iconfont{
	color: #fff;
	font-size: 46rpx;
}
.headInfo .headLeft image {
	width: 100rpx;
	height: 100rpx;
	overflow: hidden;
	border-radius: 8rpx;
	margin-right: 14rpx;
}
.headInfo .headLeft > text {
	font-size: 28rpx;
	color: #000000;
	-webkit-line-clamp: 1;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
}
.headInfo > text {
	padding: 6rpx 18rpx;
	background-color: #2390dc;
	border-radius: 10rpx;
	color: #ffffff;
	font-size: 26rpx;
}
.headList .headItem{
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-top: 16rpx;
}
.headList .headItem .tip{
	color: #E22929;
	font-size: 22rpx;
	border: 1rpx solid #E22929;
	padding: 0 10rpx;
	border-radius: 8rpx;
	margin-right: 12rpx;
}
.headList .headItem .text{
	width: 300rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 26rpx;
	text-align: left;
	color: #333333;
}
.more{
	font-size: 26rpx;
	text-align: center;
	color: #999;
	border-top: 1rpx solid #E8E8E8;
	padding-top: 16rpx;
	margin-top: 16rpx;
}
.content {
	margin-top: 18rpx;
	background-color: #ffffff;
	border-radius: 8rpx;
	padding: 18rpx;
}
.contentItem {
	display: flex;
	justify-content: space-between;
	align-content: flex-start;
	align-items: flex-start;
}
.contentItem > image {
	width: 80rpx;
	height: 80rpx;
	border-radius: 80rpx;
	overflow: hidden;
}
.contentItem .right {
	width: 560rpx;
}
.contentItem .right .title {
	display: flex;
	justify-content: space-between;
}
.headTitle {
	width: 300rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 28rpx;
	font-weight: 700;
	text-align: left;
	color: #333333;
}
.contentItem .right .title .form {
	color: #2390dc;
	font-weight: 400;
	width: 250rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 28rpx;
	font-weight: 700;
	text-align: left;
}
.contentItem .right .itemContent {
	-webkit-line-clamp: 3;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	font-size: 28rpx;
	font-weight: 700;
	text-align: left;
	color: #666;
}
.contentItem .right .icon {
	display: flex;
	justify-content: space-between;
}
.contentItem .right .icon .iconRight,
.contentItem .right .icon .iconRight > view {
	display: flex;
	align-items: center;
}

.contentItem .right .icon text {
	font-size: 24rpx;
	font-weight: 400;
	text-align: left;
	color: #999999;
}
.contentItem .right .iconfont {
	font-size: 26rpx;
	color: #999999;
	margin: 0 6rpx 0 10rpx;
}
</style>
