<template>
	<view class="exchang">
		<pageSearch></pageSearch>
		<view class="nav">
			<block v-for="(item,index) in navList" :key="index">
				<view class="item">
					<image :src="item.img" mode=""></image>
					<text>{{item.title}}</text>
				</view>
			</block>
		</view>
		<view class="line"></view>
		<view class="content">
			 <view class="inv-h-w">
				<view :class="['inv-h',Inv==0?'inv-h-se':'']" @tap="Inv=0">贷款产品交流</view>
				<view :class="['inv-h',Inv==1?'inv-h-se':'']" @tap="Inv=1">信用卡交流</view>
				<view :class="['inv-h',Inv==2?'inv-h-se':'']" @tap="Inv=2">推荐热帖</view>
			</view>
			<view class="contentList">
				<view class="item" v-for="(item,index) in list" :key="index">
					<image :src="item.img" mode="aspectFill"></image>
					<view class="itemRight">
						<view class="itemRightHead">
							<text>123</text>
							<view>
								来自
								<text>贷款产品交流</text>
							</view>
						</view>
						<text class="title">{{item.title}}</text>
						<text class="itemContent">贷款产品交流贷款产品交流贷款产品交流贷款产品交流贷款产品交流贷款产品交流贷款产品交流贷款产品交流贷款产品交流</text>
						<block v-for="(item1,index) in item.imgList" :key="index">
							<image class="imgList" :src="item1.img1" mode=""></image>
						</block>
						<view class="itemCon">
							<text>{{item.time}}</text>
							<view class="itemBottom">
								<view>
									<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
									<text>{{item.name}}</text>
								</view>
								<view>
									<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
									<text>{{item.num}}评</text>
								</view>
							</view>
						</view>
					</view>
				</view>
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
				navList:[
					{img:'../static/logo.png',title:'实战心得'},
					{img:'../static/logo.png',title:'拒贷汇总'},
					{img:'../static/logo.png',title:'微金公告'},
					{img:'../static/logo.png',title:'从业感悟'},
					{img:'../static/logo.png',title:'论坛搜索'}
				],
				Inv:0,
				list:[
					{id:'1',img:'../static/b.jpg',time:'12小时前',name:'admin',num:'3',title:'云南城投股吧说说股票风险如何控制云南城投股吧说说股票风险如何控制云南城投股吧说说股票风险如何控制',
						imgList:[
							{img1:'../static/logo.png'},
							{img1:'../static/logo.png'},
							{img1:'../static/logo.png'}
						]
					},
					{id:'1',img:'../static/b.jpg',time:'11小时前',name:'admin',num:'3',title:'dgfdhdyju'},
					{id:'1',img:'../static/b.jpg',time:'12小时前',name:'admin',num:'2',title:'云南城投股吧说说股票风险如何控制云南城投股吧'}
			  ]
			}
		},
		onLoad() {
			// 加载微金交流首页数据
			this.getIndexData()
		},
		methods: {
			getIndexData() {
				uni.showLoading({
				  title: '加载中...',
					duration: 1000000
				});
				uni.request({
					url: `${helper.requestUrl}/forum/index`,
					method: 'GET',
					header: {
						authorization: app.globalData.token
					},
					success: res => {
						uni.hideLoading();
						res = helper.null2str(res)
						console.log(res);
						if (res.data.status_code == '200') {
							this.pageData = res.data.data
						} else {
							uni.showToast({
								title: res.data.message,
								icon: "none"
							});
						}
					}
				});
			}
		}
	}
</script>

<style>
.exchang{
	width: 750rpx;
}
.exchang .nav{
	width: 690rpx;
	padding: 30rpx;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}
.exchang .nav .item image{
	width: 96rpx;
	height: 96rpx;
	border-radius: 96rpx;
	display: block;
}
.exchang .nav .item text{
	display: block;
	text-align: center;
	color: #333333;
	font-size: 28rpx;
	font-weight: 600;
	margin-top: 10rpx;
}
.content{
	width: 690rpx;
	padding: 0 30rpx;
}
.content .inv-h-w{
	display: flex;
}
.content .inv-h{
	font-size: 32rpx;
	flex: 1;
	text-align: center;
	color: #999999;
	padding: 30rpx 0;
	font-weight: 600;
}
.content .inv-h-se{
	color: #2390DC;
	font-weight: 600;
}
.content .inv-h-se:after{
	content: " ";
	display: block;
	border-bottom: 6rpx solid #2390DC;
	width: 46rpx;
	margin: 26rpx auto 0;
	border-radius: 3rpx;
}
.content .contentList .item{
	display: flex;
	justify-content: space-between;
	margin-bottom: 40rpx;
}
.content .contentList .item>image{
	width: 85rpx;
	height: 85rpx;
	border-radius: 85rpx;
}
.content .contentList .item .itemRight{
	width: 580rpx;
	display: flex;
	align-content: flex-start;
	flex-wrap: wrap;
}
.content .contentList .item .itemRight .title{
	font-size: 28rpx;
	color: #333333;
	font-weight: 600;
	overflow : hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	margin: 10rpx 0;
}
.content .itemCon{
	width: 580rpx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	/* justify-content: flex-end; */
	
}
.content .itemCon text{
	display: block;
	font-size: 24rpx;
	color: #999999;
}
.itemRightHead{
	width: 580rpx;
	display: flex;
	justify-content: space-between;
}
.itemRightHead text{
	color: #333333;
	font-size: 28rpx;
	font-weight: 600;
}
.itemRightHead>view,.itemRightHead>view>text{
	color: #2390DC;
	font-size: 28rpx;
	font-weight: 600;
}
.itemRightHead view{
	color: #2390DC;
	font-size: 28rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.itemRightHead view text{
	padding-left: 20rpx;
}
.itemContent{
	width: 580rpx;
	font-size: 28rpx;
	color: #666666;
	overflow : hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.imgList{
	width: 140rpx;
	height: 140rpx;
	display: block;
	margin: 16rpx 10rpx 16rpx 0;
}
.imgList:nth-child(3n){
	margin-right: 0;
}
.itemBottom{
	display: flex;
}
.itemBottom>view{
	display: flex;
	margin-left: 18rpx;
}
</style>
