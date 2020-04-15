<template>
	<view class="meVip">
		<view class="head">
			<image :src="imgUrl+vip.user.avatar" mode=""></image>
			<text>{{vip.user.name}}</text>
		</view>
		<view class="content">
		<!-- 	<view class="banner">
				<view class="bannerBox">
					<swiper class="swiper"  next-margin='60rpx' :current="current"  @change="banner">
						<block v-for="(item,index) in vip.data" :key="index">
							<swiper-item>
								<image class="bannerImg" :src="imgUrl+item.title_pic" data-id="item.id"></image>
								<text class="vipTip">{{vip.data[current].level}}</text>
							</swiper-item>
						</block>
					</swiper>
				</view>
			</view> -->
			<view class="bannerI">
				<radio-group @change="getMony">
					<block v-for="(item,index) in vip.data" :key="index">
						<view class="item">
							<radio :value="index" checked="true" v-if="index == 0"/>
							<radio :value="index" v-else/>
							<view class="bannerImg">
								<image :src="imgUrl+item.title_pic" data-id="item.id"></image>
								<text class="vipTip">{{item.level}}</text>
							</view>
						</view>
						
					</block>
				</radio-group>
			</view>
			<view class="list" current='current'>
				<text>会员可享受一以下功能权限</text>
				<view class="listItem">
						<block v-for="(itemL,indexL) in vip.data[0].permission" :key="indexL">
							<view class="item" v-if="itemL.icon != ''">
								<image :src="imgUrl + itemL.icon" mode=""></image>
								<text>{{itemL.name}}</text>
							</view>
						</block>
				</view>
			</view>
			<view class="longVip">
				<!-- <radio-group @change="getMony"> -->
					<!-- <block v-for="(item,index) in vip.data" :key="index"> -->
						<view class="radioList">
							<view class="money">
								￥
								<text>{{vip.data[current].vip_price  || 0}}</text>
								/{{vip.data[current].level}}
							</view>
							<view class="time">
								<text class="long">{{vip.data[current].level}}</text>
								<text>{{vip.data[current].level}}专享受价￥{{vip.data[current].vip_price || 0}}</text>
							</view>
						</view>
					<!-- </block> -->
				<!-- </radio-group> -->
				
				
			</view>

		</view>
		<button type="" class="off" v-if="isCheck == false" @tap="goVip">立即开通，尽享权益</button>
		<button type="" class="off" style="background: #2390DC;" v-else @tap="goVip" :data-id="vip.data[current].id" :data-money="vip.data[current].vip_price">立即开通，尽享权益</button>
		<view class="radio">
			<checkbox-group @change="checkboxChange(isCheck)">
				<label><checkbox value="cb" style="transform: scale(0.6);" :checked="isCheck" /></label>
			</checkbox-group>
			<view>
				我已阅读开通
				vip
				<text @tap="meTreaty">相关协议</text>
			</view>
		</view>
		<text class="tipVip">会员升级请联系客服1071076818</text>
	</view>
</template>

<script>
	const app = getApp()
	import helper from '../common/helper.js';
	export default {
		data() {
			return {
				isCheck: false,
				bannerIndex: '0',
				current: '0',
				vip: [],
				imgUrl: '',
				token: '',
				money: ''
			}
		},
		onLoad() {
			this.token = uni.getStorageSync('token')
			this.vipList()
			this.imgUrl = helper.imgUrl
		},
		onShow() {
			// console.log(app.globalData.vipIndex)
			if(app.globalData.vipIndex == 1){
				this.isCheck = true
			}
		},
		methods: {
			getMony(e){
				console.log(e,'************')
				this.current =e.detail.value
			},
			meTreaty(){
				uni.navigateTo({
					url:'/pages/meTreaty'
				})
			},
			banner(e){
				// this.current = e.detail.current
				// console.log(e)
			},
			checkboxChange(e){
				this.isCheck = !this.isCheck
			},
			vipList(){	
				uni.request({
					url: `${helper.requestUrl}/vips`,
					method: 'GET',
					header: {
						authorization: this.token
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
				if (!this.isCheck) {
					uni.showToast({
						title: '请同意相关协议',
						icon: 'none',
						duration: 2000
					});
				}else{
					uni.navigateTo({
						url:`/pages/payType?id=${e.currentTarget.dataset.id}&money=${e.currentTarget.dataset.money}`
					})
				}
				// let money = this.money
				// if (money != '') {
				// 	// console.log(e)
				// 	uni.navigateTo({
				// 		url:`/pages/payType?id=${e.currentTarget.dataset.id}&money=${money}`
				// 	})
				// } else {
				// 	uni.showToast({
				// 		title: '请选择价格',
				// 		icon: 'none',
				// 		duration: 2000
				// 	});
				// }
				
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
	height: 186rpx;
	background: #2390dc;
	display: flex;
	justify-content: center;
	align-content: flex-start;
	flex-wrap: wrap;
	padding-top: 16rpx;
}
.head image {
	width: 124rpx;
	height: 124rpx;
	border-radius: 124rpx;
	box-shadow: 0rpx 15rpx 38rpx 0rpx rgba(40, 148, 223, 0.6);
}
.radioList{
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 10rpx 0;
}
.radioList radio {
	margin-right: 20rpx;
}
.head text {
	width: 640rpx;
	text-align: center;
	margin-top: 16rpx;
	color: #fff;
	font-size: 30rpx;
	font-weight: 600;
}
.bannerI{
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	position: relative;
}
.bannerI .item{
	display: flex;
	align-items: center;
}
.bannerImg{
	position: relative;
}
.bannerImg text{
	position: absolute;
	top: 180rpx;
	left: 60rpx;
	color: #FFFFFF;
	font-size: 30rpx;
	z-index: 9;
	
}
.bannerI image{
	width: 610rpx;
	height: 360rpx;
	border-radius: 10rpx;
}

/* .banner {
	width: 750rpx;
	margin-top: -60rpx;
	display: flex;
	justify-content: center;
	
} */
.banner .bannerBox {
	width:630rpx;
	height: 360rpx;
	border-radius: 10rpx;
}
.bannerBox swiper, .bannerBox swiper-item {
	height: 360rpx;
}
.banner .bannerBox image{
	width: 610rpx;
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
.listItem image {
	width: 96rpx;
	height: 96rpx;
	border-radius: 96rpx;
	overflow: hidden;
}

.listItem .item > text {
	font-size: 28rpx;
	font-weight: 600;
	color: #333;
	margin-top: 10rpx;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.longVip {
	width: 690rpx;
	padding: 30rpx;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
}
.longVip >view{
	width: 690rpx;
	display: flex;
	margin-bottom: 10rpx;
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
	padding: 30rpx 0 0;
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
.tipVip{
	font-size: 26rpx;
	padding-bottom: 30rpx;
	text-align: center;
}
</style>
