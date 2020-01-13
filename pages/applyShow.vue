
<template>
	<view class="queryTool">
		<block v-for="(item,index) in collectionList" :key="index">
			<!-- <text>{{item.title}}</text> -->
			<view class="headList" v-if="item.type != 'category'" @tap="getData" :data-id="item.id" :data-name="item.title" :data-type="item.type"  :data-link="item.extra">
				<view class="head">
					<image :src="imgUrl+item.icon" mode=""></image>
					<text class="title">{{item.title}}</text>
				</view>
			</view> 
			<view class="collection" v-if="item.type == 'category'">
				<text class="title">{{item.title}}</text>
				<view class="collectionList">
					<block v-for="(childrenItem,childrenIndex) in item.children" :key="childrenIndex">
						<view class="item" @tap="getData" :data-id="childrenItem.id" :data-type="childrenItem.type" :data-name="childrenItem.title" :data-link="childrenItem.extra">
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
			console.log(e,'****')
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
							
						}
				
					}
				})
			},
			getData(e){
				console.log(e)
				let type = e.currentTarget.dataset.type
				let extra = e.currentTarget.dataset.link
				let id = e.currentTarget.dataset.id
				let name = e.currentTarget.dataset.name
				console.log(type, extra, id, name)
				if(type == 'block'){
					if (extra != '') {
						uni.navigateTo({
							url:`/pages/${extra}`
						})
					} else {
						uni.showToast({
							title: '此页面不存在'
						});
					}
				} else if(type == 'series'){
					
				} else if(type == 'post'){
					uni.navigateTo({
						url:`/pages/articleDetail?id=${id}`
					})
					// 帖子
				} else if(type == 'child'){
					// 应用子
					console.log(id)
					uni.navigateTo({
						url:`/pages/applyShow?id=${id}&name=${name}`
					})
				} else if(type == 'ex_link'){
					if(extra == ''){
						uni.showToast({
							title: '此页面不存在',
							icon: 'none'
						})
					}else{
						// #ifdef MP-WEIXIN
								uni.showToast({
									title:'该小程序在不支持，请下载App',
									icon: 'none'
								})
						// #endif
						// #ifdef APP-PLUS || H5
								uni.navigateTo({
									url:`/pages/iframe?name=${name}`
								})
								app.globalData.link = extra
						// #endif
					}
					// plus.runtime.openURL(extra)
					// window.location.href = extra
					// 外联
				} else if(type == 'category'){
					uni.navigateTo({
						url:`/pages/applyShow?id=${id}`
					})
				}
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
