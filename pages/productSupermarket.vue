<template>
	<view class="productSupermarket">
		<view class="banner">
			<swiper class="swiper" :indicator-dots="indicatorDots" indicator-color="#D2D2D2" indicator-active-color="#2390DC">
				<block v-for="(itemAll, index) in navList" :key="index">
					<swiper-item>
						<view class="navs">
							<block v-for="(sonItem, sonIndex) in itemAll" :key="sonIndex">
							<!-- {{sonIndex}} -->
							<view class="bannerItem" :data-id="sonItem.id" v-if="sonIndex <= 9">
								<image src="../static/logo.png" mode="" v-if="sonItem.icon == ''"></image>
								<image :src="sonItem.icon" mode="" v-else></image>
								<text>{{ sonItem.title }}</text>
							</view>
							</block>
						</view>
					</swiper-item>
				</block>
				
			</swiper>
		</view>
		<view class="line"></view>
		<view class="query"  @tap="getSearch">
			<input type="text" value="" @input="onInput" placeholder="请输入需要查询的贷款工具" disabled="disabled"/>
			<text>查网贷</text>
		</view>
		<view class="line"></view>
		<view class="content">
			<view class="inv-h-w">
				<view :class="['inv-h', Inv == 0 ? 'inv-h-se' : '']" @tap="changeTab(0)">最新产品</view>
				<view :class="['inv-h', Inv == 1 ? 'inv-h-se' : '']" @tap="changeTab(1)">热门产品</view>
				<view :class="['inv-h', Inv == 3 ? 'inv-h-se' : '']" @tap="changeTab(3)">推荐产品</view>
			</view>
			<view class="contentList">
				<block  v-for="(item, index) in list" :key="index">
					<view class="item" @tap="goProduct" :data-id="item.id">
						<image :src="imgUrl + item.icon" mode="aspectFill"></image>
						<view class="itemRight">
							<view class="productInfo">
								<text>{{ item.name }}</text>
								<view>
									<text>申请人数:</text>
									<text class="cur">{{ item.apply_sum }}</text>
								</view>
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
			indicatorDots: true,
			Inv: 0,
			list: [],
			keywords: '',
			navList: [],
			tabType: 'is_new',
			page_size: '10',
			page:'1',
			imgUrl: ''
		};
	},
	onLoad() {
		this.getNav();
		this.getTab();
		this.imgUrl = helper.imgUrl;
	},
	methods: {
		changeTab(e){
			console.log(e)
			this.Inv = e;
			this.page = '1'
			if(this.Inv == 0){
				// 最新
				this.tabType = 'is_new'
			} else if(this.Inv == 1){
				// 热门
				this.tabType = 'is_hot'
			} else if(this.Inv == 3){
				// 推荐
				this.tabType = 'is_romend'
			}
			this.list = []
			this.getTab()
		},
		getSearch() {
			uni.navigateTo({
				url:'/pages/searchNetloan'
			})
		},
		//导航
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
						let num = 10
						for (let i = 0; i < arr.length; i += num) {
							result.push(arr.slice(i,i+num))
						}
						console.log(result)
						this.navList = result
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
				data:{
					type: this.tabType,
					page_size:this.page_size,
					page:this.page
				},
				success: res => {
					res = helper.null2str(res);
					console.log(res);
					if (res.data.status_code == 200) {
						this.list = this.list.concat(res.data.data)
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						});
					}
				}
			});
		},
		goProduct(e){
			console.log(e)
			let id = e.currentTarget.dataset.id
			uni.navigateTo({
				url:`/pages/productDetail?id=${id}`
			})
		},
		onReachBottom() {
			this.page ++;
			this.getTab()
		}
	}
};
</script>

<style>
.productSupermarket {
	width: 750rpx;
	/* background: #F0AD4E; */
}
.banner {
	width: 690rpx;
	height: 370rpx;
	padding: 30rpx 30rpx;
}
.banner .swiper {
	height: 370rpx;
}
.navs {
	display: flex;
	flex-wrap: wrap;
	height: 370rpx;
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
	width: 96rpx;
	height: 96rpx;
	border-radius: 96rpx;
}
.uni-swiper-dots-horizontal{
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
.content .contentList .item image {
	width: 130rpx;
	height: 130rpx;
	border-radius: 10rpx;
}
.content .contentList .item .itemRight {
	width: 530rpx;
	display: flex;
	align-content: space-between;
	flex-wrap: wrap;
}
.content .contentList .item .itemRight .productInfo {
	width: 530rpx;
	display: flex;
	justify-content: space-between;
}
.content .contentList .item .itemRight .productInfo > text {
	font-size: 32rpx;
	color: #333333;
	font-weight: 600;
}
.content .contentList .item .itemRight .productInfo > view {
	display: flex;
	align-content: center;
	align-items: center;
}
.content .contentList .item .itemRight .productInfo > view text {
	font-size: 28rpx;
	color: #999;
}
.content .contentList .item .itemRight .productInfo > view .cur {
	color: #f69522;
	margin-left: 6rpx;
}
.content .contentList .item .itemRight .title {
	font-size: 28rpx;
	color: #999;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}
.content .moneyBox {
	width: 530rpx;
	display: flex;
}
.content .money {
	display: flex;
	font-size: 28rpx;
	color: #999;
	margin-right: 20rpx;
}
.content .money > text {
	color: #f69522;
	font-weight: 600;
	margin-left: 10rpx;
}

</style>
