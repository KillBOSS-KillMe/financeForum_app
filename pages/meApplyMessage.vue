<template>
	<view class="meMessage">
		<block v-for="(item,index) in list" :key="index">
			<view class="item">
				<view>
					<image :src="item.img" mode=""></image>
					<view class="right">
						<text class="title">{{item.title}}</text>
						<text>{{item.content}}</text>
					</view>
					
				</view>
				<!-- <uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon> -->
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
					{id:'1',img:'../static/logo.png',title:'提到我的',content:'出现GV兴奋地和规范化您构成同一家那个号'},
					{id:'2',img:'../static/logo.png',title:'评论'},
					{id:'3',img:'../static/logo.png',title:'系统消息'}
				]
			}
		},
		onLoad() {
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
	margin-right: 20rpx;
}
.right .title{
	font-size: 30rpx;
	font-weight: 700;
	color: #333;
}
.right text{
	font-size: 26rpx;
	font-weight: 400;
	color: #666666;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
