<template>
	<view class="apply">
		<category :categoryList="categoryList" :subCategoryList="subCategoryList" @categoryMainClick="categoryMainClick" @categorySubClick="categorySubClick"></category>
	</view>
</template>

<script>
const app = getApp()
import helper from '../common/helper.js';
import category from "../components/qiyue-category.vue"
export default {
	components:{
		category
	},
	data() {
		return {
			categoryList:[],
			subCategoryList:[],
			imgUrl:'',
			page: '1',
			page_size: '10',
			boardId: ''
		}
	},
	onLoad() {
		this.imgUrl = helper.imgUrl
		this.getNav()
	},
	mounted() {
		// for(var i=0;i<20;i++){
		// 		var subList = [];
		// 		for(var j=0;j<30;j++){
		// 				subList.push({"name":"分类"+i+":商品"+j,"logo":"http://placehold.it/50x50"})
		// 		}
		// 		this.categoryList.push({"name":"分类"+i,"subCategoryList":subList})
		// }
		// this.subCategoryList = this.categoryList[0].subCategoryList;
	},
	methods: {
		categoryMainClick(e){
			console.log(e)
			this.boardId = e
			this.page = '1'
			this.page_size = '10'
			this.subCategoryList = []
			// this.subCategoryList = category.subCategoryList;
			this.getList()
		},
		categorySubClick(e){
			console.log(e);
			uni.navigateTo({
				url:`/pages/articleDetail?id=${e.id}`
			})
		},
		// 获取导航
		getNav(){
			uni.request({
				url: `${helper.requestUrl}/board/boards`,
				method: 'GET',
				header: {
					authorization: app.globalData.token
				},
				success: res => {
					res = helper.null2str(res)
					console.log(res)
					if (res.data.status_code == 200) {
						this.categoryList = res.data.data
						this.boardId = res.data.data[0].id
						this.getList()
						console.log(this.boardId)
					} else {
						uni.showToast({
							title: res.data.message
						});
					}
			
				}
			})
		},
		//获取数据
		getList(){
			uni.request({
				url: `${helper.requestUrl}/posts/board-posts`,
				method: 'GET',
				header: {
					authorization: app.globalData.token
				},
				data:{
					board_id: this.boardId,
					page_size: this.page_size,
					page: this.page
				},
				success: res => {
					res = helper.null2str(res)
					console.log(res)
					if (res.data.status_code == 200) {
						 this.subCategoryList = this.subCategoryList.concat(res.data.data)
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
		onReachBottom() {
			this.page ++;
			this.getList()
		}
	}
}
</script>

<style>
.apply {
	width: 750rpx;
}
.collection {
	width: 690rpx;
	padding: 30rpx 30rpx 0;
}
.collection .title {
	color: #333333;
	font-size: 32rpx;
	font-weight: 600;
}
.collectionList {
	margin: 30rpx 0;
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
}
.collectionList .item {
	/* margin-right: ; */
	width: 131rpx;
	margin: 0 8rpx 30rpx 0;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
}
.collectionList .item:nth-child(5n) {
	margin-right: 0;
}
.collectionList .item image {
	width: 96rpx;
	height: 96rpx;
	border-radius: 50rpx;
	display: block;
}
.collectionList .item text {
	display: block;
	font-size: 28rpx;
	color: #333333;
	font-weight: 600;
	margin-top: 16rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.line {
	width: 750rpx;
	background: #f9f9f9;
	height: 6rpx;
}
</style>
