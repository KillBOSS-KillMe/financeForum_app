<template>
	<view class="me">
		<view class="meHead">
			<image class="userImg" v-if="userInfo.avatar != ''" :src="imageUrl" mode="" data-name="meUserInfo" @tap="goPageNavigateTo" />
			<image class="userImg" v-else src="../static/user.png" mode="" data-name="meUserInfo" @tap="goPageNavigateTo"></image>
			<view class="meHeadCon">
				<!-- <view><text class="login">请点击登录/注册</text></view> -->
				<view>
					<text class="login">{{userInfo.name}}</text>
					<text class="tip" v-if="userInfo.type == 'normal'">{{userInfo.deploy.userlevel.level_name}}</text>
				  <text class="tip" style="background-color: #C6A25D;" v-if="userInfo.type == 'member'">{{userInfo.deploy.vipuserlevel.level_name}}</text>
				</view>
				<view class="meHeadList">
					<text data-name="meFavorite" @tap="goPageNavigateTo">我的收藏</text>
					<!-- <text data-name="meFriend" @tap="goPageNavigateTo">我的好友</text> -->
					<text data-name="mePost" @tap="goPageNavigateTo">我的发表</text>
				</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="contentList">
			<view class="item" data-name="meApply" @tap="goPageNavigateTo">
					<view>
						<image src="../static/meByj.png" mode=""></image>
					</view>
					<text>系统应用</text>
			</view>
			<view class="item" data-name="meSpread" @tap="goPageNavigateTo">
					<view>
						<image src="../static/meTgfy.png" mode=""></image>
					</view>
					<text>推广返佣</text>
			</view>
			<view class="item" data-name="meService" @tap="goPageNavigateTo">
					<view style="width: 60rpx;height: 50rpx;">
						<image src="../static/meKf.png" mode=""></image>
					</view>
					<text>联系客服</text>
			</view>
			<view class="item" data-name="meMyDraft" @tap="goPageNavigateTo">
					<view>
						<image src="../static/meCgx.png" mode=""></image>
					</view>
					<text>我的草稿</text>
			</view>
			<view class="item" data-name="meMessage" @tap="goPageNavigateTo">
					<view class="meInfo">
						<view class="curRead" v-if="userInfo.news == '1'"></view>
						<image src="../static/meXx.png" mode=""></image>
					</view>
					<text>我的消息</text>
			</view>
			<view class="item" data-name="meSetting" @tap="goPageNavigateTo">
					<view>
						<image src="../static/meSz.png" mode=""></image>
					</view>
					<text>个人设置</text>
			</view>
			<view class="item" data-name="meMyMobile" @tap="goPageNavigateTo">
					<view style="width: 46rpx;">
						<image src="../static/meSj.png" mode=""></image>
					</view>
					<text>我的手机</text>
			</view>
			
			<view class="item" data-name="meCertification" @tap="goPageNavigateTo">
				<view>
					<image src="../static/meRead.png" mode=""></image>
				</view>
					<text>用户认证</text>
			</view>
			<view class="item" data-name="meVIP" @tap="goPageNavigateTo">
					<view>
						<image src="../static/meHy.png" mode=""></image>
					</view>
					<text>开通会员</text>
			</view>
			<view class="item" data-name="meNewbieRead" @tap="goPageNavigateTo">
					<view>
						<image src="../static/meUser.png" mode=""></image>
					</view>
					<text>新手必读</text>
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
				userInfo: {},
				imgUrl: '',
				imageUrl: ''
			}
		},
		onLoad() {
			this.imgUrl = helper.imgUrl
		},
		onShow() {
			this.getUserInfo()
		},
		methods: {
			// 进入页面
			goPageNavigateTo(e) {
				console.log(e)
				let url = e.currentTarget.dataset.name
				if(url == 'meNewbieRead'){
					uni.navigateTo({
						url: `/pages/articleDetail?id=${21}`
					})
					
				}else if(url == 'meSpread'){
					if(this.userInfo.type == 'normal'){
						uni.showToast({
							title: '您不是会员，暂无此权限',
							icon: 'none',
							duration: 1000
						})
						setTimeout(e =>{
							uni.navigateTo({
								url: `/pages/meVIP`
							})
						},1600)
					}else{
						uni.navigateTo({
							url: `/pages/meSpread`
						})
					}
				}else if(url == 'meMessage'){
					uni.navigateTo({
						url: `/pages/${url}?isType=${this.userInfo.news }`
					})
				} else{
					uni.navigateTo({
						url: `/pages/${url}`
					})
				}
			},
			getUserInfo() {
				// 用户信息获取
				uni.showLoading({
				  title: '用户信息获取中...'
				});
				uni.request({
					url: `${helper.requestUrl}/me`,
					method: 'POST',
					header: {
						authorization: app.globalData.token
					},
					success: res => {
						uni.hideLoading();
						res = helper.null2str(res)
						if (res.statusCode == 200) {
							this.userInfo = res.data
							this.imageUrl = this.imgUrl+this.userInfo.avatar
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
		padding: 0 0 30rpx;
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
		font-weight: 600;
		text-align: center;
		display: block;
		overflow:hidden; 
		text-overflow:ellipsis;
		white-space:nowrap;
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
		display: flex;
		flex-wrap: wrap;
		padding: 0 30rpx 30rpx;
	}
	.line {
		margin: 110rpx 0 20rpx;
		width: 750rpx;
		background: #F9F9F9;
		height: 6rpx;
	}
	.me .contentList .item {
		width: 172.5rpx;
		/* padding: 0 30rpx; */
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		/* align-content: center; */
		/* height: 50rpx; */
		margin-bottom: 50rpx;
	}
	.me .contentList .item text {
		font-size: 28rpx;
		font-weight: 600;
		color: #333333;
		width: 168rpx;
		text-align: center;
		/* margin-left: 10rpx; */
		/* width: 200rpx; */
	}
	.me .contentList .item>view {
		width: 52rpx;
		height: 48rpx;
		margin-bottom: 16rpx;
	}
	.me .contentList .item>view image{
		width: 100%;
		height: 100%;
	}
	.me .contentList .item .iconchangyongtubiao-xianxingdaochu-zhuanqu- {
		color: #C0C0C0;
	}
	.cur {
		color: #333333;
		font-size: 30rpx;
		display: inline-block;
	}
	.meInfo{
		position: relative;
	}
	.meInfo .curRead{
		width: 14rpx;
		height: 14rpx;
		background: red;
		border-radius: 14rpx;
		position: absolute;
		top: 0;
		right: 0;
	}
</style>