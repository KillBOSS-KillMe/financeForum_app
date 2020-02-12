<template>
	<view class="message">
		<view class="bg"></view>
		<view class="list">
			<block v-for="(item,index) in list" :key="index">
				<view class="item">
					<view class="head">
						<image :src="item.img" mode=""></image>
						<text>{{item.type}}</text>
					</view>
					<text class="font">您提交的二维码申请已通过，请输入以下账号及密码获取推广二维码</text>
					<view class="content">
						<text>账号：</text><text>{{item.number}}</text>
					</view>
					<view class="content">
						<text>密码：</text><text>{{item.password}}</text>
					</view>
					<text class="button" @tap="link">点击立即输入账号密码获取二维码</text>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{id:'1',img:'../static/card0.png',type:'系统通知',number:'1xzj',password:'123456'},
					{id:'1',img:'../static/card0.png',type:'系统通知',number:'1xzj',password:'123456'}
				]
			}
		},
		methods: {
			link(){
				console.log('***********')
				uni.navigateTo({
					url:'/pages/promptlyGetQr'
				})
			}
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
