<template>
	<view>
		<view class="list">
			<view class="item">
				<view>实名认证</view>
				<view v-if="userInfo == '0'"  @tap="go">
					未认证
					<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
				</view>
				<view v-if="userInfo == '1'">
					已认证
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
				userInfo: {},
				token: ''
			}
		},
		onLoad() {
			this.token = uni.getStorageSync('token')
			this.getInfo()
		},
		methods: {
			go(){
				uni.navigateTo({
					url:`/pages/meCertificationConfirm`
				})
			},
			getInfo(){
				uni.request({
					url: `${helper.requestUrl}/me`,
					method: 'POST',
					header: {
						authorization: this.token
					},
					success: res => {
						uni.hideLoading();
						res = helper.null2str(res)
						if (res.statusCode == 200) {
							this.userInfo = res.data.is_real
							console.log(this.userInfo)
						}
					}
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
		border-bottom: 2rpx solid #fbfbfc;
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
