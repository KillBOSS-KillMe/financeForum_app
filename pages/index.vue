<template>
	<view class="index">
		<pageSearch></pageSearch>
		<!-- 轮播 -->
		<view class="page-section-spacing banner">
			<swiper class="swiper" :indicator-dots="indicatorDots" indicator-color="rgba(255,255,255,.3)" indicator-active-color="#fff" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item  v-for="(item,index) in bannerList" :key="index">
					<image class="bannerImg" :src="item.img" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 导航 -->
		<view class="nav">
			<block v-for="(item,index) in nav" :key="index">
				<view class="navList" @tap="goTo" :data-id="item.id">
					<image :src="item.img" mode="aspectFill"></image>
					<text>{{item.title}}</text>
				</view>
			</block>
		</view>
		<!-- 数据列表 -->
		<view class="content">
			<view class="inv-h-w">
				<view :class="['inv-h',Inv==0?'inv-h-se':'']" @tap="Inv=0">最新产品解析</view>
				<view :class="['inv-h',Inv==1?'inv-h-se':'']" @tap="Inv=1">办卡提额技术</view>
			</view>
			<view class="contentList">
				<view class="item" v-for="(item,index) in list" :key="index">
					<image :src="item.img" mode="aspectFill"></image>
					<view class="itemRight">
						<text class="title">{{item.title}}</text>
						<view class="itemCon">
							<text>{{item.time}}</text>
							<text>{{item.name}}</text>
							<text>{{item.num}}评</text>
						</view>
					</view>
				</view>
				<uni-load-more  :loadingType="loadingType" :contentText="contentText" ></uni-load-more>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello',
			background: ['color1', 'color2', 'color3'],
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500,
			bannerList:[
				{id:'1',img:'../static/a.jpg'},
				{id:'2',img:'../static/b.jpg'},
				{id:'12',img:'../static/a.jpg'},
			],
			nav:[
				{id:'1',title:'产品超市',img:'../static/a.jpg'},
				{id:'2',title:'信贷技术',img:'../static/a.jpg'},
				{id:'3',title:'办卡提额',img:'../static/a.jpg'},
				{id:'1',title:'信用修复',img:'../static/a.jpg'},
				{id:'1',title:'查询工具',img:'../static/a.jpg'},
				{id:'1',title:'精准匹配',img:'../static/a.jpg'},
				{id:'1',title:'最新资讯',img:'../static/a.jpg'},
				{id:'1',title:'小微企业',img:'../static/a.jpg'},
				{id:'1',title:'负债重组',img:'../static/a.jpg'},
				{id:'1',title:'开通会员',img:'../static/a.jpg'}
			],
			Inv:0,
			list:[
				{id:'1',img:'../static/b.jpg',time:'12小时前',name:'admin',num:'3',title:'云南城投股吧说说股票风险如何控制云南城投股吧说说股票风险如何控制云南城投股吧说说股票风险如何控制'},
				{id:'1',img:'../static/b.jpg',time:'11小时前',name:'admin',num:'3',title:'dgfdhdyju'},
				{id:'1',img:'../static/b.jpg',time:'12小时前',name:'admin',num:'2',title:'云南城投股吧说说股票风险如何控制云南城投股吧'}
			]
		};
	},
	onLoad() {
		console.log(this.title);
	},
	methods: {
		// 导航详情
		goTo(e){
			console.log(e)
		},
		//
		changeTab(Inv){
			that.navIdx = Inv;
		},
	}
};
</script>

<style>
.index {
	width: 750rppx;
}
.banner{
	width: 690rpx;
	margin: 30rpx;
	background: #007AFF;
	border-radius: 10rpx;
	overflow: hidden;
}
.bannerImg{
	width: 690rpx;

}
.nav{
	width: 690rpx;
	padding: 30rpx;
	/* background: #007AFF; */
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	border-bottom:12rpx solid #f9f9f9;
}
.nav .navList{
	width:116rpx;
	margin-right: 27.99rpx;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	margin-bottom: 38rpx;
}
.nav .navList:nth-child(5n){
	margin-right: 0;
}
.nav .navList text{
	font-size: 28rpx;
	color: #333333;
	font-weight: 600;
	display: block;
}
.nav .navList image{
	width: 50rpx;
	height: 50rpx;
	margin-bottom: 14rpx;
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
	width: 220rpx;
	height: 136rpx;
	border-radius: 10rpx;
}
.content .contentList .item .itemRight{
	width: 440rpx;
	display: flex;
	align-content: space-between;
	flex-wrap: wrap;
}
.content .contentList .item .itemRight .title{
	font-size: 28rpx;
	color: #333333;
	font-weight: 600;
	overflow : hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.content .itemCon{
	width: 440rpx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	/* justify-content: flex-end; */
	
}
.content .itemCon text{
	display: block;
	font-size: 24rpx;
	color: #999999;
}
</style>
