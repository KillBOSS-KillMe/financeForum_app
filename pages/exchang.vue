<template>
	<view class="exchang">
		<view class="nav">
			<block v-for="(item, index) in navList" :key="index">
				<view class="item" @tap="getNav(item.type,item.title,item.img)">
					<view><uni-icon type="" class="iconfont" :class="item.img"></uni-icon></view>
					<text>{{ item.title }}</text>
				</view>
			</block>
		</view>
		<view class="line"></view>
		<view class="leftNav">
			<view class="nav-left">
				<scroll-view scroll-y>
					<view class="nav-left-item" @tap="getAll(-1)" :class="['colorD', categoryActive == -1 ? 'color' : '']">全国开放</view>
					<view class="nav-left-item" v-for="(item,index) in categoryList" @click="categoryMainClick(item.id,index)" :key="index"
					 :class="['colorD', categoryActive == index ? 'color' : '']">
						{{item.area_name}}
					</view>
				</scroll-view>
			</view>
			<view class="nav-right">
				<scroll-view scroll-y :scroll-top="scrollTop" @scroll="scroll" scroll-with-animation>
					<view class="contentList">
						<view class="nav-right-item" v-for="(item,index2) in subCategoryList" :key="index2" @click="categorySubClick(item.city_name,item.id,item.icon,area_id)">
							<image :src="imgUrl+item.icon" />
							<text>{{item.city_name}}</text>
						</view>
					</view>
					<view class="null" v-if="subCategoryList.length == 0">暂无数据</view>
				</scroll-view>
			</view>
		</view>
		<!-- <view v-if="isShow">
			<image class="showModel"  @touchmove.stop = "" src="../static/no.png" mode=""></image>
			<! <view class="showModel" @touchmove.stop = ""></view>
			<view class="showText">您还不是会员暂无此权限！</view> -->
		<!-- </view> -->
	</view>
</template>

<script>
const app = getApp();
import helper from '../common/helper.js';
export default {
	data() {
		return {
			navList: [
				{ id: '3', img: 'iconbulletin', title: '微金公告',type: '23'},
				{ id: '6', img: 'iconqiapiansousuo', title: '互动搜索',type: '' },
				{ id: '2', img: 'iconliebiao', title: '贷款产品互动',type: '1'},	
				{ id: '4', img: 'iconyonghu', title: '信用卡互动',type: '2' },
				{ id: '5', img: 'iconqiapiansousuo', title: '推荐热帖',type: '3' },
				{ id: '1', img: 'iconxiepinglun', title: '网友互动',type: ''},
			],
			imgUrl:'',
			isShow: false,
			categoryList:[],
			subCategoryList:[],
			categoryActive: '-1',
			area_id: '',
			token: '',
			type: ''
		};
	},
	onLoad() {	
		this.imgUrl = helper.imgUrl
		this.token = uni.getStorageSync('token')
	},
	onShow(){	
		this.getUserInfo()
		this.subCategoryList =[]
		// 加载微金交流首页数据
		this.getRegion();
		this.getList()
		// this.getAll()
	},
	methods: {
		// 左边导航点击事件
		categoryMainClick(e,index){
			console.log(e,index);
			this.categoryActive = index;
			this.area_id = e
			this.type = ''
			this.subCategoryList =[]
			this.getList()
		},
		getAll(e){
			console.log(e)
			this.area_id = ''
			this.type = 'all'
			this.subCategoryList =[]
			this.categoryActive = e;
			this.getList()
		},
		// 详情
		categorySubClick(title,id,img,fatheId){
			uni.navigateTo({
				url:`/pages/exchangList?title=${title}&id=${id}&img=${img}&fatheId=${fatheId}`
			})
		},
		// 获取用户信息
		getUserInfo(){
			uni.request({
				url: `${helper.requestUrl}/me`,
				method: 'POST',
				header: {
					authorization: this.token
				},
				success: res => {
					uni.hideLoading();
					res = helper.null2str(res)
					console.log(res,'++++++++')
					let user = res.data.type
					let vipType = res.data.vip_id
					if(user == 'normal'){
						this.isShow = true
					}else{
						if(vipType == '2' || vipType == '3'){
							this.isShow = false
						}else{
							this.isShow = true
						}
					}
					// this.userInfo = res.data
				}
			})
		},
		// 数据
		getRegion() {
			uni.request({
				url: `${helper.requestUrl}/areas/area-list`,
				method: 'GET',
				header: {
					authorization: this.token
				},
				success: res => {
					uni.hideLoading();
					res = helper.null2str(res);
					console.log(res);
					if (res.data.status_code == '200') {
						this.categoryList = res.data.data;
						// this.area_id = this.categoryList[0].id
						// this.getList()
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
			});
		},
		// 导航子页面跳转
		getNav(id,title,img) {
			if(id != ''){
				uni.navigateTo({
					url: `/pages/indexA?id=${id}&name=${title}`
				});
			}else{
				if(title == '网友互动'){
					uni.navigateTo({
						url:`/pages/boardData?title=${title}&id=${38}&img=${img}`
					})
				}
				
			}
			
		},
		// 加载下一页
		getList() {
			uni.showLoading({
				title: '加载中...',
				duration: 1000000
			});
			uni.request({
				url: `${helper.requestUrl}/areas/city-list`,
				method: 'POST',
				header: {
					authorization: this.token
				},
				data:{
					area_id: this.area_id,
					type: this.type
				},
				success: res => {
					uni.hideLoading();
					res = helper.null2str(res);
					console.log(res);
					if (res.data.status_code == '200') {
						this.subCategoryList = res.data.data;
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
	 color: #333;
	 width: 130rpx;
	 white-space: nowrap;
	 text-overflow: ellipsis;
	 overflow: hidden;
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
	.showModel{
		width: 750rpx;
		height: 100vh;
		position: absolute;
		z-index: 8;
		top: 0;
		left: 0;
	}
</style>
