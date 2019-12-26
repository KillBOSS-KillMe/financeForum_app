<template>
	<view class="meMessage">
		<block v-for="(item,index) in list" :key="index">
			<view class="item">
				<view>
					<image :src="item.img" mode=""></image>
					<text>{{item.title}}</text>
				</view>
				<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
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
					{id:'1',img:'../static/logo.png',title:'提到我的'},
					{id:'2',img:'../static/logo.png',title:'评论'},
					{id:'3',img:'../static/logo.png',title:'系统消息'}
				]
			}
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
	border: 1rpx solid #F8F8F8;
	border-radius: 10rpx;
	padding: 30rpx;
	margin-top: 20rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.meMessage .item>view{
	display: flex;
	align-items: center;
}
.meMessage .item>view>text{
	color: #333333;
	font-size: 34rpx;
	font-weight: 600;
	margin-left: 20rpx;
}
.meMessage .item image{
	width: 96rpx;
	height: 96rpx;
	border-radius: 96rpx;
}
</style>
