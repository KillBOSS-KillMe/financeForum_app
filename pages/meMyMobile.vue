<template>
	<view>
		<view class="list">
			<view class="item" @tap="goMyMobile" data-name="meMyMobile_1">
				<view>手机号更换</view>
				<view>
					{{mobile}}
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
				mobile: ''
			}
		},
		onLoad() {
			uni.request({
				url: `${helper.requestUrl}/user/old-mobile`,
				method: 'GET',
				header: {
					authorization: app.globalData.token
				},
				success: res => {
					res = helper.null2str(res)
					console.log(res)
					if (res.data.status_code == 200) {
						this.mobile = res.data.mobile
						
					}
				}
			})
		},
		methods: {
			goMyMobile(e){
				let url = e.target.dataset.name
				uni.navigateTo({
					url: `/pages/${url}?num=${this.mobile}`
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
