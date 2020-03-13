<template>
	<view class="exchang">
		<!-- <pageSearch></pageSearch> -->
		<view class="banner">
			<swiper class="swiper">
				<block v-for="(item,index) in pageData.ad.aditems" :key='index'>
					<swiper-item>
						<image :src="imgUrl+item.image" mode="aspectFill"></image>
					</swiper-item>
				</block>
				
			</swiper>
		</view>
		<view class="nav">
			<block v-for="(item, index) in navList" :key="index">
				<view class="item" @tap="getNav(item.id)">
					<view><uni-icon type="" class="iconfont" :class="item.img"></uni-icon></view>
					<text>{{ item.title }}</text>
				</view>
			</block>
		</view>
		<view class="line"></view>
		<view class="leftNav">
			<view class="nav-left">
				<scroll-view scroll-y>
					<view class="nav-left-item" v-for="(item,index) in categoryList" @click="categoryMainClick(item.id,index)" :key="index"
					 :class="['colorD', categoryActive == index ? 'color' : '']">
						{{item.title}}
					</view>
				</scroll-view>
			</view>
			<view class="nav-right">
				<scroll-view scroll-y :scroll-top="scrollTop" @scroll="scroll" scroll-with-animation>
					<view class="contentList">
						<view class="nav-right-item" v-for="(item,index2) in subCategoryList" :key="index2" @click="categorySubClick(item)">
							<image :src="item.img" />
							<text>{{item.title}}</text>
						</view>
					</view>
					<view class="null" v-if="subCategoryList.length == 0">暂无数据</view>
				</scroll-view>
			</view>
		</view>
<!-- 		<view class="content">
			<view class="inv-h-w">
				<block v-for="(item, index) in pageData.board_data" :key="index">
					<view :class="['inv-h', Inv == index ? 'inv-h-se' : '']" @tap="selListType" :data-index="index" :data-block_id="item.id">{{ item.title }}</view>
				</block>
			</view>
			<view class="contentList">
				<block v-for="(item, index) in pageData.board_data[Inv].posts" :key="index">
					<view class="item" @tap="goDetail(item.id)">
						<image :src="imgUrl+item.user.avatar" mode="aspectFill"></image>
						<view class="itemRight">
							<view class="itemRightHead">
								<text>{{item.user.name}}</text>
								<view>
									来自
									<text>{{item.from_board}}</text>
								</view>
							</view>
							<text class="title">{{ item.title }}</text>
						 <text class="itemContent">贷款产品交流贷款产品交流贷款产品交流贷款产品交流贷款产品交流贷款产品交流贷款产品交流贷款产品交流贷款产品交流</text> -->
			<!-- 				<block v-for="(item1, index) in item.photoalbums" :key="index"><image class="imgList" :src="imgUrl+item1.image" mode=""></image></block>
							<view class="itemCon">
								<text>{{ item.created_at }}</text>
								<view class="itemBottom">
									<view>
										<uni-icon type="" class="iconfont icondianzan exchangIcon"></uni-icon>
										<text>{{ item.like }}</text>
									</view>
									<view>
										<uni-icon type="" class="iconfont iconhuifu exchangIcon"></uni-icon>
										<text>{{ item.comments_count }}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</block>
				<view class="null" v-if="pageData.board_data[Inv].posts.length == 0">暂无数据</view>
			</view>
		</view> -->
		<view v-if="isShow">
			<view class="showModel" @touchmove.stop = ""></view>
			<view class="showText">您还不是会员暂无此权限！</view>
		</view>
	</view>
</template>

<script>
const app = getApp();
import helper from '../common/helper.js';
export default {
	data() {
		return {
			navList: [
				{ id: '3', img: 'iconbulletin', title: '微金公告' },
				{ id: '6', img: 'iconqiapiansousuo', title: '论坛搜索' },
				{ id: '2', img: 'iconliebiao', title: '贷款产品交流' },
				
				{ id: '4', img: 'iconyonghu', title: '信用卡交流' },
				{ id: '5', img: 'iconqiapiansousuo', title: '推荐热帖' },
				{ id: '1', img: 'iconxiepinglun', title: '网友交流' },
				// { id: '1', img: 'iconxiepinglun', title: '网友交流' },
				// // { id: '2', img: 'iconliebiao', title: '拒贷汇总' },
				// { id: '3', img: 'iconbulletin', title: '微金公告' },
				// // { id: '4', img: 'iconyonghu', title: '从业感悟' },
				// { id: '5', img: 'iconqiapiansousuo', title: '论坛搜索' }
			],
			Inv: 0,
			pageData: '',
			imgUrl:'',
			page: '1',
			boardId:'',
			isShow: false,
			categoryList:[
				{id:1,title:'直辖市'},
				{id:2,title:'华东地区'},
				{id:3,title:'华北地区'}
			],
			subCategoryList:[
				{id:'1',img: '../static/imgLost.png',title:'北京'},
				{id:'1',img: '../static/imgLost.png',title:'北京'},
				{id:'1',img: '../static/imgLost.png',title:'北京'},
				{id:'1',img: '../static/imgLost.png',title:'北京'},
			],
			categoryActive: 0,
		};
	},
	onLoad() {
		this.getUserInfo()
		// 加载微金交流首页数据
		this.getIndexData();
		this.imgUrl = helper.imgUrl
	},
	methods: {
		// 左边导航点击事件
		categoryMainClick(e,index){
			console.log(e,index);
			this.categoryActive = index;
			// uni.navigateTo({
			// 	url:`/pages/articleDetail?id=${e.id}`
			// })
		},
		selListType(e) {
			this.Inv = e.currentTarget.dataset.index
			this.boardId = e.currentTarget.dataset.block_id
			this.page = '1'
		},
		goDetail(e){
			uni.navigateTo({
				url:`/pages/articleDetail?id=${e}`
			})
		},
		// 获取用户信息
		getUserInfo(){
			uni.request({
				url: `${helper.requestUrl}/me`,
				method: 'POST',
				header: {
					authorization: app.globalData.token
				},
				success: res => {
					uni.hideLoading();
					res = helper.null2str(res)
					console.log(res,'++++++++')
					let user = res.data.type
					if(user != 'member'){
						this.isShow = true
					}else{
						this.isShow = false
					}
					// this.userInfo = res.data
				}
			})
		},
		// 数据
		getIndexData() {
			uni.showLoading({
				title: '加载中...',
				duration: 1000000
			});
			uni.request({
				url: `${helper.requestUrl}/forum/index`,
				method: 'GET',
				header: {
					authorization: app.globalData.token
				},
				success: res => {
					uni.hideLoading();
					res = helper.null2str(res);
					console.log(res);
					if (res.data.status_code == '200') {
						this.pageData = res.data.data;
						this.boardId = res.data.data.board_data[0].id
						console.log(this.boardId,'88')
						
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						});
					}
				}
			});
		},
		// 导航子页面跳转
		getNav(e) {
			console.log(e);
			let id = e;
			if(id== '3'){
				uni.navigateTo({
					url: `/pages/indexA?id=${23}&name=微金公告`
				});
			}
		},
		// 加载下一页
		onReachBottom(){
			this.page ++;
			this.getList()
		},
		getList() {
			uni.showLoading({
				title: '加载中...',
				duration: 1000000
			});
			uni.request({
				url: `${helper.requestUrl}/forum/posts`,
				method: 'GET',
				header: {
					authorization: app.globalData.token
				},
				data:{
					board_id: this.boardId,
					page: this.page,
					page_size: '10'
				},
				success: res => {
					uni.hideLoading();
					res = helper.null2str(res);
					console.log(res);
					if (res.data.status_code == '200') {
						this.pageData.board_data[this.Inv].posts = this.pageData.board_data[this.Inv].posts.concat(res.data.data);
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						});
					}
				}
			});
		},
	}
};
</script>

<style>
.exchang {
	width: 750rpx;
}
.banner{
	width: 690rpx;
	height: 160rpx;
	background: #007AFF;
	margin: 30rpx;
	border-radius: 10rpx;
}
.banner image{
	width: 690rpx;
	height: 160rpx;
}
.swiper{
	width: 690rpx;
	height: 160rpx;
	overflow: hidden;
}
.exchang .nav {
	width: 690rpx;
	padding: 0 30rpx;
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
}
.exchang .nav .item{
	width: 210rpx;
	margin: 30rpx 0;
	/* display: flex;
	justify-content: center;
	flex-wrap: wrap; */
}
.exchang .nav .item>view{
	width: 96rpx;
	height: 96rpx;
	border-radius: 96rpx;
	display: flex;
	justify-content: center;
	align-content: center;
	align-items: center;
	margin: 0 auto;
	background-image: linear-gradient(#F9A2A2, #F46969);
}
.exchang .nav .item:nth-child(2)>view{
	background-image: linear-gradient(#F9D5A1, #F4C26B);
}
.exchang .nav .item:nth-child(3)>view{
	background-image: linear-gradient(#B4A1F9, #826BF4);
}
.exchang .nav .item:nth-child(4)>view{
	background-image: linear-gradient(#A1DDF9, #6BD2F4);
}
.exchang .nav .item:nth-child(5)>view{
	background-image: linear-gradient(#A1F9D9, #6BF4B2);
}
.exchang .nav .iconfont{
	color: #fff;
	font-size: 46rpx;
}
.exchang .nav .item text {
	display: block;
	text-align: center;
	color: #333333;
	font-size: 28rpx;
	font-weight: 600;
	margin-top: 10rpx;
}
 .leftNav {
		display: flex;
		height: calc(100vh - 9px);
		width: 750rpx;
		margin-top: 16rpx;
	}
	scroll-view {
		height: 100%;
	}
	.nav-left {
		width: 190rpx;
	
	}
	.contentList{
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
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
		padding: 22rpx 0 22rpx 22rpx;
	}

	.nav-right-item {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		margin: 0 20rpx 30rpx 0;
		width: 148rpx;
	}
	.nav-right-item:nth-of-type(3n){
		margin: 0 0 30rpx 0;
	}
	.nav-right-item image {
		width: 130rpx;
		height: 110rpx;
		border-radius: 8rpx;
		/* margin-right: 16rpx; */
	}
 .nav-right-item text{
	 font-size: 26rpx;
	 text-align: center;
	 overflow: hidden;
	 -webkit-line-clamp: 1;
	 color: #333;
	 display: -webkit-box;
	 -webkit-box-orient: vertical;
	 text-overflow: ellipsis;
 }
	.padding {
		height: var(--status-bar-height);
		width: 100%;
		top: 0;
		position: fixed;
		background-color: #F24544;
	}
	.colorD {
		background: #2390dc;
		color: #fff;
	}
	.color {
		background: #fff;
		color: #333;
	}
</style>
