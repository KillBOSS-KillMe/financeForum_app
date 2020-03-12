<template>
	<view class="exchang">
		<pageSearch></pageSearch>
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
		<view class="content">
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
							<!-- <text class="itemContent">贷款产品交流贷款产品交流贷款产品交流贷款产品交流贷款产品交流贷款产品交流贷款产品交流贷款产品交流贷款产品交流</text> -->
							<block v-for="(item1, index) in item.photoalbums" :key="index"><image class="imgList" :src="imgUrl+item1.image" mode=""></image></block>
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
				// { id: '1', img: 'iconxiepinglun', title: '实战心得' },
				// { id: '2', img: 'iconliebiao', title: '拒贷汇总' },
				{ id: '3', img: 'iconbulletin', title: '微金公告' },
				// { id: '4', img: 'iconyonghu', title: '从业感悟' },
				{ id: '5', img: 'iconqiapiansousuo', title: '论坛搜索' }
			],
			Inv: 0,
			pageData: '',
			imgUrl:'',
			page: '1',
			boardId:''
		};
	},
	onLoad() {
		// 加载微金交流首页数据
		this.getIndexData();
		this.imgUrl = helper.imgUrl
	},
	methods: {
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
			if (id == '1') {
				uni.navigateTo({
					url: `/pages/experience`
				});
			}else if(id== '2'){
				uni.navigateTo({
					url: `/pages/indexA?id=${14}&name=拒贷汇总`
				});
			}else if(id== '3'){
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
	padding: 30rpx;
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
}
.exchang .nav .item{
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
.content {
	width: 690rpx;
	padding: 0 30rpx;
}
.content .inv-h-w {
	display: flex;
}
.content .inv-h {
	font-size: 32rpx;
	flex: 1;
	text-align: center;
	color: #999999;
	padding: 30rpx 0;
	font-weight: 600;
}
.content .inv-h-se {
	color: #2390dc;
	font-weight: 600;
}
.content .inv-h-se:after {
	content: ' ';
	display: block;
	border-bottom: 6rpx solid #2390dc;
	width: 46rpx;
	margin: 26rpx auto 0;
	border-radius: 3rpx;
}
.content .contentList .item {
	display: flex;
	justify-content: space-between;
	margin-bottom: 40rpx;
}
.content .contentList .item > image {
	width: 85rpx;
	height: 85rpx;
	border-radius: 85rpx;
}
.content .contentList .item .itemRight {
	width: 580rpx;
	display: flex;
	align-content: flex-start;
	flex-wrap: wrap;
}
.content .contentList .item .itemRight .title {
	font-size: 28rpx;
	color: #333333;
	font-weight: 600;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	margin: 10rpx 0;
}
.content .itemCon {
	width: 580rpx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
		margin-top: 16rpx;
	/* justify-content: flex-end; */
}
.content .itemCon text {
	display: block;
	font-size: 24rpx;
	color: #999999;
}
.itemRightHead {
	width: 580rpx;
	display: flex;
	justify-content: space-between;
}
.itemRightHead text {
	color: #333333;
	font-size: 28rpx;
	font-weight: 600;
}
.itemRightHead > view,
.itemRightHead > view > text {
	color: #2390dc;
	font-size: 28rpx;
	font-weight: 600;
}
.itemRightHead view {
	color: #2390dc;
	font-size: 28rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.itemRightHead view text {
	padding-left: 20rpx;
}
.itemContent {
	width: 580rpx;
	font-size: 28rpx;
	color: #666666;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.imgList {
	width: 140rpx;
	height: 140rpx;
	display: block;
	margin: 16rpx 10rpx 16rpx 0;
}
.imgList:nth-child(3n) {
	margin-right: 0;
}
.itemBottom {
	display: flex;
}
.itemBottom > view {
	display: flex;
	margin-left: 18rpx;
	align-content: center;
}
.itemBottom .exchangIcon{
	color: #999;
	font-size: 28rpx;
	margin-right: 10rpx;
}
</style>
