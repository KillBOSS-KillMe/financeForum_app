<template>
	<view class="meVip">
		<view class="head">
			<image :src="imgUrl+vip.user.avatar" mode=""></image>
			<text>{{vip.user.name}}</text>
		</view>
		<view class="content">
			<view class="banner">
				<view class="bannerBox">
					<swiper class="swiper"  next-margin='50rpx' :current="current"  @change="banner">
						<block v-for="(item,index) in vip.data" :key="index">
							<swiper-item>
								<image class="bannerImg" :src="imgUrl+item.title_pic" @tap="goBanner" data-id="item.id"></image>
							</swiper-item>
						</block>
					</swiper>
				</view>
			</view>
			<view class="list">
				<text>会员可享受一以下功能权限</text>
				<view class="listItem" v-if="bannerIndex == '1'">
					<block v-for="(item,index) in list" :key="index">
						<view class="item">
							<view class="icon blue"><uni-icon type="" class="iconfont" :class="item.img"></uni-icon></view>
							<text>{{item.title}}</text>
						</view>
					</block>
				</view>
				<view class="listItem" v-if="bannerIndex == '0'">
					<block v-for="(item,index) in list" :key="index">
						<view class="item"  v-if="item.icon == '1'">
							<view class="icon" :class="['blue', item.icon == bannerIndex ? 'cur' : '']"><uni-icon type="" class="iconfont" :class="item.img"></uni-icon></view>
							<text>{{item.title}}</text>
						</view>
					</block>
				</view>
			</view>
			<view class="longVip"  v-if="bannerIndex == '0'">
				<view class="money">
					￥
					<text>{{vip.data[0].vip_price}}</text>
					/年
				</view>
				<view class="time">
					<text class="long">普通会员超价值</text>
					<text>普通会员专享受价￥{{vip.data[0].vip_price}}</text>
				</view>
			</view>
			<view class="longVip"  v-if="bannerIndex == '1'">
				<view class="money">
					￥
					<text>{{vip.data[1].vip_price}}</text>
					/年
				</view>
				<view class="time">
					<text class="long">永久会员超价值</text>
					<text>永久会员专享受价￥{{vip[1].data.vip_price}}</text>
				</view>
			</view>
		</view>
		<button type="" class="off" v-if="isCheck == false" @tap="goVip">立即开通，尽享权益</button>
		<button type="" class="off" style="background: #2390DC;" v-else @tap="goVip" :data-id="vip.data[bannerIndex].id" :data-money="vip.data[bannerIndex].vip_price">立即开通，尽享权益</button>
		<view class="radio">
			<label><checkbox value="cb" style="transform: scale(0.6);" @tap="checkboxChange(isCheck)" :checked="isCheck" /></label>
			<view>
				我以阅读开通普通会员vip
				<text @tap="meTreaty">相关协议</text>
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
				bannerList:[
					{id:'1',img:'../static/a.jpg'},
					{id:'2',img:'../static/b.jpg'}
				],
				isCheck: false,
				bannerIndex: '0',
				current: '0',
				list:[
					{id:'1',img:'iconchanpin_yonghuzhifu',title:'产品超市',icon:'1'},
					{id:'2',img:'iconqian_',title:'信贷技术',icon:'1'},
					{id:'3',img:'iconweixin1',title:'最新资讯',icon:'1'},
					{id:'4',img:'iconqiyegongchangjianzhu',title:'小微企业',icon:'0'},
					{id:'5',img:'iconqunfengjingzhunyinliu',title:'精准匹配',icon:'0'},
					{id:'6',img:'iconxiepinglun',title:'实站心得',icon:'0'},
					{id:'7',img:'iconliebiao',title:'拒贷汇总',icon:'0'},
					{id:'8',img:'iconhongbaoguanli',title:'备用金打造',icon:'0'},
				],
				vip: [],
				imgUrl: ''
			}
		},
		onLoad() {
			this.vipList()
			this.imgUrl = helper.imgUrl
		},
		onShow() {
			console.log(app.globalData.vipIndex)
			if(app.globalData.vipIndex == 1){
				this.isCheck = true
			}
		},
		methods: {
			meTreaty(){
				uni.navigateTo({
					url:'/pages/meTreaty'
				})
			},
			banner(e){
				this.bannerIndex = e.detail.current
				console.log(e)
			},
			checkboxChange(e){
				this.isCheck = !this.isCheck
			},
			vipList(){
				
				uni.request({
					url: `${helper.requestUrl}/vips`,
					method: 'GET',
					header: {
						authorization: app.globalData.token
					},
					success: res => {
						uni.hideLoading();
						res = helper.null2str(res)
						console.log(res)
						if (res.data.status_code == 200) {
							this.vip = res.data
						} else {
							uni.showToast({
								title: res.data.message
							});
						}
				
					}
				})
			},
			goVip(e){
				console.log(this.isCheck)
				if (this.isCheck) {
					console.log(e)
					uni.navigateTo({
						url:`/pages/payType?id=${e.currentTarget.dataset.id}&money=${e.currentTarget.dataset.money}`
					})
				} else {
					uni.showToast({
						title: '请同意相关协议',
						icon: 'none',
						duration: 2000
					});
				}
				
			}
		}
	}
</script>

<style>
.meVip {
	width: 750rpx;
}
.head {
	width: 750rpx;
	height: 260rpx;
	background: #2390dc;
	display: flex;
	justify-content: center;
	align-content: flex-start;
	flex-wrap: wrap;
	padding-top: 30rpx;
}
.head image {
	width: 124rpx;
	height: 124rpx;
	border-radius: 124rpx;
	box-shadow: 0rpx 15rpx 38rpx 0rpx rgba(40, 148, 223, 0.6);
}
.head text {
	width: 640rpx;
	text-align: center;
	margin-top: 16rpx;
	color: #fff;
	font-size: 30rpx;
	font-weight: 600;
}
uni-swiper{
	height: 400rpx;
}
.banner {
	width: 750rpx;
	/* height: auto; */
	margin-top: -60rpx;
	display: flex;
	justify-content: center;
	
}
.banner .bannerBox {
	width:630rpx;
	height: 360rpx;
	border-radius: 10rpx;
}
.bannerBox swiper, .bannerBox swiper-item {
	height: 360rpx;
}
.banner .bannerBox image{
	/* width: 100%;
	height: 100%; */
	width: 630rpx;
	height: 360rpx;
	border-radius: 10rpx;
}
.list {
	width: 690rpx;
	padding: 30rpx;
}
.list > text {
	font-size: 28rpx;
	font-weight: 700;
	color: #333;
	border-bottom: 1rpx solid #e8e8e8;
	padding: 20rpx 0;
	display: flex;
	align-items: center;
}
.list > text:before {
	content: '';
	display: inline-block;
	width: 12rpx;
	height: 30rpx;
	background: #2390dc;
	border-radius: 10rpx;
	margin-right: 20rpx;
}
.listItem {
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
}
.listItem .item {
	width: 156rpx;
	margin-right: 20rpx;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	margin-top: 40rpx;
}
.listItem .item:nth-child(4n) {
	margin-right: 0;
}
.listItem .item .icon {
	width: 96rpx;
	height: 96rpx;
	border-radius: 96rpx;
	display: flex;
	justify-content: center;
	align-content: center;
	align-items: center;
}
.blue{
	border: 1rpx solid #2390DC;
}
.listItem .item .iconfont{
	font-size: 44rpx;
}
.listItem .item .iconfont{
	color: #2390DC;
}
/* .cur{
		border: 1rpx solid #D6D6D6;
		color: #D6D6D6;
} */
.listItem .item > text {
	font-size: 28rpx;
	font-weight: 600;
	color: #333;
	margin-top: 10rpx;
}
.longVip {
	width: 690rpx;
	padding: 30rpx;
	display: flex;
	justify-content: center;
}
.money {
	display: flex;
	align-items: flex-end;
	font-size: 22rpx;
	font-weight: 700;
	color: #ceb277;
}
.money text {
	font-size: 36rpx;
}
.time {
	display: flex;
	width: 300rpx;
	flex-wrap: wrap;
	margin-left: 20rpx;
}
.time text {
	font-size: 24rpx;
	font-weight: 700;
	color: #b8b8b8;
	white-space: nowrap;
}
.time .long {
	width: 202rpx;
	height: 44rpx;
	background: #ceb277;
	line-height: 44rpx;
	text-align: center;
	color: #fff;
	border-radius: 10rpx;
	margin-bottom: 10rpx;
}
.off {
	width: 630rpx;
	height: 80rpx;
	line-height: 80rpx;
	/* opacity: 0.5; */
	background: rgba(35, 144, 220, 0.5);
	box-shadow: 0rpx 10rpx 45rpx 0rpx rgba(35, 144, 220, 0.6);
	border: none;
	font-size: 30rpx;
	font-weight: 700;
	margin-top: 60rpx;
	color: #fff;
}
.radio {
	width: 690rpx;
	padding: 30rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.radio view {
	display: flex;
	font-size: 24rpx;
	font-weight: 700;
	color: #b8b8b8;
}
.radio view text {
	color: #2390dc;
}
/* .radio uni-radio{
	width: 26rpx;
	height: 26rpx;
} */

</style>
