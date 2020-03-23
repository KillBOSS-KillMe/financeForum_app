<template>
	<view class="message">
		<text class="title">系统消息</text>
		<jyf-parser :html="news.content" ref="article" class="font"></jyf-parser>
		<text class="button" @tap="link" v-if="news.type == 'QR'">点击立即输入账号密码获取二维码</text>
	</view>
</template>

<script>
	import helper from '../common/helper.js';
	import parser from "@/components/jyf-parser";
	export default {
		data() {
			return {
				news:{}
			}
		},
		components: {
			"jyf-parser": parser
		},
		onLoad(options) {
			console.log(options)
			this.news = JSON.parse(options.obj)
		},
		methods: {
			link(){
				// console.log('***********')
				uni.navigateTo({
					url:'/pages/promptlyGetQr'
				})
			},
		}
	}
</script>

<style>
	.message{
		width: 690rpx;
		padding: 30rpx;
	}
	.title{
		font-weight: 600;
		font-size: 30rpx;
		color: #000000;
	}
	.font{
		font-size: 26rpx;
		color: #000000;

	}
.button{
	font-size: 20rpx;
	font-weight: 500;
	color: #2390DC;
	margin-top: 13rpx;
}
</style>
