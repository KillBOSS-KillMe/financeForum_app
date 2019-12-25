<template>
	<view class="meVip">
		<view class="head">
			<image src="../static/logo.png" mode=""></image>
			<text>黎明</text>
		</view>
		<view class="content">
			<view class="banner">
				<view class="bannerBox">
					
				</view>
				<!-- <swiper class="swiper">
					<swiper-item  v-for="(item,index) in bannerList" :key="index">
						<image class="bannerImg" :src="item.img" mode="aspectFill" @tap="goBanner" data-id="item.id"></image>
					</swiper-item>
				</swiper> -->
			</view>
			<view class="list">
				<text>永久会员可享受一下功能权限</text>
				<view class="listItem">
					<view class="item">
						<image src="../static/logo.png" mode=""></image>
						<text>精准匹配</text>
					</view>
					<view class="item">
						<image src="../static/logo.png" mode=""></image>
						<text>精准匹配</text>
					</view>
					<view class="item">
						<image src="../static/logo.png" mode=""></image>
						<text>精准匹配</text>
					</view>
					<view class="item">
						<image src="../static/logo.png" mode=""></image>
						<text>精准匹配</text>
					</view>
					<view class="item">
						<image src="../static/logo.png" mode=""></image>
						<text>精准匹配</text>
					</view>
				</view>
			</view>
			<view class="longVip">
				<view class="money">￥<text>1289</text>/年</view>
				<view class="time">
					<text class="long">永久会员超价值</text>
					<text>永久会员专享受价￥1289</text>
				</view>
			</view>
		</view>
		<button type="primary" class="off">立即开通，尽享权益</button>
		<view class="radio">
			<label class="radio">
				<radio value="" /><view>我以阅读开通普通会员vip</view>
			</label>
		</view>
		<!-- <image src="../static/mevip.png" mode=""></image> -->
		<!-- <block v-for="(item,index) in list" :key="index">
			<view class="item" @tap="goNext(item.id)">
				<view>
					<image :src="item.img" mode=""></image>
					<text>{{item.title}}</text>
				</view>
				<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
			</view>
		</block> -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bannerList:[
					{id:'1',img:'../static/a.jpg'},
					{id:'2',img:'../static/b.jpg'},
					{id:'12',img:'../static/a.jpg'},
				],
				// list:[
				// 	{id:'1',img:'../static/logo.png',title:'联系客服微信 bn154896547'},
				// 	{id:'2',img:'../static/logo.png',title:'联系客服电话 18535464004 '}
				// ]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.meVip{
	width: 750rpx;
}
.head{
	width: 750rpx;
	height: 260rpx;
	background: #2390DC;
	display: flex;
	justify-content: center;
	align-content: flex-start;
	flex-wrap: wrap;
	padding-top: 30rpx;
}
.head image{
	width: 124rpx;
	height: 124rpx;
	border-radius: 124rpx;
	box-shadow: 0rpx 15rpx 38rpx 0rpx rgba(40,148,223,0.6);
}
.head text{
	width: 640rpx;
	text-align: center;
	margin-top: 16rpx;
	color: #fff;
	font-size: 30rpx;
	font-weight: 600;
}

.banner{
	width: 750rpx;
	height: 330rpx;
	margin-top: -50rpx;
	display: flex;
	justify-content: center;
}
.banner .bannerBox{
	width: 570rpx;
	height: 330rpx;
	background: #18CF7F;
}
.list{
	width: 690rpx;
	padding: 30rpx;
}
.list>text{
	font-size: 28rpx;
	font-weight: 700;
	color: #333;
	border-bottom: 1rpx solid #e8e8e8;
	padding: 20rpx 0;
	display: flex;
	align-items: center;
}
.list>text:before{
	content: "";
	display: inline-block;
	width: 12rpx;
	height: 30rpx;
	background: #2390DC;
	border-radius: 10rpx;
	margin-right: 20rpx;
}
.listItem{
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
}
.listItem .item{
	width: 156rpx;
	margin-right: 20rpx;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	margin-top: 40rpx;
}
.listItem .item:nth-child(4n){
	margin-right: 0;
}
.listItem .item>image{
	width: 96rpx;
	height: 96rpx;
	border-radius: 96rpx;
}
.listItem .item>text{
	font-size: 28rpx;
	font-weight: 600;
	color: #333;
	margin-top: 10rpx;
}
.longVip{
	width: 690rpx;
	padding: 30rpx;
	display: flex;
	justify-content: center;
}
.money{
	display: flex;
	align-items: flex-end;
	font-size: 22rpx;
	font-weight: 700;
	color: #CEB277;
}
.money text{
	font-size: 36rpx;
}
.time{
	display: flex;
	width: 300rpx;
	flex-wrap: wrap;
	margin-left: 20rpx;
}
.time text{
	font-size: 24rpx;
	font-weight: 700;
	color: #B8B8B8;
}
.time .long{
	width: 202rpx;
	height: 44rpx;
	background: #CEB277;
	line-height: 44rpx;
	text-align: center;
	color: #fff;
	border-radius: 10rpx;
	margin-bottom: 10rpx;
}
.off{
	width: 630rpx;
	height: 80rpx;
	line-height: 80rpx;
	/* opacity: 0.5; */
	background: rgba(35,144,220,0.5);
	box-shadow: 0rpx 10rpx 45rpx 0rpx rgba(35,144,220,0.6);
	border: none;
	font-size: 30rpx;
	font-weight: 700;
	margin-top: 60rpx;
}
.radio{
	width: 690rpx;
	padding:30rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.radio text{
	font-size: 24rpx;
	font-weight: 700;
	color: #B8B8B8;
}
/* .radio uni-radio{
	width: 26rpx;
	height: 26rpx;
} */
</style>
