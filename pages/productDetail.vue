<template>
	<view class="productDetail">
		<view class="head">
			<image :src="imgUrl + listInfo.icon" mode="aspectFill"></image>
			<!-- <image :src="imgUrl+listInfo.icon" mode="aspectFill"></image> -->
			<view class="itemRight">
				<view class="productInfo">
					<text>{{listInfo.name}}</text>
					<view>
						<text>申请人数:</text>
						<text class="cur">{{listInfo.apply_sum}}</text>
					</view>
				</view>
				<view class="moneyBox">
					<view class="money">
						额度：
						<text>{{listInfo.quota}}</text>
					</view>
					<view class="money">
						费用：
						<text>{{listInfo.fee_ratio}}</text>
					</view>
				</view>
				<text class="title">{{listInfo.introduction}}</text>
			</view>
		</view>
		<view class="timeInfo">
			<view class="timeInfoItem">
				<text class="top">额度</text>
				<text>{{listInfo.quota}}</text>
			</view>
			<view class="timeInfoItem">
				<text class="top">期限</text>
				<text>{{listInfo.deadline}}</text>
			</view>
			<view class="timeInfoItem">
				<text class="top">费用</text>
				<text>{{listInfo.fee_ratio}}</text>
			</view>
			<view class="timeInfoItem">
				<text class="top">放款速度</text>
				<text>{{listInfo.lending_speed}}</text>
			</view>
			<view class="timeInfoItem">
				<text class="top">审核方式</text>
				<text>{{listInfo.review_method}}</text>
			</view>
			<view class="timeInfoItem">
				<text class="top">到账方式</text>
				<text>{{listInfo.arrival_way}}</text>
			</view>
		</view>
		<view class="channel">
			<view class="channelItem">
				<text>征信要求： </text>
				<text v-if="listInfo.credit_request == 0">无</text>
				<text v-if="listInfo.credit_request == 1">有</text>
			</view>
			<view class="channelItem">
				<text>平台名称： </text>
				<text>{{listInfo.name}}</text>
			</view>
		</view>
		<view class="apply">
			<text>申请攻略</text>
			<view class="applyInfo">
				<text>{{listInfo.raiders}}</text>
				<!-- <text>申请条件:</text> -->
				<!-- <block v-for="(item, index) in list" :key="index"> -->
					<!-- <text>1、年龄在22-40周岁</text>
					<text>2、有本人的名下信用卡和借记卡</text>
					<text>3、本人手机号码需实名认证</text>
					<text>4、暂时不支持新疆和西藏地区的申请</text> -->
				<!-- </block> -->
				<!-- <text>1、年龄在22-40周岁</text>
				<text>2、有本人的名下信用卡和借记卡</text>
				<text>3、本人手机号码需实名认证</text>
				<text>4、暂时不支持新疆和西藏地区的申请</text> -->
			<!-- 	<text>友情提示:</text>
				<text>1、不需要网查征信</text>
				<text>2、审核下款速度快、强烈推荐</text>
				<text>3、授权你手中用的最好的那张信用卡</text>
				<text>4、服务费5-10%、月管理费0.3%</text>
				<text>#有关征信#你我贷不查不上征信</text>
				<text>#有关回访#全程无电话回访</text> -->
			</view>
		</view>
		<view class="productList" v-if="listInfo.identical_holes.length > 0">
			<text>同类产品</text>
			<view class="head" v-for="(item,index) in listInfo.identical_holes" :key="index">
				<!-- <image :src="item.img" mode="aspectFill"></image> -->
				<image :src="imgUrl + item.icon" mode="aspectFill"></image>
				<view class="itemRight">
					<view class="productInfo">
						<text>{{item.name}}</text>
						<view>
							<text>申请人数:</text>
							<text class="cur">{{item.apply_sum}}</text>
						</view>
					</view>
					<view class="moneyBox">
						<view class="money">
							额度：
							<text>{{item.quota}}</text>
						</view>
						<view class="money">
							费用：
							<text>{{item.fee_ratio}}</text>
						</view>
					</view>
					<text class="title">{{item.introduction}}</text>
				</view>
			</view>
		</view>
		<!-- #ifdef APP-PLUS || H5 -->
			<button type=""  hover-class="btn-hover" :data-link="listInfo.link" :data-name="listInfo.name" @tap="APP_PLUS_apply">立即申请</button>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
			<button type=""  hover-class="btn-hover" :data-link="listInfo.link" @tap="MP_WEIXIN_apply">立即申请</button>
		<!-- #endif -->
		<!-- <view v-if="isShow">
			<image class="showModel" @touchmove.stop = "" src="../static/no.png" mode=""></image>
		</view> -->
	</view>
</template>

<script>
	const app = getApp();
	import helper from '../common/helper.js';
	export default {
		data() {
			return {
				productId: '',
				listInfo: [],
				imgUrl:'',
				// isShow: false,
				vip: '',
				 token: ''
			}
		},
		onLoad(e) {
			this.token = uni.getStorageSync('token')
			this.productId = e.id;
			this.imgUrl = helper.imgUrl;
			this.getInfo();
		},
		methods: {
			// 微信小程序除服
			MP_WEIXIN_apply(e) {
				uni.showToast({
					title: '该小程序不支持，请下载APP',
					icon: 'none'
				});
			},
			// APP触发
			APP_PLUS_apply(e) {
				console.log('APP-PLUS')
				let link = e.currentTarget.dataset.link
				let name = e.currentTarget.dataset.name
				if(link == ''){
					uni.showToast({
						title: '该模块正在维修站',
						icon: 'none'
					})
				}
				uni.navigateTo({
					url:`/pages/iframe?name=${name}`
				})
				app.globalData.link = link
			},
			getInfo(){
				uni.request({
					url: `${helper.requestUrl}/holes/detial`,
					method: 'GET',
					header: {
						authorization: this.token
					},
					data:{
						hole_id: this.productId
					},
					success: res => {
						res = helper.null2str(res);
						console.log(res);
						if (res.data.status_code == 200) {
							this.listInfo = res.data.data
						} else if(res.data.status_code == 202) {
							this.vip = res.data.message
							uni.showToast({
								title: res.data.message,
								icon: 'none',
								duration: 2000
							})
							setTimeout(() => {
								uni.redirectTo({
									url: "meVIP"
								})
							}, 2000)
							// this.isShow = true
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'none'
							});
						}
					}
				});
			}
		}
	}
</script>

<style>
.productDetail{
	width: 690rpx;
	padding: 30rpx;
}
.productDetail .head {
	display: flex;
	justify-content: space-between;
	margin-bottom: 40rpx;
}
.productDetail .head image {
	width: 130rpx;
	height: 130rpx;
	border-radius: 10rpx;
}
.productDetail .head .itemRight {
	width: 530rpx;
	display: flex;
	align-content: space-between;
	flex-wrap: wrap;
}
.productDetail .head .itemRight .productInfo {
	width: 530rpx;
	display: flex;
	justify-content: space-between;
}
.productDetail .head .itemRight .productInfo > text {
	font-size: 28rpx;
	color: #333333;
	font-weight: 600;
	overflow : hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	width: 310rpx;
}
.productDetail .head .itemRight .productInfo > view {
	display: flex;
	align-content: flex-start;
	align-items: flex-start;
}
.productDetail .head .itemRight .productInfo > view text {
	font-size: 28rpx;
	color: #999;
}
.productDetail .head .itemRight .productInfo > view .cur {
	color: #f69522;
	margin-left: 6rpx;
}
.productDetail .head .itemRight .title {
	font-size: 28rpx;
	color: #999;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}
.moneyBox {
	width: 530rpx;
	display: flex;
}
.money {
	display: flex;
	font-size: 26rpx;
	color: #999;
	margin-right: 20rpx;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.money > text {
	color: #f69522;
	font-weight: 600;
	margin-left: 10rpx;
}
.timeInfo{
	width: 690rpx;
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	flex-direction: row;
	
}
.timeInfo .timeInfoItem{
	width: 210rpx;
	margin-right: 20rpx;
	margin-bottom: 16rpx;
}
.timeInfo .timeInfoItem:nth-child(3n){
	margin-right: 0;
}
.timeInfo .timeInfoItem text{
	font-size: 28rpx;
	font-weight: 700;
	color: #F69522;
	text-align: center;
}
.timeInfo .timeInfoItem .top{
	font-size: 32rpx;
	font-weight: 400;
	color: #333;
	margin-bottom: 6rpx;
}
.channel{
	margin: 20rpx 0 0;
}
.channel .channelItem{
	display: flex;
}
.channel .channelItem text{
	font-size: 28rpx;
	color: #333;
	margin-bottom: 20rpx;
}
.channel .channelItem text:first-child{
	white-space:nowrap
}
.apply>text{
	font-size: 32rpx;
	font-weight: 700;
	color: #333;
	border-bottom: 1rpx solid #d2d2d2;
	padding: 20rpx 0;
}
.apply .applyInfo{
	margin: 20rpx 0;
}
.apply .applyInfo text{
	font-size: 28rpx;
	color: #000;
	margin-top: 10rpx;
}
.productList>text{
	opacity: 0.8;
	font-size: 32rpx;
	font-weight: 700;
	color: #333;
	margin: 40rpx 0 30rpx;
}
.productList .head{
	border-top: 1rpx solid #bfbfbf4d;
	padding-top: 30rpx;
}
button{
	background: #2390DC;
	color: #fff;
	font-size: 32rpx;
	font-weight: 600;
	margin-top: 30rpx;
	
}
.showModel{
	width: 750rpx;
	height: 100vh;
	position: absolute;
	z-index: 8;
	top: 0;
	left: 0;
}
</style>
