<template>
	<view class="pageSearch">
		<image class="code" src="../static/a.jpg" mode=""></image>
		<view class="searchBox"></view>
		<image class="service" src="../static/b.jpg" mode=""></image>
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
.pageSearch{
	width: 690rpx;
	background: #2390DC;
	padding: 20rpx 30rpx;
	display: flex;
	justify-content: space-between;
	align-content: center;
	align-items: center;
}
.service{
	width: 60rpx;
	height: 60rpx;
	border-radius: 50rpx;
}
.code{
	width: 50rpx;
	height: 50rpx;
}
.searchBox{
	width: 532rpx;
	height: 70rpx;
	background: #fff;
	border-radius: 10rpx;
}
</style>
