<template>
	<view>
		<view class="list" @tap="go">
			<view class="item">
				<view>实名认证</view>
				<view>
					未认证
					<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
				</view>
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
				
			}
		},
		methods: {
			go(){
				uni.navigateTo({
					url:`/pages/meCertificationConfirm`
				})
			}
		}
	}
</script>

<style>
	.list{
		width: 750rpx;
		height: auto;
		border-top: 2rpx solid #F3F3F3;
	}
	.item{
		width: 690rpx;
		height: 90rpx;
		margin: 0 30rpx;
		border-bottom: 2rpx solid #110F53;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #333333;
		font-size: 28rpx;
	}
	.iconfont{
		margin-left: 10rpx;
	}
</style>
