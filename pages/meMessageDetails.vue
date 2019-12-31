<template>
	<view class="meMessage">
		<block v-for="(item,index) in list" :key="index">
			<view class="item">
				<image :src="item.img" mode=""></image>
				<view class="info">
					<text class="title">{{item.title}}</text>
					<text class="con">{{item.con}}</text>
				</view>
			</view>
		</block>
		
	</view>
</template>

<script>
	const app = getApp()
	import helper from '../common/helper.js';
	export default {
		data() {
			return {
				list:[
					{id:'1',img:'../static/logo.png',title:'消息标题消息标题', con: '消息内容消息内容消息内容消息内容消息内容消息内容'},
					{id:'2',img:'../static/logo.png',title:'消息标题消息标题', con: '消息内容消息内容消息内容消息内容消息内容消息内容'},
					{id:'3',img:'../static/logo.png',title:'消息标题消息标题', con: '消息内容消息内容消息内容消息内容消息内容消息内容'}
				]
			}
		},
		onLoad(options) {
			console.log(options)
			uni.setNavigationBarTitle({
				title: options.title
			})
		},
		methods: {
			
		}
	}
</script>

<style>
.meMessage{
	width: 690rpx;
	padding: 0 30rpx;
}
.meMessage .item{
	width: 690rpx;
	height: auto;
	border: 1rpx solid #F8F8F8;
	border-radius: 10rpx;
	padding: 30rpx 0;
	margin-top: 20rpx;
	display: flex;
	/* align-items: center; */
	justify-content: space-between;
	
}
.meMessage .item image{
	width: 96rpx;
	height: 96rpx;
	border-radius: 96rpx;
}
.meMessage .item .info{
	width: 580rpx;
	height: auto;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	flex-direction: column;
}
.meMessage .info .title{
	color: #333333;
	font-size: 34rpx;
	font-weight: 600;
}
.meMessage .info .con{
	color: #ddd;
	font-size: 25rpx;
	margin-top: 20rpx;
}

</style>
