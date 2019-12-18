<template>
	<view class="meSetting">
		<view class="item" @tap="go" data-id="about">
			<text class="left">修改密码</text>
			<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
		</view>
		<view class="item" @tap="go" data-id="about">
			<text class="left">回复提示通知</text>
			<switch color="#2390DC" style='zoom:.7;' checked />
		</view>
		<view class="item" @tap="go" data-id="about">
			<text class="left">@提示通知</text>
			<switch color="#2390DC" style='zoom:.7;' checked />
		</view>
		<view class="item" @tap="go" data-id="about">
			<text class="left">提示音</text>
			<switch color="#2390DC" style='zoom:.7;' checked />
		</view>
		<view class="item" @tap="go" data-id="about">
			<text class="left">定位服务</text>
			<switch color="#2390DC" style='zoom:.7;' checked />
		</view>
		<view class="item" @tap="go" data-id="about">
			<text class="left">位置服务</text>
			<switch color="#2390DC" style='zoom:.7;' />
			<!-- <text>关闭后，则不会出现在周边用户和周边帖子</text> -->
		</view>
		<view class="item" @tap="go" data-id="about">
			<text class="left">分享应用</text>
		</view>
		<view class="item" @tap="go" data-id="about">
			<text class="left">清理缓存</text>
		</view>
		<view class="item" @tap="go" data-id="about">
			<text class="left">关于</text>
		</view>
		<button type="primary">退出登录</button>
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
.meSetting{
	width: 690rpx;
	padding: 30rpx;
}
.meSetting .item{
	display: flex;
	justify-content: space-between;
	align-content: center;
	align-items: center;
	margin-bottom: 30rpx;
}
.meSetting .item .left{
	font-size: 30rpx;
	font-weight: 600;
	color: #333333;
}
</style>
