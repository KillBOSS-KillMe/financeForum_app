<template>
	<view class="articleDetail">
		<view class="content">
			<text class="title">{{info.title}}</text>
			<view class="info">
				<view class="left">
					<image :src="info.img" mode=""></image>
					<view class="leftTitle">
						<text>{{info.name}}</text>
						<view class="leftTitleBottom">
							<text>{{info.type}}</text>
							<text>{{info.time}}</text>
							<text class="follow">关注</text>
						</view>
					</view>
				</view>
				<view class="read">
					<view>
						<uni-icon class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-" type=""></uni-icon>
						123
					</view>
					<view>
						<uni-icon class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-" type=""></uni-icon>
						123
					</view>
				</view>
			</view>
			<rich-text :nodes="nodes"></rich-text>
			<view class="tip">
				<text>解析：</text>
				<view>您还不是<text>VIP会员</text>,本帖隐藏内容仅限VIP会员可见，点击此处开通会员后查看</view>
			</view>
			<!-- <view class="read"><uni-icon class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-" type=""></uni-icon>123</view> -->
			<view class="share">
				<text>分享至</text>
				<image src="../static/logo.png" mode=""></image>
				<image src="../static/logo.png" mode=""></image>
				<image src="../static/logo.png" mode=""></image>
			</view>
		</view>
		<view class="line"></view>
		<view class="reward">
			<image src="../static/logo.png" mode=""></image>
			<text>觉得不错，打个赏~</text>
			<view class="money">2564人已经打赏，共658.21元</view>
		</view>
		<view class="line"></view>
		<view class="comment">
			<view class="commentTitle"><text class="commentTit">评论</text><text class="commentLandlord">只看楼主</text></view>
			<view class="list">
				<block v-for="(item,index) in commentList" :key="index">
					<view class="item">
						<image :src="item.img" mode=""></image>
						<view class="right">
							<view class="itemListHead">
								<view class="itemListHeadLeft">
									<text class="rightName">{{item.name}}</text>
									<uni-icon class="iconfont iconzanzan" type=""></uni-icon>
									<text class="rightMember">{{item.name}}</text>
								</view>
								<uni-icon class="iconfont iconzanzan" type=""></uni-icon>
							</view>
							<text class="rightContent">{{item.content}}</text>
							<view class="rightBottom">
								<view class="flex">
									<text>{{item.floor}}楼</text>
									<text>{{item.time}}</text>
								</view>
								<uni-icon class="iconfont iconzanzan" type=""></uni-icon>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
		<view class="bottom">
			<input type="text" value="" placeholder="发表评论..."/>
			<uni-icon class="iconfont iconzanzan" type=""></uni-icon>
			<uni-icon class="iconfont iconfenxiang" type=""></uni-icon>
		</view>
	</view>
</template>

<script>
const app = getApp()
export default {
	data() {
		return {
			info:{id:'1',title:'有钱花二次贷，只要有信用卡或者有公积金就 来，人均10000起步，秒批最高10万，当天到 账',img:'../static/logo.png',name:'admin',type:'楼主',time:'1小时之前'},
			nodes: [{
				name: 'div',
				attrs: {
					class: 'div-class',
					style: 'color: #333333;font-size:14px;line-height:20px;'
				},
				children: [{
					type: 'text',
					text: '公告年终业绩每股收入是:3.98元，（即是第四季度收入是:1.87元的）；2017年前三3季度每股收入业绩是:1.99元，公告'
				}]
			}],
			commentList:[
				{id:'1',img:'../static/logo.png',name:'admin',content:'写的不错，可以试试！',time:'9分钟之前',floor:'1'},
				{id:'1',img:'../static/logo.png',name:'adminadminadmin',content:'写的不错，xxxxxxxx可以试试！',time:'9分钟之前',floor:'1'}
			],
			options: null
		}
	},
	onLoad(options) {
		this.options = options
		// 文章详情加载
		this.getArticleDetail()
	},
	methods: {
		// 文章详情加载
		getArticleDetail() {
			uni.showLoading({
			  title: '加载中...',
				duration: 1000000
			});
			uni.request({
				url: `${app.globalData.requestUrl}/posts/show`,
				method: 'GET',
				header: {
					authorization: app.globalData.token
				},
				data: {
					post_id: this.options.id
				},
				success: res => {
					uni.hideLoading();
					res = app.null2str(res)
					console.log(res)
					if (res.data.status_code == 200) {
						this.articleDetail = res.data.data
					} else {
						uni.showToast({
							title: res.data.message
						});
					}
			
				}
			})
		}
	}
};
</script>

<style>
.articleDetail {
	width: 750rpx;
}
.articleDetail .content {
	width: 690rpx;
	padding: 20rpx 30rpx;
}
.articleDetail .content .title {
	font-size: 34rpx;
	font-weight: 600;
	color: #333333;
	-webkit-line-clamp: 3;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
}
.articleDetail .content .info {
	display: flex;
	justify-content: space-between;
	align-content: center;
	align-items: center;
	margin: 30rpx 0;
	border-bottom: 1rpx dashed #ECECEC;
	border-top: 1rpx dashed #ECECEC;
	padding: 30rpx 0;
}
.articleDetail .content .info .left {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.articleDetail .content .info .left > image {
	width: 90rpx;
	height: 90rpx;
	border-radius: 90rpx;
	margin-right: 20rpx;
}
.articleDetail .content .info .left .leftTitle > text {
	font-size: 28rpx;
	color: #333333;
	font-weight: 600;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.articleDetail .content .info .left .leftTitleBottom{
	display: flex;
	align-items: flex-end;
}
.articleDetail .content .info .left .leftTitleBottom>text{
	color: #666666;
	font-size: 24rpx;
	margin-right: 20rpx;
}
.articleDetail .follow {
	font-size: 28rpx;
	color: #fff !important;
	font-weight: 600;
	background: #2390dc;
	width: 98rpx;
	height: 58rpx;
	line-height: 58rpx;
	text-align: center;
	border-radius: 10rpx;
}
.read{
	width: 100rpx;
	height: 90rpx;
	display: flex;
	align-content: space-between;
	flex-wrap: wrap;
}
.read view{
	font-size: 20rpx;
	color: #333333;
}
.content .tip{
	font-size: 28rpx;
	color: #333333;
	font-weight: 600;
	margin-top: 30rpx;
}
.content .tip>view>text{
	display: inline-block;
	color: #EE4D4D;
}
/* .content .read{
	color: #999999;
	font-size: 24rpx;
	margin: 16rpx 0;
} */
.content .share{
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-top: 30rpx;
}
.content .share text,.reward text{
	font-size: 28rpx;
	color: #333333;
}
.content .share image{
	width: 64rpx;
	height: 64rpx;
	border-radius: 64rpx;
	margin-left: 36rpx;
}
.reward{
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin: 30rpx auto;
}
.reward image{
	width: 64rpx;
	height: 64rpx;
	border-radius: 64rpx;
}
.reward text{
	text-align: center;
	width: 690rpx;
	margin-top: 10rpx;
}
.comment{
	padding-bottom: 110rpx;
	/* padding: 30rpx 30rpx 100rpx; */
}
.comment .commentTitle{
	padding:30rpx;
	width: 690rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom:1rpx solid #E4E4E4;
}
.comment .commentTit{
	font-size: 30rpx;
	color: #333333;
	font-weight: 600;
}
.comment .commentLandlord{
	font-size: 26rpx;
	color: #2390DC;
	font-weight: 600;
	border: 1rpx solid #2390DC;
	padding: 6rpx 14rpx;
	border-radius: 10rpx;
}
.comment .list{
	width: 690rpx;
	padding: 0 30rpx;
}
.comment .item{
	display: flex;
	justify-content: space-between;
	padding: 30rpx 0;
	border-bottom: 1rpx solid #e4e4e4;
}
.comment .item>image{
	width: 90rpx;
	height: 90rpx;
	border-radius: 90rpx;
}
.comment .right{
	width: 580rpx;
}
.comment .rightName{
	font-size: 28rpx;
	color: #333333;
	font-weight: 600;
	/* margin-bottom: 10rpx; */
    overflow:hidden;
	text-overflow:ellipsis;
	white-space:nowrap;
}
.comment .rightContent{
	font-size: 28rpx;
	color: #333333;
	-webkit-line-clamp: 2;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	margin-bottom: 20rpx;
}
.comment .rightBottom{
	display: flex;
	justify-content: space-between;
}
.comment .flex{
	display: flex;
	justify-content: flex-start;
}
.comment .flex>text{
	color: #666666;
	font-size: 24rpx;
	margin-right: 36rpx;
}
.comment .itemListHead{
	display: flex;
	justify-content: space-between;
}
.itemListHeadLeft{
	display: flex;
	align-items: flex-start;
}
.rightMember{
	background: #D2BF8E;
	color: #fff;
	font-size: 18rpx;
	padding: 1rpx 10rpx;
	border-radius: 10rpx;
	margin-left: 20rpx;
}
.reward .money{
	font-size: 20rpx;
	font-weight: 700;
	color: #B8B8B8;
}
.bottom{
	width: 690rpx;
	padding: 0 30rpx;
	border-top: 1rpx solid #E4E4E4;
	/* height: 98rpx; */
	height: 98rpx;
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	align-content: center;
	align-items: center;
	background: #fff;
}
.bottom input{
	width: 508rpx;
	border: 1rpx solid #E4E4E4;
	height: 70rpx;
	line-height: 70rpx;
	border-radius: 10rpx;
	padding: 0 20rpx;
	color: #999999;
	font-size: 24rpx;
	/* margin-right: 20rpx; */
}
.bottom .iconfont{
	font-size: 44rpx;
	font-weight: 600;
	color: #999;
	margin-left: 20rpx;
}
</style>
