<template>
	<view class="message">
		<view class="bg"></view>
		<view class="list">
			<block v-for="(item,index) in list" :key="index">
				<view class="item">
					<view class="head">
						<image src="../static/user.png" mode=""></image>
						<text>系统通知</text>
					</view>
					<rich-text :nodes="item.content" class="font"></rich-text>
					<text v-if="item.type == ' system_tips'" class="button" @tap="link">点击立即输入账号密码获取二维码</text>
					<!-- <view class="font">{{item.content}}</view> -->
					<!-- <view>
						<text class="font">您提交的二维码申请已通过，请输入以下账号及密码获取推广二维码</text>
						<view class="content">
							<text>账号：</text><text>{{item.number}}</text>
						</view>
						<view class="content">
							<text>密码：</text><text>{{item.password}}</text>
						</view>
						
					</view> -->
				</view>
			</block>
			<view class="null" v-if="list.length == 0">
				暂无数据
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
				list:[
					// {id:'1',img:'../static/card0.png',type:'系统通知',number:'1xzj',password:'123456'},
					// {id:'1',img:'../static/card0.png',type:'系统通知',number:'1xzj',password:'123456'}
				]
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList(){
				uni.request({
					url: `${helper.requestUrl}/user/news-list`,
					method: 'GET',
					header: {
						authorization: app.globalData.token
					},
					success: res => {
						// uni.hideLoading();
						res = helper.null2str(res);
						console.log(res,'++++');
						if (res.data.status_code == 200) {
							this.list = res.data.data
						} else {
							// uni.showToast({
							// 	title: res.data.tip_msg,
							// 	icon: 'none'
							// });
						}
					}
				});
			},
			link(){
				console.log('***********')
				uni.navigateTo({
					url:'/pages/promptlyGetQr'
				})
			},
			// onReachBottom(){
			// 	this.page ++;
			// 	this.getList()()
			// }
		}
	}
</script>

<style>
.message{
	width: 750rpx;
}
.bg{
	width: 690rpx;
	padding: 30rpx;
	height: 30rpx;
	background: #2390DC;
}
.list{
	width: 690rpx;
	margin: 0 auto;
	margin-top: -60rpx;
}
.list .item{
	width: 642rpx;
	background: #ffffff;
	box-shadow: 0rpx 10rpx 35rpx 0rpx rgba(228,228,228,0.4); 
	border-radius: 10rpx;
	padding: 24rpx;
	margin-bottom: 30rpx;
}
.list .item .head{
	display: flex;
	align-items: center;
	margin-bottom: 16rpx;
}
.list .item .head image{
	width: 44rpx;
	height: 44rpx;
	border-radius: 44rpx;
	margin-right: 16rpx;
}
.list .item .head text{
	font-size: 24rpx;
	font-weight: 700;
	color: #666666;
}
.list .item .font{
	font-size: 20rpx;
	font-weight: 500;
	color: #666666;
}
.list .item .content{
	display: flex;
	margin-top: 8rpx;
}
.list .item .content text{
	font-size: 20rpx;
	font-weight: 500;
	color: #666666;
}
.list .item .button{
	font-size: 20rpx;
	font-weight: 500;
	color: #2390DC;
	margin-top: 13rpx;
}
</style>
