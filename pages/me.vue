<template>
	<view class="me">
		<view class="meHead">
			<image class="userImg" src="../static/a.jpg" mode="" data-name="meUserInfo" @tap="goPageNavigateTo" />
			<view class="meHeadCon">
				<!-- <view><text class="login">请点击登录/注册</text></view> -->
				<view>
					<text class="login">admin</text>
					<text class="tip">青铜新手</text>
				</view>
				<view class="meHeadList">
					<text data-name="meFavorite" @tap="goPageNavigateTo">我的收藏</text>
					<text data-name="meFriend" @tap="goPageNavigateTo">我的好友</text>
					<text data-name="mePost" @tap="goPageNavigateTo">我的发表</text>
				</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="contentList">
			<view class="item" data-name="meMyDraft" @tap="goPageNavigateTo">
				<view class="left">
					<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
					<text>我的草稿</text>
				</view>
				<view>
					<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
				</view>
			</view>
			<view class="item" data-name="meMyMobile" @tap="goPageNavigateTo">
				<view class="left">
					<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
					<text>我的手机</text>
				</view>
				<view>
					<text class="cur">123456</text>
					<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
				</view>
			</view>
			<view class="item" data-name="meMessage" @tap="goPageNavigateTo">
				<view class="left">
					<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
					<text>我的消息</text>
				</view>
				<view>
					<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
				</view>
			</view>
			<view class="item" data-name="meCertification" @tap="goPageNavigateTo">
				<view class="left">
					<uni-icon type="" class="iconfont iconrenzheng"></uni-icon>
					<text>用户认证</text>
				</view>
				<view>
					<text class="cur">申请</text>
					<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
				</view>
			</view>
			<view class="item" data-name="meVIP" @tap="goPageNavigateTo">
				<view class="left">
					<uni-icon type="" class="iconfont iconhuiyuan"></uni-icon>
					<text>开通会员</text>
				</view>
				<view>
					<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
				</view>
			</view>
		<!-- 	<view class="item" data-name="meVIPDiff" @tap="goPageNavigateTo">
				<view class="left">
					<uni-icon type="" class="iconfont iconhuiyuan1"></uni-icon>
					<text>会员区别</text>
				</view>
				<view>
					<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
				</view>
			</view> -->
			<view class="item" data-name="meAllProduct" @tap="goPageNavigateTo">
				<view class="left">
					<uni-icon type="" class="iconfont iconshujuhuizong"></uni-icon>
					<text>各省产品汇总</text>
				</view>
				<view>
					<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
				</view>
			</view>
			<view class="item" data-name="meReserve" @tap="goPageNavigateTo">
				<view class="left">
					<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
					<text>备用金打造</text>
				</view>
				<view>
					<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
				</view>
			</view>
			<view class="item" data-name="meNewbieRead" @tap="goPageNavigateTo">
				<view class="left">
					<uni-icon type="" class="iconfont iconxinshoubangzhu"></uni-icon>
					<text>新手必读</text>
				</view>
				<view>
					<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
				</view>
			</view>
			<view class="item" data-name="meSpread" @tap="goPageNavigateTo">
				<view class="left">
					<uni-icon type="" class="iconfont iconhongbaoguanli"></uni-icon>
					<text>推广返佣</text>
				</view>
				<view>
					<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
				</view>
			</view>
			<view class="item" data-name="meService" @tap="goPageNavigateTo">
				<view class="left">
					<uni-icon type="" class="iconfont iconzaixiankefu"></uni-icon>
					<text>联系客服</text>
				</view>
				<view>
					<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
				</view>
			</view>
			<view class="item" data-name="meSetting" @tap="goPageNavigateTo">
				<view class="left">
					<uni-icon type="" class="iconfont iconshezhi"></uni-icon>
					<text>个人设置</text>
				</view>
				<view>
					<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
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

			}
		},
		onLoad() {
			
		},
		onShow() {
			this.getUserInfo()
		},
		methods: {
			// 进入页面
			goPageNavigateTo(e) {
				console.log(e)
				let url = e.currentTarget.dataset.name
				uni.navigateTo({
					url: `/pages/${url}`
				})
			},
			getUserInfo() {
				// 用户信息获取
				// uni.showLoading({
				//   title: '用户信息获取中...'
				// });
				// uni.showLoading({
				//   title: '加载中...',
				// 	duration: 1000000
				// });
				uni.request({
					url: `${helper.requestUrl}/me`,
					method: 'POST',
					header: {
						authorization: app.globalData.token
					},
					success: res => {
						uni.hideLoading();
						res = helper.null2str(res)
						console.log(res)
						if (res.data.status_code == 200) {
							this.userInfo = res.data.data
							
						}
					}
				})
			}
		}
	}
</script>

<style>
	.me {
		width: 750rpx;
	}

	.me .meHead {
		width: 690rpx;
		padding: 30rpx;
		background: #2390DC;
		height: 280rpx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}

	.me .meHead .meHeadCon {
		background: #fff;
		border-radius: 10rpx;
		height: 200rpx;
		z-index: 4;
		width: 670rpx;
		box-shadow: 0rpx 10rpx 44rpx 4rpx rgba(5, 5, 5, 0.11);
		margin-top: -70rpx;
		padding-top: 70rpx;
	}

	.me .meHead .userImg {
		z-index: 9;
		width: 144rpx;
		height: 144rpx;
		border: 4rpx solid #FFFFFF;
		border-radius: 144rpx;
		margin-top: 20rpx;
	}

	.me .meHeadCon>view {
		display: flex;
		justify-content: center;
		margin: 20rpx 0;
	}

	.me .login {
		color: #333333;
		font-size: 32rpx;
		font-weight: 600;
		text-align: center;
		display: block;
	}

	.me .tip {
		color: #fff;
		font-size: 18rpx;
		background: #2390DC;
		padding: 4rpx 14rpx;
		border-radius: 10rpx;
		height: 36rpx;
		line-height: 36rpx;
		margin-left: 10rpx;
	}

	.me .meHeadList {
		padding: 0 40rpx;
		display: flex;
		justify-content: space-between !important;
		margin-top: 45rpx !important;
	}

	.me .meHeadList text {
		font-weight: 600;
		font-size: 28rpx;
		color: #333333;
	}

	.me .contentList {
		width: 690rpx;

	}

	.line {
		margin: 110rpx 0 20rpx;
		width: 750rpx;
		background: #F9F9F9;
		height: 6rpx;
	}

	.me .contentList .item {
		width: 690rpx;
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}

	.me .contentList .item .left {
		display: flex;
		justify-content: flex-start;
	}

	.me .contentList .item .left text {
		font-size: 30rpx;
		font-weight: 600;
		color: #333333;
		margin-left: 10rpx;
		/* width: 200rpx; */
	}

	.me .contentList .item .left icon {
		color: #C0C0C0;
		font-size: 40rpx;
		width: 40rpx;
		/* background: #007AFF; */
	}

	.me .contentList .item .iconchangyongtubiao-xianxingdaochu-zhuanqu- {
		color: #C0C0C0;
	}

	.cur {
		color: #333333;
		font-size: 30rpx;
		display: inline-block;
	}
</style>
