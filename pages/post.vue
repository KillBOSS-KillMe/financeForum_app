<template>
	<view class="post">
		<input class="title" type="text" value="" placeholder="请输入标题" @input="inputValue">
		<view class="content">
			<textarea value="" placeholder="请输入发布内容..." />
			<text class="tip">贷款进口子交流</text>
		</view>
		<view class="sound">
			<uni-icon class="iconfont iconzanzan" type=""></uni-icon>
			<text>附加语音</text>
		</view>
		<view class="sound">
			<uni-icon class="iconfont iconzanzan" type=""></uni-icon>
			<text class="address">显示所在位置</text>
		</view>
		<view class="enclosure">
			<view class="enclosureList">
				<uni-icon class="iconfont iconzanzan" type=""></uni-icon>
				<uni-icon class="iconfont iconzanzan" type=""></uni-icon>
				<uni-icon class="iconfont iconzanzan" type=""></uni-icon>
				<uni-icon class="iconfont iconzanzan" type=""></uni-icon>
			</view>
		</view>
		<button type="primary" class="submit">发帖</button>
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
.post{
	width: 690rpx;
	padding: 10rpx 30rpx;
}
.post .title{
	border: 1rpx solid #F8F8F8;
	padding: 0rpx 20rpx;
	border-radius: 10rpx;
	color: #999999;
	font-size: 30rpx;
	height: 80rpx;
	line-height: 80rpx;
}
.post .content{
	width: 630rpx;
	height: 240rpx;
	border: 1rpx solid #F8F8F8;
	padding: 28rpx;
	margin: 30rpx 0;
	border-radius: 10rpx;
}
.post .content textarea{
	height: 210rpx;
	width: 636rpx;
}
.post .content .tip{
	color: #999999;
	font-size: 28rpx;
	text-align: right;
}
.sound{
	display: flex;	
	width: 638rpx;
	height: 28rpx;
	border: 1rpx solid #F8F8F8;
	border-radius: 10rpx;
	align-items: center;
	padding: 26rpx;
	margin-bottom: 30rpx;
}
.sound text{
	font-size: 30rpx;
	font-weight: 600;
	color: #333333;
	margin-left: 16rpx;
}
.sound .address{
	color: #999999;
	font-weight: 200;
}
.enclosure{
	padding:0 30rpx 100rpx;
}
.enclosureList>icon{
	margin-right: 40rpx;
}
.submit{
	width: 630rpx;
	position: fixed;
	bottom: 60rpx;
	left: 60rpx;
}
</style>
