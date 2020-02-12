<template>
	<view class="meSpread">
		<!-- <view class="head">
			<image :src="imgUrl+collectionList.member.avatar" v-if="collectionList.member.avatar != ''" mode="" ></image>
			<image v-else src="../static/user.png" mode=""></image>
		</view>
		<view class="info">
			<text>{{collectionList.member.name}}</text>
			<view class="sign">
				<text v-if="collectionList.member.type == 'normal'">{{item.deploy.userlevel.level_name}}</text>
				<text style="background-color: #C6A25D;" v-if="collectionList.member.type == 'member'">{{item.deploy.vipuserlevel.level_name}}</text> -->
			<!-- 	<text v-if="collectionList.member.invitees_level == 0">团队长</text>
				<text v-else>团员</text>
			</view>
		</view> --> 
		<view class="bg"></view>
		<view class="user">
			<view class="left">
				<view>
					<image :src="imgUrl+collectionList.member.avatar" v-if="collectionList.member.avatar != ''" mode="" ></image>
					<image v-else src="../static/user.png" mode=""></image>
				</view>
				<view class="userInfo">
					<text class="name">{{collectionList.member.name}}</text>
					<view class="tip">
						<view class="">
							<text v-if="collectionList.member.type == 'normal'">{{collectionList.member.deploy.userlevel.level_name}}</text>
							<text style="background-color: #C6A25D;" v-if="collectionList.member.type == 'member'">{{collectionList.member.deploy.vipuserlevel.level_name}}</text>
						  <text v-else style="display: none;"></text>
						</view>
						<view class="">
							<text v-if="collectionList.member.invitees_level == 0">团队长</text>
							<text v-else>团员</text>
						</view>
					</view>
				</view>
			</view>
			<text class="right" @tap="cashSet">返佣设置</text>
		</view>
		<view class="meMoney">
			<text>我的余额</text>
			<view>
				<text>￥{{collectionList.user_blance}}</text>
				<button type="" hover-class="none" @tap="withdraw">提现</button>
			</view>
		</view>
		<view class="team">
			<view @tap="goTeam(1)">
				<text>{{collectionList.invitees_count}}</text>
				<text>团队个数(个)</text>
			</view>
			<view @tap="goTeam(2)">
				<text>{{collectionList.people_sum}}</text>
				<text>团队总人数</text>
			</view>
		</view>
		<view class="bottom">
			<view class="invite">
				<!-- <text class="quickInlet" @tap="quickInlet(1)">立即邀请</text>
				<text class="faceInlet" @tap="quickInlet(2)">面对面邀请</text> -->
				<text class="quickInlet" @tap="quickInlet(1)">立即获取推广二维码</text>
				<text class="faceInlet" @tap="quickInlet(2)">查看我的推广二维码</text>
			</view>
			<view class="content">
				<text>1、分享邀请链接给您的好友，用户下载安装app您将获得3现金奖励；</text>
				<text>2、邀请奖励将在好友领取时（访问此页面）发放；</text>
				<text>3、邀请奖励：用户开通一年会员，您将获得80元现金奖励；用户开通永久会员，您将获得120元先将奖励；（限会员才有推广权限）</text>
				<text>4、邀请好友获得现金奖励，满50元均可联系官方客服申请提现；</text>
				<text>5、一个硬件设备均视为同一用户，邀请链接仅对新注册用户有效；</text>
				<text>6、如发现任何违规作弊行为将视为情节严重程度进行判断：不予发放奖励封停冻结账号；</text>
				<text>7、如有其它的疑问请咨询子诺论坛官方客服Tel:18535464004;</text>
			</view>
		</view>
		
		<!-- <view class="hr"></view> -->
	<!-- 	<view class="list">
			<text class="listInlet">我的邀请</text>
			<view class="meTable">
				<view class="item headTab">
					<block v-for="(item,index) in columns" :key="index">
						<text>{{item.title}}</text>
					</block>
				</view>
				<block v-for="(item,index) in collectionList.member.invitees" :key="index">
					<view class="item">
						<text>{{item.user.name}}</text>
						<text>{{item.user.mobile}}</text>
						<text>{{item.created_at}}</text>
					</view>
				</block>
			</view>
			<view class="model" @tap="goMore" v-show="isShow">
				更多用户
				<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
			</view>
		</view> -->
		<!-- 底部分享弹窗 立即邀请 -->
<!-- 		<uni-popup ref="showshare" type="bottom" class="meShare" @touchmove.stop.prevent>
			<view class="uni-share">
				<text class="uni-share-title">分享到</text>
				<view class="uni-share-content">
					 #ifdef MP-WEIXIN -->
				<!-- 		<button class="share-btn" open-type="share">
							<view class="uni-share-content-box">
								<view class="uni-share-content-image">
									<uni-icon type="" class="iconfont iconweixin"></uni-icon>
								</view>
								<text class="uni-share-content-text">微信好友</text>
							</view>
					 #endif -->
					<!-- #ifdef APP-PLUS || H5
						<block v-for="(item, index) in bottomData" :key="index">
							<view class="uni-share-content-box" @tap="goShare(item.type)">
								<view class="uni-share-content-image">
									<uni-icon type="" class="iconfont" :class="item.icon"></uni-icon>
								</view>
								<text class="uni-share-content-text">{{ item.text }}</text>
							</view>
						</block>
					 #endif -->
			<!-- 	</view>
				<text class="uni-share-btn" @click="cancel('share')">取消分享</text>
			</view>
		</uni-popup> -->
		<!-- 面对面邀请 -->
		<!-- <uni-popup ref="center" type="center" class="meShare" @touchmove.stop.prevent>
			<view class="fase">
				<image :src="collectionList.face" mode=""></image>
				<text>邀请领现金</text>
			</view>
		</uni-popup>
		<view class="modelMoney" v-if="cancelShow == false" @touchmove.stop.prevent>
			<view class="modelBg"></view>
			<view class="contentModel">
				<text>请输入提现金额</text>
				<input type="number" value="" placeholder="请输入提现金额" @input="getInput"/>
				<view>
					<text @tap="cancelModel(1)">确认提现</text>
					<text @tap="cancelModel(2)">取消提现</text>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
const app = getApp();
import helper from '../common/helper.js';
import uniPopup from '@/components/uni-popup.vue';
export default {
	data() {
		return {
			tableData: [
				{ name: '大锤', age: '17777777777', address: '2019-10-25' }, 
				{ name: '张三', age: '21', address: '成都' }, 
				{ name: '李四', age: '16', address: '南京' },
			],
			columns: [
				{ title: '用户名', key: 'name' }, 
				{ title: '手机号', key: 'age' }, 
				{ title: '时间', key: 'address' },
			],
			bottomData: [
				{
					text: '微信好友',
					type: 'WXSceneSession',
					icon: 'iconweixin'
				},
				{
					text: '微信朋友圈',
					type: 'WXSenceTimeline',
					icon: 'iconpengyouquan'
				}
			],
			collectionList: {},
			imgUrl: '',
			isShow: true,
			cancelShow: true,
			inputValue: ''
		};
	},
	components: {
		// wTable,
		uniPopup
	},
	onShow() {
		this.content();
	},
	onLoad() {
		this.imgUrl = helper.imgUrl;
	},
	// 微信分享
	onShareAppMessage() {
		let url = this.getPageUrl()
		return {
			title: this.articleDetail.title,
			path: url
		}
	},
	// shareFriend() {
	// 	//分享到微信朋友
	// 	this.goShare('WXSceneSession');
	// },
	// shareFriendcricle() {
	// 	//分享到微信朋友圈
	// 	this.goShare('WXSenceTimeline');
	// },
	methods: {
		withdraw(){
			uni.navigateTo({
				url: `/pages/cashOut`
			})
			// this.cancelShow = false
		},
		// cancelModel(e){
		// 	console.log(e,'888')
		// 	if(e == '2'){
		// 		this.cancelShow = true
		// 	}else if(e == "1"){
		// 		this.getWithdraw()
		// 	}
		// },
		// getWithdraw(){
		// 	if(this.inputValue == ''){
		// 		uni.showToast({
		// 			title: '请输入提现金额',
		// 			icon: 'none'
		// 		})
		// 	}
		// 	if(this.inputValue > this.collectionList.user_blance){
		// 		uni.showToast({
		// 			title: '输入提现金额不能大于余额',
		// 			icon: 'none'
		// 		})
		// 	}
		// 	uni.request({
		// 		url: `${helper.requestUrl}/user/cash-withdrawals-apply`,
		// 		method: 'POST',
		// 		header: {
		// 			authorization: app.globalData.token
		// 		},
		// 		data:{
		// 			money: this.inputValue
		// 		},
		// 		success: res => {
		// 			// uni.hideLoading();
		// 			res = helper.null2str(res);
		// 			console.log(res);
		// 			if (res.data.status_code == 200) {
		// 				this.cancelShow = true
		// 				uni.showToast({
		// 					title: '提现成功',
		// 					icon: 'success'
		// 				})
		// 				this.content();
		// 				// setTimeout(() => {
							
		// 				// }, 1000)
		// 			} else {
		// 				// uni.showToast({
		// 				// 	title: res.data.message
		// 				// });
		// 			}
		// 		}
		// 	});
		// },
		// getInput(e){
		// 	console.log(e,'999')
		// 	this.inputValue = e.detail.value
		// },
		goMore(){
			this.isShow = false
		},
		// 获取当前页路径及参数,用于分享
		getPageUrl() {
			// pages/articleDetail?id=5&name=222&aaa=2344asfdasdf
			// let options = {id: '5', name: '222', aaa: '2344asfdasdf'}
			let pageNode = getCurrentPages()
			pageNode = pageNode[pageNode.length - 1]
			let url = pageNode.route
			let options = pageNode.options
			let optionsString = '?'
			for( let key in options ){
					optionsString += key
					optionsString += '='
					optionsString += options[key]
					optionsString += '&'
			}
			optionsString = optionsString.substring(0, optionsString.length - 1)
			url += optionsString
			return url
		},
		quickInlet(e) {
			uni.navigateTo({
				url: `/pages/shareCode?type=${e}`
			})
			// if (e == 1) {
			// 	this.$refs.showshare.open();
			// } else if (e == 2) {
			// 	this.$refs.center.open();
			// }
			// console.log(e);
		},
		cancel(type) {
			this.$refs['show' + type].close();
		},
		content() {
			uni.request({
				url: `${helper.requestUrl}/promote-rebates`,
				method: 'GET',
				header: {
					authorization: app.globalData.token
				},
				success: res => {
					// uni.hideLoading();
					res = helper.null2str(res);
					// console.log(res);
					if (res.data.status_code == 200) {
						this.collectionList = res.data;
					} else {
						// uni.showToast({
						// 	title: res.data.message
						// });
					}
				}
			});
		},
		// goShare(WXSenceType) {
		// 	// 获取页面路径
		// 	console.log(this.collectionList,'**')
		// 	uni.showToast({
		// 		title: this.collectionList.share_link,
		// 				icon: 'none',
		// 				duration: 300000000
		// 	});
		// 	return false
		// 	// let url = this.getPageUrl()
		// 	console.log(url)
		// 	uni.share({
		// 		provider: 'weixin',
		// 		scene: WXSenceType,
		// 		type: 0,
		// 		href: url,
		// 		title: '新微金论坛',
		// 		summary: this.collectionList.share_link,
		// 		imageUrl: '',
		// 		success: function(res) {
		// 			console.log('success:' + JSON.stringify(res));
		// 		},
		// 		fail: function(err) {
		// 			console.log('fail:' + JSON.stringify(err));
		// 		},
		// 	});
		// },
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
		// 团队列表
		goTeam(e){
			// console.log(e)
			// let name = ''
			// if(e == 1){
			// 	name = '团队长列表'
			// }else{
			// 	name = '团队列表'
			// }
			// uni.navigateTo({
			// 	url: `/pages/meTeamList?name=${name}`
			// })
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
