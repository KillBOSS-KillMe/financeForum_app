<template>
	<view class="meSetting">
		<view class="item">
			<view class="left">
				<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
				<text>修改密码</text>
			</view>
			<view>
				<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
			</view>
		</view>
		<view class="item">
			<view class="left">
				<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
				<text>清楚缓存</text>
			</view>
			<view>
				<text>12.34M</text>
				<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
			</view>
		</view>
		<view class="item">
			<view class="left">
				<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
				<text>关于</text>
			</view>
			<view>
				<text>V1.0</text>
				<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
			</view>
		</view>
		<view class="login">
			<view>直接登录</view>
		</view>
	</view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
.login {
	margin-top: 200rpx;
	width: 750rpx;
	height: auto;
	display: flex;
	align-items: center;
	justify-content: center;
}
.login view{
	width: 630rpx;
	height: 80rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 10rpx;
	font-size: 32rpx;
	color: #fff;
	background-color: #2390DC;
}
.item {
  width: 690rpx;
  margin: 0 30rpx;
  display: flex;
  justify-content: space-between;
	border-bottom: 1rpx solid #3E8CFD;
	padding: 20rpx 0;;
}
.item .left {
  display: flex;
  justify-content: flex-start;
}
.item text {
  font-size: 30rpx;
  font-weight: 600;
  color: #333333;
  margin: 0 10rpx;
}
.item icon {
  color: #c0c0c0;
  font-size: 40rpx;
  width: 40rpx;
  /* background: #007AFF; */
}
.item .iconchangyongtubiao-xianxingdaochu-zhuanqu- {
  color: #c0c0c0;
}
.item view {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
