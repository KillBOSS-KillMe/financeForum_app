<template>
	<view class="apply">
		<pageSearch></pageSearch>
		<view class="collection">
			<text class="title">干货汇总</text>
			<view class="collectionList">
				<block  v-for="(item,index) in collectionList" :key="index">
					<view class="item">
						<image class="img" :src="item.img" mode=""></image>
						<text>{{item.title}}</text>
					</view>
				</block>
			</view>
		</view>
		<view class="line"></view>
		<view class="collection">
			<text class="title">信用卡工具</text>
			<view class="collectionList">
				<block  v-for="(item,index) in collectionList" :key="index">
					<view class="item">
						<image class="img" :src="item.img" mode=""></image>
						<text>{{item.title}}</text>
					</view>
				</block>
			</view>
		</view>
		<view class="line"></view>
		<view class="collection">
			<text class="title">微金工具</text>
			<view class="collectionList">
				<block  v-for="(item,index) in collectionList" :key="index">
					<view class="item">
						<image class="img" :src="item.img" mode=""></image>
						<text>{{item.title}}</text>
					</view>
				</block>
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
				collectionList:[
					{id:'1',title:'123',img:'../static/a.jpg'},
					{id:'1',title:'123',img:'../static/a.jpg'},
					{id:'1',title:'123',img:'../static/a.jpg'},
					{id:'1',title:'123',img:'../static/a.jpg'},
					{id:'1',title:'123',img:'../static/a.jpg'},
					{id:'1',title:'1征信查询23',img:'../static/a.jpg'},
					{id:'1',title:'征信查询',img:'../static/a.jpg'},
					{id:'1',title:'征信查询',img:'../static/a.jpg'},
					{id:'1',title:'征信查询',img:'../static/a.jpg'},
					{id:'1',title:'征信查询',img:'../static/a.jpg'}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.apply{
	width: 750rpx;
}
.collection{
	width: 690rpx;
	padding: 30rpx 30rpx 0;
}
.collection .title{
	color: #333333;
	font-size: 32rpx;
	font-weight: 600;
}
.collectionList{
	margin: 30rpx 0;
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
}
.collectionList .item{
	/* margin-right: ; */
	width: 131rpx;
	margin:0 8rpx 30rpx 0;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
}
.collectionList .item:nth-child(5n){
	margin-right: 0;
}
.collectionList .item image{
	width: 96rpx;
	height: 96rpx;
	border-radius: 50rpx;
	display: block;
}
.collectionList .item text{
	display: block;
	font-size: 28rpx;
	color: #333333;
	font-weight: 600;
	margin-top: 16rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.line{
	width: 750rpx;
	background: #F9F9F9;
	height: 6rpx;
}
</style>
