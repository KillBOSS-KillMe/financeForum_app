<template>
	<view class="productSupermarket">
		<view class="banner">
			<swiper class="swiper" :indicator-dots="indicatorDots" indicator-color="#D2D2D2" indicator-active-color="#2390DC">
				<swiper-item>
					<view class="swiper-item">
						<view class="bannerItem">
							<image src="../static/logo.png" mode=""></image>
							<text>社保贷</text>
						</view>
						<view class="bannerItem">
							<image src="../static/logo.png" mode=""></image>
							<text>社保贷</text>
						</view>
						<view class="bannerItem">
							<image src="../static/logo.png" mode=""></image>
							<text>社保贷</text>
						</view>
						<view class="bannerItem">
							<image src="../static/logo.png" mode=""></image>
							<text>社保贷</text>
						</view>
						<view class="bannerItem">
							<image src="../static/logo.png" mode=""></image>
							<text>社保贷</text>
						</view>
						<view class="bannerItem">
							<image src="../static/logo.png" mode=""></image>
							<text>社保贷</text>
						</view>
						<view class="bannerItem">
							<image src="../static/logo.png" mode=""></image>
							<text>社保贷</text>
						</view>
					</view>
				</swiper-item>
			<!-- 	<swiper-item><view class="swiper-item">B</view></swiper-item>
				<swiper-item><view class="swiper-item">C</view></swiper-item> -->
			</swiper>
		</view>
		<view class="line"></view>
		<view class="quickInlet">
			<view class="quickItem">
				<image src="../static/logo.png" mode=""></image>
				<view>
					<text class="limit">额度筛选</text>
					<text>按额度筛选贷款</text>
				</view>
			</view>
			<view class="quickItem">
				<image src="../static/logo.png" mode=""></image>
				<view>
					<text class="limit">额度筛选</text>
					<text>按额度筛选贷款</text>
				</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="query">
			<input type="text" value="" @input="onInput" placeholder="请输入需要查询的贷款工具" />
			<text @tap="getSearch">查网贷</text>
		</view>
		<view class="line"></view>
		<view class="content">
			<view class="inv-h-w">
				<view :class="['inv-h',Inv==0?'inv-h-se':'']" @tap="Inv=0">最新产品</view>
				<view :class="['inv-h',Inv==1?'inv-h-se':'']" @tap="Inv=1">热门产品</view>
				<view :class="['inv-h',Inv==3?'inv-h-se':'']" @tap="Inv=3">推荐产品</view>
			</view>
			<view class="contentList">
				<view class="item" v-for="(item,index) in list" :key="index">
					<image :src="item.img" mode="aspectFill"></image>
					<view class="itemRight">
						<view class="productInfo">
							<text>{{item.name}}</text>
							<view>
								<text>申请人数:</text>
								<text class="cur">{{item.num}}</text>
							</view>
						</view>
						<view class="moneyBox">
							<view class="money">
								额度：<text>{{item.num}}</text>
							</view>
							<view class="money">
								费用：<text>{{item.num}}</text>
							</view>
						</view>
						<text class="title">{{item.title}}</text>
					<!-- 	<view class="itemCon">
							<text>{{item.time}}</text>
							<text>{{item.name}}</text>
							<text>{{item.num}}评</text>
						</view> -->
					</view>
				</view>
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
		    indicatorDots: true,
			Inv: 0,
			list:[
				{id:'1',img:'../static/b.jpg',time:'12小时前',name:'admin',num:'3',title:'云南城投股吧说说股票风险如何控制云南城投股吧说说股票风险如何控制云南城投股吧说说股票风险如何控制'},
				{id:'1',img:'../static/b.jpg',time:'11小时前',name:'admin',num:'3',title:'dgfdhdyju'},
				{id:'1',img:'../static/b.jpg',time:'12小时前',name:'admin',num:'2',title:'云南城投股吧说说股票风险如何控制云南城投股吧'}
			],
			kewords: ''
		};
	},
	onLoad() {
		// this.getPage()
	},
	methods: {
		//搜索查询网贷
		onInput(e){
			this.kewords = e.detail.value
		},
		getSearch(){
			if( this.kewords == ''){
				uni.showToast({
					title: "请输入查询内容",
					icon: "none"
				})
				return false
			}
			uni.request({
				url: `${helper.requestUrl}/holes/search`,
				method: 'GET',
				// header: {
				// 	authorization: app.globalData.token
				// },
				data:{
					kewords: this.kewords
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
		}
	}
};
</script>

<style>
.productSupermarket{
	width: 750rpx;
	/* background: #F0AD4E; */
}
.banner{
	width: 690rpx;
	height: 370rpx;
	padding: 10rpx 30rpx;
}
.banner .swiper{
	height: 370rpx;
}
.swiper-item{
	display: flex;
	flex-wrap: wrap;
	height: 370rpx;
	justify-content: flex-start;
}
.swiper-item .bannerItem{
	display: flex;
	justify-content: center;
	width: 140rpx;
	margin-bottom: 26rpx;
	margin-right: 40rpx;
	flex-wrap: wrap;
}
.swiper-item .bannerItem:nth-child(4n){
	margin-right: 0rpx;
}
.swiper-item .bannerItem>image{
	width: 96rpx;
	height: 96rpx;
	border-radius: 96rpx;
}
.swiper-item .bannerItem>text{
	color: #333333;
	font-weight: 600;
	font-size: 28rpx;
}
.quickInlet{
	width: 690rpx;
	padding: 30rpx;
	display: flex;
	justify-content: space-between;
}
.quickInlet .quickItem{
	display: flex;
	align-content: center;
	align-items: center;
}
.quickInlet .quickItem>image{
	width: 96rpx;
	height: 96rpx;
	border-radius: 96rpx;
	margin-right: 20rpx;
}
.quickInlet .quickItem text{
	color: #999;
	font-weight: 600;
	font-size: 28rpx;
}
.quickInlet .quickItem .limit{
	color: #333;
	font-weight: 600;
	font-size: 32rpx;
	margin-top: 10rpx;
}
.query{
	width: 690rpx;
	padding: 30rpx;
	display: flex;
	justify-content: space-between;
}
.query input{
	width: 470rpx;
	border: 1rpx solid #F9F9F9;
	height: 70rpx;
	line-height: 70rpx;
	padding: 0 20rpx;
	color: #999999;
	font-size: 28rpx;
	font-size: 600;
	border-radius: 10rpx;
}
.query text{
	color: #fff;
	font-size: 28rpx;
	font-size: 600;
	background: #2390DC;
	width: 140rpx;
	text-align: center;
	line-height: 70rpx;
	border-radius: 10rpx;
}
.content{
	width: 690rpx;
	padding: 0 30rpx;
}
.content .inv-h-w{
	display: flex;
}
.content .inv-h{
	font-size: 32rpx;
	flex: 1;
	text-align: center;
	color: #999999;
	padding: 30rpx 0;
	font-weight: 600;
}
.content .inv-h-se{
	color: #2390DC;
	font-weight: 600;
}
.content .inv-h-se:after{
	content: " ";
	display: block;
	border-bottom: 6rpx solid #2390DC;
	width: 46rpx;
	margin: 26rpx auto 0;
	border-radius: 3rpx;
}
.content .contentList .item{
	display: flex;
	justify-content: space-between;
	margin-bottom: 40rpx;
}
.content .contentList .item image{
	width: 130rpx;
	height: 130rpx;
	border-radius: 10rpx;
}
.content .contentList .item .itemRight{
	width: 530rpx;
	display: flex;
	align-content: space-between;
	flex-wrap: wrap;
}
.content .contentList .item .itemRight .productInfo{
	width: 530rpx;
	display: flex;
	justify-content: space-between;
}
.content .contentList .item .itemRight .productInfo>text{
	font-size: 32rpx;
	color: #333333;
	font-weight: 600;
}
.content .contentList .item .itemRight .productInfo>view{
	display: flex;
	align-content: center;
	align-items: center;
}
.content .contentList .item .itemRight .productInfo>view text{
	font-size: 28rpx;
	color: #999;
}
.content .contentList .item .itemRight .productInfo>view .cur{
	color: #F69522;
	margin-left: 6rpx;
}
.content .contentList .item .itemRight .title{
	font-size: 28rpx;
	color: #999;
	overflow : hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}
.content .moneyBox{
	width: 530rpx;
	display: flex;
	
}
.content .money{
	display: flex;
	font-size: 28rpx;
	color: #999;
	margin-right: 20rpx;
}
.content .money>text{
	color: #F69522;
	font-weight: 600;
	margin-left: 10rpx;
}
/* .content .itemCon{
	width: 440rpx;
	display: flex;
	flex-direction: row;
	justify-content: space-between; */
	/* justify-content: flex-end;
	/* 
} */
/* .content .itemCon text{
	display: block;
	font-size: 24rpx;
	color: #999999;
} */ 
</style>
