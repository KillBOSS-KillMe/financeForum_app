<template>
	<view class="productSupermarket">
		<view class="banner">
			<swiper class="swiper" :indicator-dots="indicatorDots" indicator-color="#D2D2D2" indicator-active-color="#2390DC">
				<block v-for="(itemAll, index) in navList" :key="index">
					<swiper-item>
						<view class="navs">
							<block v-for="(sonItem, sonIndex) in itemAll" :key="sonIndex">
								<!-- {{sonIndex}} -->
								<view class="bannerItem" v-if="sonIndex <= 9" @tap="navsHead" :data-id='sonItem.id' :data-title='sonItem.title'>
									<image src="../static/imgLost.png" mode="" v-if="sonItem.icon == ''"></image>
									<image :src="imgUrl + sonItem.icon" mode="" v-else></image>
									<text>{{ sonItem.title }}</text>
								</view>
							</block>
						</view>
					</swiper-item>
				</block>
			</swiper>
		</view>
		<view class="line"></view>
		<view class="query" @tap="getSearch">
			<input type="text" value="" @input="onInput" placeholder="请输入需要查询的贷款工具" disabled="disabled" />
			<text>查网贷</text>
		</view>
		<view class="line" style="margin-bottom: 18rpx;"></view>
		<view class="content">
			<view>
				<view class="nav-left">
					<scroll-view scroll-y class="oneScroll">
						<block v-for="(item, index) in navLeft" :key="index">
							<view class="nav-left-item" @tap="leftNav(index,item.id)" :class="['colorD', active == index ? 'color' : '']">{{ item.bank }}</view>
						</block>
					</scroll-view>
				</view>
				<uni-drawer :visible="showLeft" @close="closeDrawer">
				    <view style="padding:30rpx;">
				        <view class="uni-title" @tap="clickItem(bankId)">全部产品</view>
				    </view>
						<block v-for="(item, index) in letfNavChild" :key="index">
							<view style="padding:30rpx;">
							    <view class="uni-title" @tap="childItem(bankId,item.id,item.child )">{{ item.child }}</view>
							</view>
						</block>
				</uni-drawer>
			</view>
			
			<view class="nav_left">
				<view class="inv-h-w">
					<view :class="['inv-h', Inv == 0 ? 'inv-h-se' : '']" @tap="changeTab(0)">最新产品</view>
					<view :class="['inv-h', Inv == 1 ? 'inv-h-se' : '']" @tap="changeTab(1)">热门产品</view>
					<view :class="['inv-h', Inv == 3 ? 'inv-h-se' : '']" @tap="changeTab(3)">推荐产品</view>
				</view>
				<view class="navLeftNav">
					<text @tap="headNav(0,0)" :class="['navColor', activeHead == 0 ? 'navA' : '']">全部</text>
					<block v-for="(item, index) in navReft" :key="index">
						<text @tap="headNav(index + 1,item.id)" :class="['navColor', activeHead == index + 1 ? 'navA' : '']">{{ item.class_name }}</text>
					</block>
				<!-- 	<text @tap="headNav(0)" :class="['navColor', activeHead == 0 ? 'navA' : '']">全部</text>
					<text @tap="headNav(1)" :class="['navColor', activeHead == 1 ? 'navA' : '']">车贷</text> -->
				</view>
				<view class="contentList">
					<scroll-view scroll-y class="twoScroll">
						<block v-for="(item, index) in list" :key="index">
							<view class="item" @tap="goProduct" :data-id="item.id">
								<image :src="imgUrl + item.icon" mode="aspectFill"></image>
								<view class="itemRight">
									<view class="productInfo">
										<text>{{ item.name }}</text>
										<text style="font-size: 20rpx;">申请人{{ item.apply_sum }}</text>
									</view>
									<view class="moneyBox">
										<view class="money">
											额度：
											<text>{{ item.quota }}</text>
										</view>
										<view class="money">
											费用：
											<text>{{ item.fee_ratio }}</text>
										</view>
									</view>
									<text class="title">{{ item.introduction }}</text>
								</view>
							</view>
						</block>
						<view class="null" v-if="list.length == 0">暂无数据</view>
					</scroll-view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
const app = getApp();
import helper from '../common/helper.js';
import uniDrawer from '@/components/uni-drawer.vue'
export default {
	data() {
		return {
			indicatorDots: true,
			Inv: 0,
			list: [],
			keywords: '',
			navList: [],
			tabType: 'is_new',
			page_size: '10',
			page: '1',
			imgUrl: '',
			navLeft: [],
			navReft: [],
			active: '0',
			activeStyle: {
				color: this.activeTextColor,
				backgroundColor: this.activeBackgroundColor
			},
			activeHead: '0',
			showLeft: false,
			classType: '0',
			bankId: '',
			letfNavChild: []
		};
	},
	components: {uniDrawer},
	onLoad() {
		this.getNav();
		// this.getTab();
		this.imgUrl = helper.imgUrl;
		this.getNavLeft()
	},
	methods: {
		// 轮播跳转
		navsHead(e) {
			console.log(e)
			uni.navigateTo({
				url: `/pages/allProduct?id=${e.currentTarget.dataset.id}&title=${e.currentTarget.dataset.title}`
			});
		},
		// 左边导航
		leftNav(index,id) {
			this.active = index;
			this.showLeft = true;
			this.bankId = id;
			this.page = '1';
			this.getLeftNavChild()
			console.log(id)
			console.log(this.showLeft)
		},
		// 左边导航数据
		getNavLeft(){
			uni.request({
				url: `${helper.requestUrl}/holes/banks`,
				method: 'GET',
				header: {
					authorization: app.globalData.token
				},
				success: res => {
					res = helper.null2str(res);
					console.log(res,'左边导航数据');
					if (res.data.status_code == 200) {
						this.navLeft = res.data.data;
						this.bankId = res.data.data[0].id
						console.log(this.bankId,'银行')
						this.getReftNav()
						// this.page = '1'
						// this.list = [];
						// this.getTab();
						
					} else {
						// uni.showToast({
						// 	title: res.data.message,
						// 	icon: 'none'
						// });
					}
				}
			});
		},
		childItem(bankId,childId,name){
			this.showLeft = false;
			uni.navigateTo({
				url: `/pages/indexA?bankId=${bankId}&name=${name}&childId=${childId}`
			})
		},
		// 获取银行子类
		getLeftNavChild(){
			uni.request({
				url: `${helper.requestUrl}/holes/bank_child`,
				method: 'GET',
				header: {
					authorization: app.globalData.token
				},
				success: res => {
					res = helper.null2str(res);
					console.log(res,'右边导航数据');
					if (res.data.status_code == 200) {
						this.letfNavChild = res.data.data;
					} else {
						
					}
				}
			});
		},
		// 右边导航数据
		getReftNav(){
			uni.request({
				url: `${helper.requestUrl}/holes/loan_class`,
				method: 'GET',
				header: {
					authorization: app.globalData.token
				},
				success: res => {
					res = helper.null2str(res);
					console.log(res,'右边导航数据');
					if (res.data.status_code == 200) {
						this.navReft = res.data.data;
						this.list = [];
						this.getTab();
					} else {
						// uni.showToast({
						// 	title: res.data.message,
						// 	icon: 'none'
						// });
					}
				}
			});
		},
		closeDrawer() {
			this.showLeft = false
		},
		clickItem(bankId){
			this.showLeft = false
			this.bankId = bankId
			this.page = '1';
			this.list = []
			this.getTab()
		},
		// 右边头部导航
		headNav(index,id) {
			console.log(index,id);
			this.activeHead = index;
			this.classType = id
			this.list = [];
			this.page = '1';
			this.getTab()
		},
		changeTab(e) {
			console.log(e);
			this.Inv = e;
			this.page = '1';
			if (this.Inv == 0) {
				// 最新
				this.tabType = 'is_new';
			} else if (this.Inv == 1) {
				// 热门
				this.tabType = 'is_hot';
			} else if (this.Inv == 3) {
				// 推荐
				this.tabType = 'is_romend';
			}
			this.list = [];
			this.getTab();
		},
		getSearch() {
			uni.navigateTo({
				url: '/pages/searchNetloan'
			});
		},
		//轮播导航
		getNav() {
			uni.request({
				url: `${helper.requestUrl}/holes/categories`,
				method: 'GET',
				header: {
					authorization: app.globalData.token
				},
				success: res => {
					res = helper.null2str(res);
					console.log(res);
					if (res.data.status_code == 200) {
						let arr = res.data.data;
						let result = [];
						let num = 10;
						for (let i = 0; i < arr.length; i += num) {
							result.push(arr.slice(i, i + num));
						}
						console.log(result);
						this.navList = result;
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						});
					}
				}
			});
		},
		// 最新
		getTab() {
			uni.request({
				url: `${helper.requestUrl}/holes/index-recommends`,
				method: 'GET',
				header: {
					authorization: app.globalData.token
				},
				data: {
					type: this.tabType,
					bank_id: this.bankId,
					class_id: this.classType,
					page_size: this.page_size,
					page: this.page
				},
				success: res => {
					res = helper.null2str(res);
					console.log(res);
					if (res.data.status_code == 200) {
						this.list = this.list.concat(res.data.data);
					} else {
						// uni.showToast({
						// 	title: res.data.message,
						// 	icon: 'none'
						// });
					}
				}
			});
		},
		goProduct(e) {
			console.log(e);
			let id = e.currentTarget.dataset.id;
			uni.navigateTo({
				url: `/pages/productDetail?id=${id}`
			});
		},
		onReachBottom() {
			this.page++;
			this.getTab();
		}
	}
};
</script>

<style>
.productSupermarket {
	width: 750rpx;
}
.banner {
	width: 690rpx;
	height: 360rpx;
	padding: 30rpx 30rpx 20rpx;
}
.banner .swiper {
	width: 100%;
	height: 100%;
}
.navs {
	display: flex;
	flex-wrap: wrap;
	height: 340rpx;
	justify-content: flex-start;
}
.navs .bannerItem {
	display: flex;
	justify-content: center;
	width: 140rpx;
	margin-bottom: 26rpx;
	margin-right: 40rpx;
	flex-wrap: wrap;
	height: 160rpx;
}
.navs .bannerItem:nth-child(4n) {
	margin-right: 0rpx;
}
.navs .bannerItem > image {
	width: 66rpx;
	height: 66rpx;
}
.uni-swiper-dots-horizontal {
	bottom: 0 !important;
}
.navs .bannerItem > text {
	color: #333333;
	font-weight: 600;
	font-size: 28rpx;
}
.quickInlet {
	width: 690rpx;
	padding: 30rpx;
	display: flex;
	justify-content: space-between;
}
.quickInlet .quickItem {
	display: flex;
	align-content: center;
	align-items: center;
}
.quickInlet .quickItem > image {
	width: 96rpx;
	height: 96rpx;
	border-radius: 96rpx;
	margin-right: 20rpx;
}
.quickInlet .quickItem text {
	color: #999;
	font-weight: 600;
	font-size: 28rpx;
}
.quickInlet .quickItem .limit {
	color: #333;
	font-weight: 600;
	font-size: 32rpx;
	margin-top: 10rpx;
}
.query {
	width: 690rpx;
	padding: 30rpx;
	display: flex;
	justify-content: space-between;
}
.query input {
	width: 470rpx;
	border: 1rpx solid #f9f9f9;
	height: 70rpx;
	line-height: 70rpx;
	padding: 0 20rpx;
	color: #999999;
	font-size: 28rpx;
	font-size: 600;
	border-radius: 10rpx;
}
.query text {
	color: #fff;
	font-size: 28rpx;
	font-size: 600;
	background: #2390dc;
	width: 140rpx;
	text-align: center;
	line-height: 70rpx;
	border-radius: 10rpx;
}
.content {
	width: 750rpx;
	/* padding: 0 30rpx; */
	display: flex;
	height: 40vh;
}
.content .inv-h-w {
	display: flex;
	width: 510rpx;
}
.content .inv-h {
	font-size: 32rpx;
	flex: 1;
	text-align: center;
	color: #999999;
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
	margin: 10rpx auto 0;
	border-radius: 3rpx;
}
.content .contentList {
	width: 510rpx;
	/* background-color: #0066CC; */
}
.content .contentList .item {
	display: flex;
	justify-content: space-between;
	margin-bottom: 40rpx;
}
.content .contentList .item image {
	width: 100rpx;
	height: 100rpx;
	border-radius: 6rpx;
}
.content .contentList .item .itemRight {
	/* width: 530rpx; */
	display: flex;
	align-content: space-between;
	flex-wrap: wrap;
	width: 389rpx;
}
.content .contentList .item .itemRight .productInfo {
	/* width: 530rpx; */
	display: flex;
	justify-content: space-between;
}
.content .contentList .item .itemRight .productInfo > text {
	font-size: 24rpx;
	color: #333333;
	font-weight: 600;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	width: 270rpx;
}
.content .contentList .item .itemRight .productInfo > view {
	display: flex;
	align-content: flex-start;
	align-items: flex-start;
}
.content .contentList .item .itemRight .productInfo > view text {
	font-size: 26rpx;
	color: #999;
}
.content .contentList .item .itemRight .productInfo > view .cur {
	color: #f69522;
	margin-left: 6rpx;
}
.content .contentList .item .itemRight .title {
	font-size: 22rpx;
	color: #999;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}
.content .moneyBox {
	width: 400rpx;
	display: flex;
}
.content .money {
	display: flex;
	font-size: 20rpx;
	color: #999;
	margin-right: 20rpx;
	white-space: nowrap;
	margin-top: 6rpx;
}
.content .money > text {
	color: #f69522;
	font-weight: 600;
	/* margin-left: 10rpx; */
}

.oneScroll{
	height: 100vh;
}
.twoScroll{
	height: 88vh;
}
.nav-left {
	width: 190rpx;
	margin-right: 20rpx;
}
.nav-left-item {
	height: 92rpx;
	font-size: 26rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.colorD {
	background: #2390dc;
	color: #fff;
}
.navColor {
	opacity: 0.6;
}
.navA {
	opacity: 1;
}
.color {
	background: #fff;
	color: #333;
}
.navLeftNav {
	width: 510rpx;
	display: flex;
	justify-content: flex-start;
	margin: 20rpx 0 30rpx;
}
.navLeftNav text {
	font-size: 24rpx;
	font-weight: 400;
	text-align: center;
	margin-right: 14rpx;
}
.uni-title{
	font-size: 28rpx;
	text-align: center;
	margin-bottom: 10rpx;
}
</style>
