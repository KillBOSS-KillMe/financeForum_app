<template>
	<view class="collection">
		<pageSearch></pageSearch>
		<view class="page-section-spacing banner">
			<swiper class="swiper" indicator-color="rgba(255,255,255,.3)" indicator-active-color="#fff" :autoplay="autoplay" :interval="interval">
				<swiper-item  v-for="(item,index) in bannerList" :key="index">
					<image class="bannerImg" :src="item.img" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
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
		</view>
	</view>
</template>

<script>
	const app = getApp()
	import helper from '../common/helper.js';
	export default {
		data() {
			return {
				autoplay: true,
				interval: 2000,
				bannerList:[
					{id:'1',img:'../static/a.jpg'},
					{id:'2',img:'../static/b.jpg'},
					{id:'12',img:'../static/a.jpg'},
				],
				list:[
					{id:'1',img:'../static/b.jpg',time:'12小时前',name:'admin',num:'3',title:'云南城投股吧说说股票风险如何控制云南城投股吧说说股票风险如何控制云南城投股吧说说股票风险如何控制'},
					{id:'1',img:'../static/b.jpg',time:'11小时前',name:'admin',num:'3',title:'dgfdhdyju'},
					{id:'1',img:'../static/b.jpg',time:'12小时前',name:'admin',num:'2',title:'云南城投股吧说说股票风险如何控制云南城投股吧'}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.collection{
	width: 750rpx;
}
.banner{
	width: 690rpx;
	margin: 20rpx 30rpx;
	border-radius: 10rpx;
	overflow: hidden;
}
.bannerImg{
	width: 690rpx;

}
.collection .contentList{
	width: 690rpx;
	padding: 10rpx 30rpx 30rpx;
}
.collection .contentList .item{
	display: flex;
	justify-content: space-between;
	margin-bottom: 40rpx;
}
.collection .contentList .item image{
	width: 220rpx;
	height: 136rpx;
	border-radius: 10rpx;
}
.collection .contentList .item .itemRight{
	width: 440rpx;
	display: flex;
	align-content: space-between;
	flex-wrap: wrap;
}
.collection .contentList .item .itemRight .title{
	font-size: 28rpx;
	color: #333333;
	font-weight: 600;
	overflow : hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.collection .itemCon{
	width: 440rpx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	/* justify-content: flex-end; */
	
}
.collection .itemCon text{
	display: block;
	font-size: 24rpx;
	color: #999999;
}
</style>
