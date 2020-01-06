
<template>
	<view class="queryTool">
		<block v-for="(item,index) in collectionList" :key="index">
			<!-- <text>{{item.title}}</text> -->
			<view class="headList" v-if="item.type != 'category'">
				<view class="head">
					<image :src="imgUrl+item.icon" mode=""></image>
					<text class="title">{{item.title}}</text>
				</view>
			</view> 
			<view class="collection" v-if="item.type == 'category'">
				<text class="title">{{item.title}}</text>
				<view class="collectionList">
					<block v-for="(childrenItem,childrenIndex) in item.children" :key="childrenIndex">
						<view class="item">
							<image class="img" :src="imgUrl+childrenItem.icon" mode=""></image>
							<text>{{childrenItem.title}}</text>
						</view>
					</block>
				</view>
			</view>
			<!-- <view class="line"></view> -->
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
				imgUrl:'',
				ItemId: ''
			}
		},
		onLoad(e) {
			console.log(e)
			this.ItemId = e.id
			this.getList();
			this.imgUrl = helper.imgUrl
			uni.setNavigationBarTitle({
				title: e.name
			})
		},
		methods: {
			getList(){
				uni.request({
					url: `${helper.requestUrl}/system-tools/category-tool`,
					method: 'GET',
					header: {
						authorization: app.globalData.token
					},
					data: {
						tool_id: this.ItemId
					},
					success: res => {
						// uni.hideLoading();
						res = helper.null2str(res)
						console.log(res)
						if (res.data.status_code == 200) {
							this.collectionList = res.data.children
							console.log(this.collectionList,'+++++++++')
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
.queryTool{
	width:690rpx;
	padding:30rpx;
	display: flex;
	flex-wrap: wrap;
}
.collection{
	width: 690rpx;
	padding: 30rpx 0 0;
}
.collection .title{
	color: #333333;
	font-size: 32rpx;
	font-weight: 600;
}
.headList{
	width: 156rpx;
	display: flex;
	justify-content: center;
	/* justify-content: center; */
	margin-right: 20rpx;
	margin-bottom: 20rpx;
}
.headList:nth-child(4n){
	margin-right: 0;
}
.headList .head>text{
	font-size: 28rpx;
	font-weight: 600;
	color: #333;
	margin-top: 6rpx;
	text-align: center;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.head{
	width: 180rpx;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
}
.head image{
	width: 96rpx;
	height: 96rpx;
	border-radius: 50rpx;
	margin: 0;
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
