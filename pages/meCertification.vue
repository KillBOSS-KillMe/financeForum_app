<template>
	<view class="meCer">
		<view class="item" @tap="go"> 
			<text>实名认证</text>
			<view><text>未认证</text><uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon></view>
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
			go(){
				uni.navigateTo({
					url:`/pages/meCertificationConfirm`
				})
			}
		}
	}
</script>

<style>
	.meCer{
		width: 690rpx;
		padding: 0 30rpx;
		margin-top: 20rpx;
	}
	.item{
		display: flex;
		justify-content: space-between;
		align-content: center;
		align-items: center;
	}
	.item>view{
		display: flex;
		justify-content: space-between;
		align-content: center;
		align-items: center;
	}
	.item>text{
		font-size: 28rpx;
		font-weight: 500;
		color: #333;
	}
	.item>view text{
		font-size: 24rpx;
		font-weight: 500;
		color: #333;
	}
	.item>view .iconfont{
		font-size: 30rpx;
		color: #C0C0C0;
	}
</style>
