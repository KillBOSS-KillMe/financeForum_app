<template>
	<view>
		<view class="list">
			<block v-for="(item,index) in list" :key="index">
				<view class="item">
					<image :src="imgUrl + item.image" mode="aspectFill" v-if="item.image != ''"></image>
					<image src="../static/a.jpg" mode="aspectFill" v-else></image>
					<view class="con">
						<view class="title">{{item.title}}</view>
						<view class="info">
							<text>{{item.collection_time}}</text>
							<text>{{item.user}}</text>
							<text>{{item.comments_count}}评</text>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	import helper from '../common/helper.js';
	export default {
		data() {
			return {
				list: []
			};
		},
		onLoad() {
			// 获取收藏列表
			this.getList()
		},
		methods:{
			getList() {
				// 获取收藏列表
				uni.showLoading({
				  title: '加载中...',
					duration: 1000000
				});
				uni.request({
					url: `${helper.requestUrl}/user/collections`,
					method: 'GET',
					header: {
						authorization: app.globalData.token
					},
					success: res => {
						uni.hideLoading();
						res = helper.null2str(res)
						console.log(res)
						if (res.data.status_code == '1') {
							this.list = res.data.data
						} else {
							uni.showToast({
								title: res.data.message
							});
						}
				
					}
				})
			}
		}
	}
</script>
<style>
	.list {
		width: 750rpx;
		height: auto;
	}
	.item{
		width: 690rpx;
		height: 136rpx;
		padding: 20rpx 30rpx;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.item image{
		width: 220rpx;
		height: 136rpx;
	}
	.item .con{
		width: 450rpx;
		height: 136rpx;
		margin-left: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
	}
	.item .title{
		width: 450rpx;
		height: auto;
		font-size: 28rpx;
		font-weight: 600;
		color: #333333;
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.item .info{
		width: 450rpx;
		font-size: 24rpx;
		color: #999999;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>