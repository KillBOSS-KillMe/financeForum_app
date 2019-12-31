<template>
	<view class="experience">
		<block v-for="(item,index) in type" :key="index">
			<view class="item" @tap="getPost(item.id)">
				<image class="logo" :src="imgUrl+item.icon" mode=""></image>
				<text>{{item.title}}</text>
			</view>
		</block>
	</view>
</template>

<script>
	const app = getApp()
	import helper from '../common/helper.js';
	export default {
		data() {
			return {
				type: [],
				imgUrl: ''
			}
		},
		onLoad() {
			this.imgUrl = helper.imgUrl
			this.getType()
		},
		methods: {
			//获取模块
			getType(){
				uni.request({
					url: `${helper.requestUrl}/posts/can-boards`,
					method: 'GET',
					header: {
						authorization: app.globalData.token
					},
					success: res => {
						uni.hideLoading();
						res = helper.null2str(res)
						console.log(res);
						if (res.data.status_code == '200') {
							this.type = res.data.data
						} else {
							uni.showToast({
								title: res.data.message,
								icon: "none"
							});
						}
					}
				});
			},
			getPost(e){
				console.log(e)
				uni.navigateTo({
					url:`/pages/post?id=${e}`
				})
			}
		}
	}
</script>

<style>
.experience{
	width: 690rpx;
	padding:30rpx;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}
.item{
	display: flex;
	margin-bottom: 40rpx;
	align-items: center;
}

.item .logo{
	width: 58rpx;
	height: 58rpx;
	margin-right: 20rpx;
}
.item>text{
	font-size: 30rpx;
	font-weight: 600;
	color: #333333;
}
</style>
