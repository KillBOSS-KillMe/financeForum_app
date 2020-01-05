<template>
	<view class="collection">
		<pageSearch></pageSearch>
		<view class="page-section-spacing banner">
			<swiper class="swiper" indicator-color="rgba(255,255,255,.3)" indicator-active-color="#fff" :autoplay="autoplay" :interval="interval">
				<swiper-item  v-for="(item,index) in bannerList" :key="index">
					<image class="bannerImg" :src="item.img" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="contentList">
			<block  v-for="(item,index) in list" :key="index">
				<view class="item" @tap="goDetail(item.id)">
					<image :src="imgUrl+item.theme_pic" mode="aspectFill"></image>
					<view class="itemRight">
						<text class="title">{{item.title}}</text>
						<view class="itemCon">
							<text>{{item.created_at}}</text>
							<text>{{item.user.name}}</text>
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
				autoplay: true,
				interval: 2000,
				bannerList:[],
				list: [],
				page: '1',
				imgUrl: ''
			}
		},
		onLoad() {
			this.imgUrl = helper.imgUrl
			this.getList()
		},
		methods: {
			getList(){
				uni.request({
					url: `${helper.requestUrl}/posts/board-posts`,
					method: 'GET',
					header: {
						authorization: app.globalData.token
					},
					data:{
						board_id: '5',
						page_size: '10',
						page: this.page
					},
					success: res => {
						res = helper.null2str(res)
						console.log(res)
						if (res.data.status_code == 200) {
							 this.list = this.list.concat(res.data.data)
							 if(res.data.data == 0){
							 	uni.showToast({
							 		title:'暂无更多数据',
							 		icon:"none"
							 	})
							 }
						} else {
							uni.showToast({
								title: res.data.message
							});
						}
				
					}
				})
			},
			// 跳转详情
			goDetail(e){
				console.log(e + '||||||||||||||||||||')
				uni.navigateTo({
					url:`/pages/articleDetail?id=${e}`
				})
			},
			onReachBottom() {
				this.page ++;
				this.getList()
			}
		}
	}
</script>

<style>
.collection{
	width: 750rpx;
}
.banner{
	width: 690rpx;
	margin: 20rpx 30rpx;
	border-radius: 10rpx;
	overflow: hidden;
}
.bannerImg{
	width: 690rpx;

}
.collection .contentList{
	width: 690rpx;
	padding: 10rpx 30rpx 30rpx;
}
.collection .contentList .item{
	display: flex;
	justify-content: space-between;
	margin-bottom: 40rpx;
}
.collection .contentList .item image{
	width: 220rpx;
	height: 136rpx;
	border-radius: 10rpx;
}
.collection .contentList .item .itemRight{
	width: 440rpx;
	display: flex;
	align-content: space-between;
	flex-wrap: wrap;
}
.collection .contentList .item .itemRight .title{
	font-size: 28rpx;
	color: #333333;
	font-weight: 600;
	overflow : hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.collection .itemCon{
	width: 440rpx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	/* justify-content: flex-end; */
	
}
.collection .itemCon text{
	display: block;
	font-size: 24rpx;
	color: #999999;
}
</style>
