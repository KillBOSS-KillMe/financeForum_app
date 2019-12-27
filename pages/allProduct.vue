<template>
	<view class="content">
		<view class="screen">
			<view class="left" @tap="getTap(1)">
				<text>所有额度</text>
				<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
			</view>
			<view class="right" @tap="getTap(2)">
				<text>所有贷款分类</text>
				<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
			</view>
		</view>
		<view class="contentList">
			<!-- <block  v-for="(item, index) in list" :key="index">   :data-id="item.id"-->
			<view class="item" @tap="goProduct">
				<!-- <image :src="imgUrl + item.icon" mode="aspectFill"></image> -->
				<image src="../static/a.jpg" mode=""></image>
				<view class="itemRight">
					<view class="productInfo">
						<!-- {{ item.name }} {{ item.apply_sum }} {{ item.quota }} {{ item.fee_ratio }} {{ item.introduction }}-->
						<text>9999</text>
						<view>
							<text>申请人数:</text>
							<text class="cur">999</text>
						</view>
					</view>
					<view class="moneyBox">
						<view class="money">
							额度：
							<text>99</text>
						</view>
						<view class="money">
							费用：
							<text>99</text>
						</view>
					</view>
					<text class="title">66</text>
				</view>
			</view>
			<!-- </block> -->
		</view>
		<view class="modelShow"></view>
		<view class="modelShowText">
			<text>所有额度</text>
		</view>
	</view>
</template>

<script>
const app = getApp();
import helper from '../common/helper.js';
export default {
	data() {
		return {
			imgUrl: '',
			list: []
		};
	},
	onLoad() {
		this.imgUrl = helper.imgUrl;
		// this.getList()
	},
	methods: {
		getTap(e){
			console.log(e)
		},
		//获取列表数据
		getList() {
			uni.request({
				url: `${helper.requestUrl}/holes/categories-holes`,
				method: 'GET',
				// header: {
				// 	authorization: app.globalData.token
				// },
				data: {
					category_id: this.category_id,
					page_size: this.page_size,
					page: this.page
				},
				success: res => {
					res = helper.null2str(res);
					console.log(res);
					if (res.data.status_code == 200) {
						this.list = this.list.concat(res.data.data);
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
};
</script>

<style>
.content {
	width: 690rpx;
	padding: 30rpx;
	position: relative;
}
.content .screen{
	width: 690rpx;
	padding: 30rpx;
	display: flex;
	justify-content: space-between;
	position: absolute;
	/* height: 100rpx; */
	top: 0rpx;
	left: 0;
	background: #fff;
	z-index: 9;
}
.content .screen view{
	width: 345rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #2390DC;
	font-size: 30rpx;
	font-weight: 600;
}
.content .screen view icon{
	font-size: 28rpx;
	margin-left: 6rpx;
}
.content .screen .left{
	border-right: 1rpx solid #E8E8E8;
}
.content .contentList{
	margin-top: 100rpx;
}
.content .contentList .item {
	display: flex;
	justify-content: space-between;
	padding-bottom: 40rpx;
	border-bottom: 1rpx solid #E8E8E8;
}
.content .contentList .item image {
	width: 130rpx;
	height: 130rpx;
	border-radius: 10rpx;
}
.content .contentList .item .itemRight {
	width: 530rpx;
	display: flex;
	align-content: space-between;
	flex-wrap: wrap;
}
.content .contentList .item .itemRight .productInfo {
	width: 530rpx;
	display: flex;
	justify-content: space-between;
}
.content .contentList .item .itemRight .productInfo > text {
	font-size: 32rpx;
	color: #333333;
	font-weight: 600;
}
.content .contentList .item .itemRight .productInfo > view {
	display: flex;
	align-content: center;
	align-items: center;
}
.content .contentList .item .itemRight .productInfo > view text {
	font-size: 28rpx;
	color: #999;
}
.content .contentList .item .itemRight .productInfo > view .cur {
	color: #f69522;
	margin-left: 6rpx;
}
.content .contentList .item .itemRight .title {
	font-size: 28rpx;
	color: #999;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}
.content .moneyBox {
	width: 530rpx;
	display: flex;
}
.content .money {
	display: flex;
	font-size: 28rpx;
	color: #999;
	margin-right: 20rpx;
}
.content .money > text {
	color: #f69522;
	font-weight: 600;
	margin-left: 10rpx;
}
/* 模态框 */
.modelShow{
	width: 750rpx;
	height: 100vh;
	background: #000000;
	opacity: 0.3;
	position: fixed;
	top: 0;
	left: 0;
	overflow: hidden;
	z-index: 8;
}
.modelShowText{
	width: 690rpx;
	position: fixed;
	top: 180rpx;
	left: 0;
	overflow: hidden;
	z-index: 8;
	background: #fff;
	padding: 30rpx;
}
.modelShowText text{
	width: 186rpx;
	height: 56rpx;
	background: #eee;
	font-size: 28rpx;
	color: #0A0000;
	font-weight: 600;
	line-height: 56rpx;
	text-align: center;
}
</style>
