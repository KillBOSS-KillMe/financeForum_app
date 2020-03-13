<template>
	<view class="indexAccurate">
		<view class="contentList">
			<block  v-for="(item,index) in list" :key="index">
				<view class="item" @tap="goDetail(item.id)">
					<view class="itemRight">
						<text class="title">{{item.title}}</text>
						<view class="itemCon">
							<text>{{item.created_at}}</text>
							<text>{{item.user.name}}</text>
							<text>{{item.comments_count}}评</text>
						</view>
					</view>
					<image :src="imgUrl + item.photoalbums[0].path" mode="aspectFill" v-if="item.photoalbums.length > 0"></image>
					<image src="../static/imgLost.png" mode="aspectFill" v-else></image>
				</view>
			</block>
			<view class="null" v-if="list.length == 0">暂无数据</view>
		</view>
	</view>
</template>
<script>
	const app = getApp()
	import helper from '../common/helper.js';
	export default {
		data() {
			return {
				list:[],
				page: '1',
				page_size:'10',
				boardId: '0',
				imgUrl: '',
				bank_id: '0',
				child_id: '0'
			}
		},
		onShow(e) {
			// console.log(e)
			// this.board_id == e
			
		},
		onLoad(e) {
			console.log(e.id)
			console.log(e.bankId)
			this.imgUrl = helper.imgUrl
			console.log(this.imgUrl)
			this.boardId = e.id || 0

			this.bank_id =e.bankId || 0
			this.child_id = e.childId || 0
			this.getList()
			uni.setNavigationBarTitle({
				title: e.name
			})
		},
		onLaunch(){
			
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
						board_id: this.boardId,
						bank_id: this.bank_id,
						child_id: this.child_id,
						page_size: this.page_size,
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
.indexAccurate .contentList{
	width: 690rpx;
	padding: 10rpx 30rpx 30rpx;
}
.indexAccurate .contentList .item{
	display: flex;
	justify-content: space-between;
	margin-bottom: 40rpx;
}
.indexAccurate .contentList .item image{
	width: 202rpx;
	height: 150rpx;
	border-radius: 10rpx;
}
.indexAccurate .contentList .item .itemRight{
	width: 440rpx;
	display: flex;
	align-content: space-between;
	flex-wrap: wrap;
}
.indexAccurate .contentList .item .itemRight .title{
	font-size: 28rpx;
	color: #333333;
	font-weight: 600;
	overflow : hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.indexAccurate .itemCon{
	width: 440rpx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	/* justify-content: flex-end; */
	
}
.indexAccurate .itemCon text{
	display: block;
	font-size: 24rpx;
	color: #999999;
}
.indexAccurate .itemCon text:nth-child(2){
	width: 160rpx;
	overflow : hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	text-align: center;
}
</style>
