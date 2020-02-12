<template>
	<view class="shareCode">
		<image class="bg" src="../static/QRBg.png" mode=""></image>
		<view class="content">
			<text class="head">新微金推广二维码</text>
			<view class="con">
				<image src="../static/card0.png" mode=""></image>
				<text>注:推广二维码仅限一次，分享后需要刷新</text>
				<button type="" class="submit" v-if="codeType == '1'">提交开通申请</button>
				<button type="" class="submit" v-if="codeType == '2'" @tap="quickInlet(2)">分享</button>
			</view>
			<!-- 底部分享弹窗 立即邀请 -->
			<uni-popup ref="showshare" type="bottom" class="meShare" @touchmove.stop.prevent>
				<view class="uni-share">
					<text class="uni-share-title">分享到</text>
					<view class="uni-share-content">
						<!-- #ifdef MP-WEIXIN -->
							<button class="share-btn" open-type="share">
								<view class="uni-share-content-box">
									<view class="uni-share-content-image">
										<uni-icon type="" class="iconfont iconweixin"></uni-icon>
									</view>
									<text class="uni-share-content-text">微信好友</text>
								</view>
							</button>
						<!-- #endif -->
						<!-- #ifdef APP-PLUS || H5 -->
							<block v-for="(item, index) in bottomData" :key="index">
								<view class="uni-share-content-box" @tap="goShare(item.type)">
									<view class="uni-share-content-image">
										<uni-icon type="" class="iconfont" :class="item.icon"></uni-icon>
									</view>
									<text class="uni-share-content-text">{{ item.text }}</text>
								</view>
							</block>
						<!-- #endif -->
					</view>
					<text class="uni-share-btn" @click="cancel('share')">取消分享</text>
				</view>
			</uni-popup>
			<!-- 遮罩 -->
			<view class="modelShow">
				<view class="zhezhao"></view>
				<text>请获取二维码</text>
			</view>
		</view>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup.vue';
	export default {
		data() {
			return {
				bottomData: [
					{
						text: '微信好友',
						type: 'WXSceneSession',
						icon: 'iconweixin'
					},
					{
						text: '朋友圈',
						type: 'WXSenceTimeline',
						icon: 'iconpengyouquan'
					}
				],
				codeType: ''
			}
		},
		components: {
			// wTable,
			uniPopup
		},
		onLoad(option) {
			console.log(option)
			this.codeType = option.type
			// this.imgUrl = helper.imgUrl;
		},
		// 微信分享
		onShareAppMessage() {
			let url = this.getPageUrl()
			return {
				title: this.articleDetail.title,
				path: url
			}
		},
		methods: {
			quickInlet(e) {
				if (e == 2) {
					this.$refs.showshare.open();
				} else if (e == 1) {
					this.$refs.center.open();
				}
				console.log(e);
			},
			cancel(type) {
				this.$refs['show' + type].close();
			},
			goShare(e) {
				console.log(e)
				let sceneType = ''
				if(e == 'WXSceneSession'){
					sceneType = 'WXSceneSession'
				} else if(e == 'WXSenceTimeline'){
					sceneType = 'WXSenceTimeline'
				}
				uni.share({
				    provider: "weixin",
				    scene: sceneType,
				    type: 0,
				    href: this.collectionList.share_link,
				    title: "新微金论坛",
				    summary: "我正在使用新微金论坛，赶紧跟我一起来体验！",
				    imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				});
			},
		}
	}
</script>

<style>
.shareCode{
	width: 750rpx;
	height: 100vh;
	overflow: hidden;
	position: relative;
}
.bg{
	width: 750rpx;
	height: 100vh;
	overflow: hidden;
}	
.content{
	position: absolute;
	top: 80rpx;
	left: 50%;
	margin-left: -276rpx;
	z-index: 6;
	width: 552rpx;
	background: #ffffff;
	border: 1rpx solid #ffffff;
	border-radius: 14rpx;
	padding: 0 0 60rpx 0;
}
.content .head{
	font-size: 28rpx;
	font-weight: 700;
	color: #333333;
	text-align: center;
	border-bottom: 2rpx dashed #DCDCDC;
	padding: 24rpx 0;
}
.content .head::after{
	content: '';
	display: block;
	width: 20rpx;
	height: 40rpx;
	background: #2390DC;
	border-radius: 0 50rpx 50rpx 0;
	position: absolute;
	top:66rpx;
	left: -2rpx;
}
.content .head::before{
	content: '';
	display: block;
	width: 20rpx;
	height: 40rpx;
	background: #2390DC;
	border-radius: 50rpx 0 0 50rpx;
	position: absolute;
	top: 66rpx;
	right: -2rpx;
}
.con{
	margin-top: 50rpx;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
}
.con image{
	width: 416rpx;
	height: 420rpx;
	border: 1px solid #ffffff;
}
.con text{
	font-size: 20rpx;
	font-weight: 700;
	color: #666666;
	margin: 30rpx 0 40rpx;
}
.con .submit{
	width: 420rpx;
	height: 50rpx;
	line-height: 50rpx;
	background: #2390dc;
	box-shadow: 0rpx 10rpx 45rpx 0rpx rgba(35,144,220,0.6); 
	border: none;
	color: #fff;
	font-size: 24rpx;
	font-weight: 700;
	letter-spacing: 1rpx;
	border-radius: 30rpx;
}
.meShare {
	width: 750rpx;
	position: fixed;
	z-index: 99;
	bottom: 0;
	left: 0;
}
/* 底部分享 */
.uni-share {
	display: flex;
	flex-direction: column;
	background-color: #fff;
}

.uni-share-title {
	line-height: 60rpx;
	font-size: 24rpx;
	padding: 15rpx 0;
	text-align: center;
}

.uni-share-content {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	padding: 15px;
}

.uni-share-content-box {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 200rpx;
}

.uni-share-content-image {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 70rpx;
	height: 70rpx;
	overflow: hidden;
	border-radius: 10rpx;
}
.uni-share-content-image .iconfont {
	font-size: 60rpx;
	color: #07c160;
}
.content-image {
	width: 60rpx;
	height: 60rpx;
}

.uni-share-content-text {
	font-size: 26rpx;
	color: #333;
	padding-top: 5px;
	padding-bottom: 10px;
}

.uni-share-btn {
	height: 90rpx;
	line-height: 90rpx;
	font-size: 32rpx;
	text-align: center;
	color: #fff;
	font-weight: 700;
	background: #2390DC;
}
.share-btn{
	border: none;
	background: none;
}
button::after {
	border: none;
}
/* 遮罩 */
.modelShow{
	width: 418rpx;
	height: 430rpx;
	position: absolute;
	top: 130rpx;
	left: 50%;
	margin-left: -210rpx;
	z-index: 5;
}
.zhezhao{
	width: 418rpx;
	height: 430rpx;
	background-color: #fff;
	opacity: .5;
	position: absolute;
}
.modelShow text{
	width: 418rpx;
	font-size: 24rpx;
	font-weight: 700;
	color: #333333;
	letter-spacing: 1px;
	height: 430rpx;
	line-height: 430rpx;
	position: absolute;
	left: 50%;
	margin-left: -70rpx;
	z-index: 6;
}
</style>
