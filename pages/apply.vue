<template>
	<view class="apply">
		<view class="nav">
			<view class="nav-left">
				<scroll-view scroll-y>
					<view class="nav-left-item" v-for="(item,index) in categoryList" @click="categoryMainClick(item.id,index,item.title)" :key="index"
					 :style="index==categoryActive?'color:'+activeTextColor+';background-color:'+activeBackgroundColor:''">
						{{item.title}}
					</view>
				</scroll-view>
			</view>
			<view class="nav-right">
				<scroll-view  scroll-y="true"  @scrolltolower="toLowFun">
					<view class="nav-right-item" v-for="(item,index2) in subCategoryList" :key="index2" @click="categorySubClick(item)">
						<image :src="imgUrl+item.photoalbums[0].path" />
						<view class="navRightContent">
							<text>{{item.title}}</text>
							<view class="applyInfo">
								<text class="time">{{item.created_at}}</text>
								<text class="name">{{item.user.name}}</text>
								<text>评{{item.comments_count}}</text>
							</view>
						</view>
					</view>
					<view class="null" v-if="isShow">暂无数据</view>
					<view v-if="isShow1">
						<image class="showModel" @touchmove.stop = "" src="../static/no.png" mode=""></image>
					</view>
				</scroll-view>
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
			categoryList:[],
			subCategoryList:[],
			imgUrl:'',
			page: '1',
			page_size: '10',
			boardId: '',
			categoryActive: 0,
			activeStyle: {
				color: this.activeTextColor,
				backgroundColor: this.activeBackgroundColor
			},
			vip:'',
			isShow: true,
			isShow1: false
		}
	},
	props: {
		//主分类激活索引
		defaultActive: {
			type: Number,
			default: 0
		},
		activeTextColor: {
			type: String,
			default: '#333'
		},
		activeBackgroundColor: {
			type: String,
			default: '#ffffff'
		},
	},
	onLoad() {
		this.imgUrl = helper.imgUrl
	},
	onShow() {
		this.getNav()
		this.categoryActive = 0
		this.subCategoryList = []
	},
	mounted() {
		
	},
	methods: {
		categoryMainClick(id,index,name){
			this.boardId = id
			this.page = '1'
			this.page_size = '10'
			this.subCategoryList = []
			this.categoryActive = index;
			this.getList()
		},
		categorySubClick(e){
			// console.log(e);
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
						// console.log(this.boardId)
					} else {
						if(res.data.message == '用户不存在或登陆已过期'){
							uni.showToast({
								title: '未检测到用户的登录记录，请进行登录',
								icon: 'none',
								duration: 3000
							});
							setTimeout(() => {
								// 进入登录页
								uni.reLaunch({
									url: './login'
								});
							}, 3000)
						}else{
							uni.showToast({
								title: res.data.message,
								icon: 'none',
								duration: 3000
							});
						}
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
							this.isShow = true
							// console.log(this.isShow )
							this.isShow1 = false
						 }else{
							 this.isShow =false
							 this.isShow1 = false
						 }
						
					} else if(res.data.status_code == 202) {
						this.vip = res.data.message
						this.isShow1 = true
						this.isShow = false
					}else{
						uni.showToast({
							title: res.data.message,
							icon:'none',
							duration:2000
						});
					}
			
				}
			})
		},
		// scroll() {
		// 	this.page ++;
		// 	this.getList()
		// }
		toLowFun() {
			this.page++;
			this.getList()
		}
	}
}
</script>

<style>
	.apply {
		width: 750rpx;
	}
 .nav {
		display: flex;
		height: calc(100vh - 0px);
		width: 750rpx;
	}
	scroll-view {
		height: 100%;
	}
	.nav-left {
		width: 190rpx;
	
	}
	.nav-left-item {
		height: 92rpx;
		font-size: 26rpx;
		display: flex;
		align-items: center;
		justify-content: center;
			background: #2390dc;
			color: #fff;
	}
	.nav-right {
		width: 510rpx;
		padding: 22rpx 0 0 22rpx;
		height: 97vh;
	}

	.nav-right-item {
		display: flex;
		justify-content: flex-start;
		margin: 0 0 30rpx;
		width: 504rpx;
	}
	.navRightContent{
		width: 440rpx;
		display: flex;
		align-content: space-between;
		flex-wrap: wrap;
	}
	.navRightContent>text{
		font-size: 26rpx;
		color: #333333;
		font-weight: 600;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.nav-right-item image {
		width: 130rpx;
		height: 110rpx;
		border-radius: 8rpx;
		margin-right: 16rpx;
	}
	.applyInfo{
		display: flex;
		justify-content: space-between;
		width: 354rpx;
	}
	.applyInfo>text{
		display: block;
		font-size: 22rpx;
		color: #999999;
	}
	.name{
		width: 90rpx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.time{
		width: 150rpx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.active {
		color: #2390DC;
	}

	.padding {
		height: var(--status-bar-height);
		width: 100%;
		top: 0;
		position: fixed;
		background-color: #F24544;
	}
	.showModel{
		width: 510rpx;
		padding: 22rpx 0 0 22rpx;
		height: 97vh;
		position: absolute;
		top: 0;
		right: 0;
		z-index: 9;
	}
</style>
