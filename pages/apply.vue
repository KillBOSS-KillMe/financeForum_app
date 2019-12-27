<template>
	<view class="apply">
		<pageSearch></pageSearch>
		<block v-for="(item,index) in collectionList" :key="index">
			<view class="collection">
				<text class="title">{{item.title}}</text>
				<view class="collectionList">
					<block  v-for="(childrenItem,childrenIndex) in item.children" :key="childrenIndex">
						<view class="item">
							<image class="img" :src="imgUrl+childrenItem.icon" mode=""></image>
							<text>{{childrenItem.title}}</text>
						</view>
					</block>
				</view>
			</view>
			<view class="line"></view>
		</block>
	</view>
</template>

<script>
	const app = getApp()
	import helper from '../common/helper.js';
	export default {
		data() {
			return {
				collectionList:[],
				imgUrl:''
			}
		},
		onLoad() {
			this.getList();
			this.imgUrl = helper.imgUrl
		},
		methods: {
			// collectionList
			getList(){
				uni.request({
					url: `${helper.requestUrl}/system-tools/apps`,
					method: 'GET',
					success: res => {
						// uni.hideLoading();
						res = helper.null2str(res)
						console.log(res)
						if (res.data.status_code == 200) {
							this.collectionList = res.data.data
						} else {
							// uni.showToast({
							// 	title: res.data.message
							// });
						}
				
					}
				})
			}
		}
	}
</script>

<style>
.apply{
	width: 750rpx;
}
.collection{
	width: 690rpx;
	padding: 30rpx 30rpx 0;
}
.collection .title{
	color: #333333;
	font-size: 32rpx;
	font-weight: 600;
}
.collectionList{
	margin: 30rpx 0;
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
}
.collectionList .item{
	/* margin-right: ; */
	width: 131rpx;
	margin:0 8rpx 30rpx 0;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
}
.collectionList .item:nth-child(5n){
	margin-right: 0;
}
.collectionList .item image{
	width: 96rpx;
	height: 96rpx;
	border-radius: 50rpx;
	display: block;
}
.collectionList .item text{
	display: block;
	font-size: 28rpx;
	color: #333333;
	font-weight: 600;
	margin-top: 16rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.line{
	width: 750rpx;
	background: #F9F9F9;
	height: 6rpx;
}
</style>
