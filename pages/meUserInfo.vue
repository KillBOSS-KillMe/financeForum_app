<template>
	<view class="me">
		<view class="meHead">
			<view class="icon" @tap="edit">
				<uni-icon type="" class="iconfont iconxinshoubangzhu"></uni-icon>
			</view>
			<image class="userImg" :src="imgUrl+userInfo.avatar" mode="" data-name="meUserInfo" @tap="goPageNavigateTo" />
			<!-- <image class="userImg" src="../static/imgLost.png" mode=""></image> -->
			<view class="meHeadCon">
				<!-- <view><text class="login">请点击登录/注册</text></view> -->
				<view>
					<text class="tip" v-if="userInfo.type == 'normal'">{{userInfo.deploy.userlevel.level_name}}</text>
				  <text class="tip" style="background-color: #C6A25D;" v-if="userInfo.type == 'member'">{{userInfo.deploy.vipuserlevel.level_name}}</text />					
				</view>
				
				<view class="meHeadList">
					<text>参与</text>
					<text @tap="meFollow">关注</text>
					<text @tap="meFan">粉丝</text>
				</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="content">
			<view class="inv-h-w">
				<view :class="['inv-h',Inv==0?'inv-h-se':'']" @tap="changeTab(0)">发表</view>
				<view :class="['inv-h',Inv==1?'inv-h-se':'']" @tap="changeTab(1)">资料</view>
			</view>
			<view class="contentList" v-if="Inv==0">
				<view class="item" :data-id="item.post_id" v-for="(item,index) in publishList" :key="index">
					<image :src="imgUrl + item.theme_pic" mode="aspectFill" v-if="item.theme_pic != ''"></image>
					<image src="../static/imgLost.png" mode="aspectFill" v-else></image>
					<view class="itemRight">
						<text class="title">{{item.title}}</text>
						<view class="itemCon">
							<text>{{item.publish_time}}</text>
							<text>{{item.user}}</text>
							<text>{{item.comments_count}}评</text>
						</view>
					</view>
				</view>
			</view>
			<view class="contentList" v-if="Inv==1">
				<view class="itemList">
					<text>性别</text>
					<!-- 性别（m 男 f 女 no_set 未设置） -->
					<text>{{userInfo.sex}}</text>
					<text v-if="userInfo.sex == 'm'">男</text>
					<text v-if="userInfo.sex == 'f'">女</text>
					<text v-if="userInfo.sex == 'no_set'">未设置</text>
				</view>
				<view class="itemList">
					<text>居住地</text>
					<text>{{userInfo.province}} {{userInfo.city}} {{userInfo.district}}</text>
				</view>
				<view class="itemList">
					<text>居住县</text>
					<text>{{userInfo.district}}</text>
				</view>
				<view class="itemList">
					<text>学历</text>
					<text>{{userInfo.education}}</text>
				</view>
				<view class="itemList">
					<text>芝麻信用分</text>
					<text>{{userInfo.sesame_credit}}</text>
				</view>
				<view class="itemList">
					<text>信用卡</text>
					<text>{{userInfo.credit_card}}</text>
				</view>
				<view class="itemList">
					<text>社保</text>
					<text>{{userInfo.social_security}}</text>
				</view>
				<view class="itemList">
					<text>公积金</text>
					<text>{{userInfo.provident_fund}}</text>
				</view>
				<view class="itemList">
					<text>贡献</text>
					<text>{{userInfo.contribution}}</text>
				</view>
				<view class="itemList">
					<text>威望</text>
					<text>{{userInfo.prestige}}</text>
				</view>
				<view class="itemList">
					<text>现金</text>
					<text>{{userInfo.cash}}</text>
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
				Inv: 0,
				imgUrl: '',
				publishList: [],
				userInfo: {}
			}
		},
		onLoad() {
			// 获取我的发布
			this.getPublish()
			this.imgUrl = helper.imgUrl
		},
		onShow() {
			// 获取用户信息
			this.getUserInfo()
		},
		methods: {
			changeTab(e) {
				console.log(e)
				this.Inv = e;
			},
			// 编辑
			edit() {
				uni.navigateTo({
					url: `/pages/meEdit`
				})
			},
			// 粉丝
			meFan() {
				uni.navigateTo({
					url: `/pages/meFan`
				})
			},
			// 关注
			meFollow() {
				uni.navigateTo({
					url: `/pages/meFollow`
				})
			},
			// 获取我的发布列表
			getPublish() {
				uni.showLoading({
				  title: '加载中...',
					duration: 1000000
				});
				uni.request({
					url: `${helper.requestUrl}/user/publish`,
					method: 'GET',
					header: {
						authorization: app.globalData.token
					},
					success: res => {
						console.log(res);
						uni.hideLoading();
						res = helper.null2str(res)
						if (res.data.status_code == '1') {
							this.publishList = res.data.data
						} else {
							uni.showToast({
								title: res.data.message,
								icon: "none"
							});
						}
					}
				});
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
						// console.log(res,'++++++')
						console.log(res.data, '+++++++++')
						this.userInfo = res.data
						if(this.userInfo.credit_card == 0){
							this.userInfo.credit_card = '无'
						} else{
								this.userInfo.credit_card = '有'
						};
						if(this.userInfo.social_security == 0){
							this.userInfo.social_security = '无'
						} else{
							this.userInfo.social_security = '有'
						}
						if(this.userInfo.provident_fund == 0){
							this.userInfo.provident_fund = '无'
						} else{
							this.userInfo.provident_fund = '有'
						}
						if(this.userInfo.education == 1){
							this.userInfo.education = '小学'
						} else if(this.userInfo.education == 2){
							this.userInfo.education = '初中'
						}else if(this.userInfo.education == 3){
							this.userInfo.education = '高中'
						}else if(this.userInfo.education == 4){
							this.userInfo.education = '大专'
						}else if(this.userInfo.education == 5){
							this.userInfo.education = '本科'
						}else if(this.userInfo.education == 6){
							this.userInfo.education = '硕士'
						}else if(this.userInfo.education == 7){
							this.userInfo.education = '博士'
						}
						if (res.data.status_code == 200) {


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

	.me .icon {
		position: absolute;
		top: 30rpx;
		right: 40rpx;
	}

	.me .icon icon {
		color: #fff;
		font-size: 46rpx;
		font-weight: 600;
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
	.me .meHead .iconxinshoubangzhu{
		color: #fff;
	}
	.me .meHead .meHeadCon {
		background: #fff;
		border-radius: 10rpx;
		height: 200rpx;
		z-index: 3;
		width: 670rpx;
		box-shadow: 0rpx 10rpx 44rpx 4rpx rgba(5, 5, 5, 0.11);
		margin-top: -70rpx;
		padding-top: 70rpx;
	}

	.me .meHead .userImg {
		z-index: 4;
		width: 144rpx;
		height: 144rpx;
		border: 4rpx solid #FFFFFF;
		border-radius: 144rpx;
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
		/* 	width: 750rpx;
	background: #F9F9F9;
	height: 6rpx; */
	}

	.content {
		width: 690rpx;
		padding: 0 30rpx;
	}

	.content .inv-h-w {
		display: flex;
	}

	.content .inv-h {
		font-size: 32rpx;
		flex: 1;
		text-align: center;
		color: #999999;
		padding: 30rpx 0;
	}

	.content .inv-h-se {
		color: #2390DC;
		font-weight: 600;
	}

	.content .inv-h-se:after {
		content: " ";
		display: block;
		border-bottom: 6rpx solid #2390DC;
		width: 46rpx;
		margin: 26rpx auto 0;
		border-radius: 3rpx;
	}

	.content .contentList .item {
		display: flex;
		justify-content: space-between;
		margin-bottom: 40rpx;
	}

	.content .contentList .item image {
		width: 220rpx;
		height: 136rpx;
		border-radius: 10rpx;
	}

	.content .contentList .item .itemRight {
		width: 440rpx;
		display: flex;
		align-content: space-between;
		flex-wrap: wrap;
	}

	.content .contentList .item .itemRight .title {
		font-size: 28rpx;
		color: #333333;
		font-weight: 600;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.content .itemCon {
		width: 440rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		/* justify-content: flex-end; */

	}

	.content .itemCon text {
		display: block;
		font-size: 24rpx;
		color: #999999;
	}

	.content .itemList {
		display: flex;
		justify-content: space-between;
		margin-bottom: 40rpx;

	}

	.content .itemList text {
		font-size: 30rpx;
		color: #333333;
	}

	.content .itemList text:first-child {
		font-weight: 600;
	}
</style>
