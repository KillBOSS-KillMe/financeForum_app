<template>
	<view class="meSpread">
		<view class="bg"></view>
		<view class="user">
			<view class="left">
				<view>
					<image :src="imgUrl+collectionList.member.avatar" v-if="collectionList.member.avatar != ''" mode="" ></image>
					<image v-else src="../static/user.png" mode=""></image>
				</view>
				<view class="userInfo">
					<text class="name">{{collectionList.member.name || '未定义'}}</text>
					<view class="tip">
						<view class="">
							<text style="background-color: #C6A25D;">{{collectionList.member.integral_des}}</text>
							<!-- <text v-else>{{collectionList.member.integral_des}}</text> -->
						</view>
						<view class="">
							<text v-if="collectionList.member.team_des != ''">{{collectionList.member.team_des}}</text>
							<text style="display: none;"></text>
						</view>
					</view>
				</view>
			</view>
			<text class="right" @tap="cashSet">返佣设置</text>
		</view>
		<view class="meMoney">
			<text>我的余额</text>
			<view>
				<text>￥{{collectionList.user_blance || 0}}</text>
				<button type="" hover-class="none" @tap="withdraw">提现</button>
			</view>
		</view>
		<view class="team">
			<view @tap="goTeam(1)">
				<text>{{collectionList.invitees_count || 0}}</text>
				<text>团队个数(个)</text>
			</view>
			<view @tap="goTeam(2)">
				<text>{{collectionList.people_sum_total || 0}}</text>
				<text>团队总人数</text>
			</view>
		</view>
		<view class="bottom">
			<view class="invite">
				<text class="quickInlet" @tap="quickInlet(collectionList.member.is_show_face)">立即获取推广二维码</text>
				<text class="faceInlet" @tap="showCode(collectionList.member.is_show_face)">查看我的推广二维码</text>
			</view>
			<view class="content">
				<text>1、分享邀请链接给您的好友，用户下载安装app您将获得3现金奖励；</text>
				<text>2、邀请奖励将在好友领取时（访问此页面）发放；</text>
				<text>3、邀请奖励：用户开通一年会员，您将获得80元现金奖励；用户开通永久会员，您将获得120元先将奖励；（限会员才有推广权限）</text>
				<text>4、邀请好友获得现金奖励，满50元均可联系官方客服申请提现；</text>
				<text>5、一个硬件设备均视为同一用户，邀请链接仅对新注册用户有效；</text>
				<text>6、如发现任何违规作弊行为将视为情节严重程度进行判断：不予发放奖励封停冻结账号；</text>
				<text>7、如有其它的疑问请咨询子诺交流官方客服Tel:18535464004;</text>
			</view>
		</view>
	</view>
</template>

<script>
const app = getApp();
import helper from '../common/helper.js';
export default {
	data() {
		return {
			collectionList: {},
			imgUrl: '',
			isShow: true,
			cancelShow: true,
			inputValue: '',
			token: ''
		};
	},
	components: {
		
	},
	onShow() {
		this.content();
	},
	onLoad() {
		this.token = uni.getStorageSync('token')
		this.imgUrl = helper.imgUrl;
	},
	methods: {
		withdraw(){
			uni.navigateTo({
				url: `/pages/cashOut`
			})
		},

		goMore(){
			this.isShow = false
		},
		quickInlet(e) {
			console.log(e)
			uni.navigateTo({
				url: `/pages/shareCode?type=${e}`
			})
		},
		showCode(e){
			uni.navigateTo({
				url: `/pages/showCode?type=${e}`
			})
		},
		cancel(type) {
			this.$refs['show' + type].close();
		},
		content() {
			uni.request({
				url: `${helper.requestUrl}/promote-rebates`,
				method: 'GET',
				header: {
					authorization: this.token
				},
				success: res => {
					// uni.hideLoading();
					res = helper.null2str(res);
					console.log(res,'++++');
					if (res.data.status_code == 200) {
						this.collectionList = res.data;
					} else {

					}
				}
			});
		},
		// 团队列表
		goTeam(e){
			uni.navigateTo({
				url: `/pages/teamList`
			})
		},
		// 返佣设置
		cashSet(){
			uni.navigateTo({
				url: `/pages/commissionSet`
			})
		}
	}
};
</script>

<style>
.bg{
	width: 750rpx;
	background-color: #2390DC;
	height: 90rpx;
}
.user{
	width: 650rpx;
	margin: -50rpx 30rpx 0 30rpx;
	background: #ffffff;
	border-radius: 10rpx;
	box-shadow: 0rpx 10rpx 44rpx 0rpx rgba(205,205,205,0.45); 
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx;
}
.user .left{
	display: flex;
	align-items: center;
}
.user .left .name{
	width: 240rpx;
	font-size: 32rpx;
	font-weight: 700;
	color: #333333;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.user .left image{
	width: 115rpx;
	height: 115rpx;
	border-radius: 115rpx;
	border: 6rpx solid #FFFFFF;
	box-shadow: 3rpx 3rpx 44rpx 0rpx rgba(202, 202, 202, 0.7);
	margin-right: 20rpx;
}
/* .user .left .userInfo{
	display: flex;
	align-items: stretch;
} */
.user .left .userInfo .tip{
	display: flex;
	margin-top: 26rpx;
}
.user .left .userInfo .tip text{
	background: #2390dc;
	border-radius: 2rpx;
	font-size: 18rpx;
	font-weight: 400;
	color: #ffffff;
	padding: 4rpx 14rpx;
	margin-right: 20rpx;
}
.user .right{
	padding: 6rpx 26rpx;
	border-radius: 30rpx;
	background: #2390dc;
	box-shadow: 0rpx 10rpx 45rpx 0rpx rgba(35,144,220,0.6); 
	font-size: 24rpx;
	font-weight: 700;
	color: #ffffff;
}
button {
	background: #fff;
	position:relative;
	display:block;
	margin-left:auto;
	margin-right:auto;
	padding-left:14px;
	padding-right:14px;
	box-sizing:border-box;
	font-size:18px;
	text-align:center;
	text-decoration:none;
	line-height:2.55555556;
	border-radius:5px;
	-webkit-tap-highlight-color:transparent;
	overflow:hidden;
	color:#000000;
	background-color:#F8F8F8;
	margin: 0;
}
button {
  border-radius:0;
}
.team{
	margin: 30rpx auto 30rpx;
	width: 650rpx;
	height: 100rpx;
	padding: 20rpx;
	background: #fff;
	border-radius: 10rpx;
	box-shadow: 0rpx 15rpx 10rpx 0rpx rgba(205,205,205,0.45); 
	display: flex;
	justify-content: space-between;
}
.info{
	width: 650rpx;
	height: 120rpx;
	margin: -60rpx 30rpx 30rpx;
	padding: 66rpx 20rpx 20rpx;
	background: #ffffff;
	border-radius: 10rpx;
	box-shadow: 0px 10rpx 44rpx 0rpx rgba(205,205,205,0.45); 
	z-index: 8;
}
.info>text{
	text-align: center;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin-bottom: 20rpx;
	font-size: 32rpx;
	font-weight: 700;
	color: #333333;
}
.info .sign{
	display: flex;
	justify-content: center;
}
.info .sign text{
	background-color: #2390DC;
	color: #FFFFFF;
	font-size: 18rpx;
	margin-right: 16rpx;
	padding: 6rpx 16rpx;
	border-radius: 5rpx;
}
.meMoney{
	margin: 30rpx auto 30rpx;
	width: 650rpx;
	height: 100rpx;
	padding: 20rpx;
	background: #fff;
	border-radius: 10rpx;
	box-shadow: 0rpx 15rpx 10rpx 0rpx rgba(205,205,205,0.45); 
}
.meMoney>text{
	font-size: 24rpx;
	font-weight: 700;
	color: #333333;
	border-bottom: 1rpx solid #E5E5E5;
	padding: 0 0 10rpx;
}
.meMoney>view{
	display: flex;
	justify-content: space-between;
	margin-top: 16rpx;
}
.meMoney>view text{
	width: 260rpx;
	font-size: 32rpx;
	font-weight: 700;
	color: #2390dc;
	letter-spacing: 3rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.meMoney>view button{
	font-size: 24rpx;
	font-weight: 700;
	color: #ffffff;
	line-height: 23rpx;
	background: #2390DC;
	width: 131rpx;
	height: 42rpx;
	line-height: 42rpx;
	background: #2390dc;
	border-radius: 21rpx;
	box-shadow: 0rpx 10rpx 45rpx 0rpx rgba(35,144,220,0.6); 
}
.team>view{
	width: 320rpx;
}
.team>view:first-child{
	border-right: 1rpx dotted #D2D2D2;
}
.team>view text{
	font-size: 24rpx;
	font-weight: 700;
	color: #666666;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	text-align: center;
	
}
.team>view text:first-child{
	font-size: 40rpx;
	font-weight: 700;
	color: #333333;
}
button {
  background-color: #fff;
}
button::after {
  border: none;
}
.modelMoney{
	width: 750rpx;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99;
}
.modelBg{
	width: 750rpx;
	height: 100vh;
	background: #000000;
	opacity: .3;
}	

.contentModel{
	position: fixed;
	z-index: 100;
	top: 25vh;
	left: 49rpx;
	width: 590rpx;
	height: 306rpx;
	padding: 30rpx;
	background: #ffffff;
	border-radius: 8rpx;
}
.contentModel>text{
	font-size: 32rpx;
	font-weight: 500;
	color: #333333;
	text-align: center;
}
.contentModel input{
	width: 566rpx;
	height: 58rpx;
	background: #efefef;
	border: 2rpx solid #efefef;
	border-radius: 10rpx;
	margin: 40rpx auto;
	padding: 3rpx 16rpx;
}
.contentModel>view{
	display: flex;
	justify-content: space-between;
}
.contentModel>view text{
	width: 275rpx;
	height: 80rpx;
	background: #2390dc;
	border-radius: 10rpx;
	color: #fff;
	font-size: 32rpx;
	font-weight: 600;
	text-align: center;
	line-height: 80rpx;
}
.contentModel>view text:last-of-type{
	color: #2390DC;
	border: 2rpx solid #2390DC;
	background: #FFFFFF;
}
.meSpread {
	width: 750rpx;
	padding-bottom: 60rpx;
	background-color: #fafafa;
}
.head {
	width: 690rpx;
	padding: 10rpx 30rpx;
	background: #2390dc;
	height: 140rpx;
/* 	display: flex;
	justify-content: center; */
}
.head image{
	width: 115rpx;
	height: 115rpx;
	border-radius: 115rpx;
	border: 6rpx solid #FFFFFF;
	margin-top: 20rpx;
	z-index: 9;
	box-shadow: 3rpx 3rpx 44rpx 0rpx rgba(202, 202, 202, 0.7);
}
.head .meSpreadHead {
	width: 690rpx;
	height: 290rpx;
	background: #fff;
	box-shadow: 0rpx 1rpx 44rpx 0rpx rgba(202, 202, 202, 0.6);
	border-radius: 10rpx;
	margin-top: 60rpx;
}
.balance {
	text-align: center;
	font-size: 30rpx;
	font-weight: 700;
	color: #737373;
	border-bottom: 1rpx solid #ececec;
	padding: 30rpx 0;
	margin: 0 30rpx;
}
.money {
	font-size: 40rpx;
	font-weight: 700;
	color: #2390dc;
	text-align: center;
	margin: 44rpx 0;
}
.withdraw {
	width: 259rpx;
	height: 70rpx;
	line-height: 70rpx;
	background: #2390dc;
	box-shadow: 0rpx 10rpx 45rpx 0rpx rgba(35, 144, 220, 0.6);
	border-radius: 36rpx;
	font-size: 32rpx;
	font-weight: 700;
	color: #FFFFFF;
	margin: 0 auto;
}
.bottom{
	background: #0066CC;
	width: 630rpx;
	margin: 30rpx;
	padding: 30rpx;
	background: #ffffff;
	border-radius: 10rpx;
	box-shadow: 0px 10rpx 44rpx 0px rgba(205,205,205,0.45); 
}
.invite {
	/* width: 690rpx;
	padding: 10rpx 30rpx; */
	display: flex;
	justify-content: center;
}
.invite > text {
	/* width: 270rpx;
	height: 70rpx; */
	/* text-align: center; */
	font-size: 24rpx;
	font-weight: 700;
	/* line-height: 70rpx; */
	border-radius: 30rpx;
	letter-spacing: 1rpx;
	padding: 8rpx 22rpx;
}
.quickInlet {
	background: #2390dc;
	color: #ffffff;
	margin-right: 30rpx;
}
.faceInlet {
	color: #2390dc;
	border: 1rpx solid #2390dc;
}
.content {
	margin: 26rpx 0;
/* 	width: 690rpx;
	padding: 30rpx 30rpx; */
}
.content text {
	font-size: 20rpx;
	font-weight: 500;
	color: #b8b8b8;
	line-height: 40rpx;
}
.hr {
	width: 750rpx;
	height: 24rpx;
	background: #ececec;
}
.list {
	width: 690rpx;
	padding: 30rpx;
	position: relative;
}
.list .listInlet {
	text-align: center;
	border-bottom: 1rpx solid #ececec;
	font-size: 28rpx;
	font-weight: 700;
	color: #737373;
	padding-bottom: 20rpx;
}
.model {
	width: 690rpx;
	/* background: #000000; */
	background: rgba(255, 255, 255, 0.3);
	color: #2390dc;
	display: flex;
	justify-content: center;
	/* margin-top: -160rpx; */
	height: 150rpx;
	align-items: flex-end;
	font-size: 24rpx;
	z-index: 9;
	position: absolute;
	top: 240rpx;
}

.example {
	padding: 0 30rpx 30rpx;
}

.example-info {
	padding: 30rpx;
	color: #3b4144;
	background: #ffffff;
}

.example-body {
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	padding: 0;
	font-size: 14rpx;
	background-color: #ffffff;
}
.uni-tip-title {
	margin-bottom: 10px;
	text-align: center;
	font-weight: bold;
	font-size: 16px;
	color: #333;
}

.uni-tip-content {
	font-size: 14px;
	color: #666;
}

.uni-tip-group-button {
	display: flex;
	flex-direction: row;
	margin-top: 20px;
}

.uni-tip-button {
	flex: 1;
	text-align: center;
	font-size: 14px;
	color: #3b4144;
}

.modelShow {
	background: #000000;
	width: 750rpx;
	height: 100vh;
	position: fixed;
	z-index: 99;
	top: 0;
	left: 0;
	opacity: 0.4;
	overflow: hidden;
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
	font-size: 14px;
	border-top-color: #f5f5f5;
	border-top-width: 1px;
	border-top-style: solid;
	text-align: center;
	color: #666;
}
.fase {
	width: 400rpx;
	background: #fff;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	padding: 40rpx 20rpx;
}
.fase image {
	width: 252rpx;
	height: 252rpx;
}
.fase text {
	font-size: 32rpx;
	font-weight: 500;
	color: #333;
	margin-top: 16rpx;
}
.meTable{
	/* background: #0066CC; */
}
.meTable .item{
	display: flex;
	justify-content: space-between;
	padding: 18rpx 0;
}
.meTable .item text{
	text-align: center;
	font-size: 24rpx;
	color: #737373;
}
.meTable .item.headTab text{
	font-weight: 700;
}
.meTable .item text:first-child{
	width: 200rpx;
}
.meTable .item text:nth-child(2){
	width: 280rpx;
}
.meTable .item text:nth-child(3){
	width: 280rpx;
}
</style>
