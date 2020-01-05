<template>
	<view class="meSpread">
		<view class="head">
			<view class="meSpreadHead">
				<text class="balance">总余额</text>
				<text class="money">￥{{ collectionList.member.user_blance }}</text>
				<button class="withdraw" type="">提现</button>
			</view>
		</view>
		<view class="invite">
			<text class="quickInlet" @tap="quickInlet(1)">立即邀请</text>
			<text class="faceInlet" @tap="quickInlet(2)">面对面邀请</text>
		</view>
		<view class="content">
			<text>1、分享邀请链接给您的好友，用户下载安装app您将获得3现金奖励；</text>
			<text>2、邀请奖励将在好友领取时（访问此页面）发放；</text>
			<text>3、邀请奖励：用户开通一年会员，您将获得80元现金奖励；用户开通永久会员，您将获得120元先将奖励；（限会员才有推广权限）</text>
			<text>4、邀请好友获得现金奖励，满50元均可联系官方客服申请提现；</text>
			<text>5、一个硬件设备均视为同一用户，邀请链接仅对新注册用户有效；</text>
			<text>6、如发现任何违规作弊行为将视为情节严重程度进行判断：不予发放奖励封停冻结账号；</text>
			<text>7、如有其它的疑问请咨询嘉合论坛官方客服QQ:1771343694;</text>
		</view>
		<view class="hr"></view>
		<view class="list">
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
			<!-- 	<view class="item head">
					<block v-for="(item,index) in tableData" :key="index">
						<text>{{item.title}}</text>
					</block>
				</view> -->
			</view>
			<!-- <wTable :columns="columns" :data="tableData" @on-row-click="clickrow" border @on-select-all="selectAll" @on-select="selectO" /> -->
			<view class="model" @tap="goMore" v-show="isShow">
				更多用户
				<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
			</view>
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
					<!-- #ifdef APP-PLUS -->
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
		<!-- 面对面邀请 -->
		<uni-popup ref="center" type="center" class="meShare" @touchmove.stop.prevent>
			<view class="fase">
				<image :src="collectionList.face" mode=""></image>
				<text>邀请领现金</text>
			</view>
		</uni-popup>
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
		};
	},
	components: {
		// wTable,
		uniPopup
	},
	onLoad() {
		this.content();
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
	methods: {
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
			if (e == 1) {
				this.$refs.showshare.open();
			} else if (e == 2) {
				this.$refs.center.open();
			}
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
		goShare(WXSenceType) {
			// 获取页面路径
			let url = this.getPageUrl()
			uni.share({
				provider: 'weixin',
				scene: WXSenceType,
				type: 0,
				href: url,
				title: this.articleDetail.title,
				summary: '',
				imageUrl: '',
				success: function(res) {
					console.log('success:' + JSON.stringify(res));
				},
				fail: function(err) {
					console.log('fail:' + JSON.stringify(err));
				}
			});
		},
		// goShare(e) {
		// 	console.log(e)
		// 	let sceneType = ''
		// 	if(e == '微信好友'){
		// 		sceneType = 'WXSceneSession'
		// 	} else if(e == '微信好友'){
		// 		sceneType = 'WXSenceTimeline'
		// 	}
		// 	uni.share({
		// 		provider: 'weixin',
		// 		scene: sceneType,
		// 		type: 1,
		// 		summary: this.collectionList.share_link,
		// 		success: function(res) {
		// 			console.log('success:' + JSON.stringify(res));
		// 		},
		// 		fail: function(err) {
		// 			console.log('fail:' + JSON.stringify(err));
		// 		}
		// 	});
		// }
	}
};
</script>

<style>

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
button {
  background-color: #fff;
}
button::after {
  border: none;
}
	
	
	
.meSpread {
	width: 750rpx;
	padding-bottom: 60rpx;
}
.head {
	width: 690rpx;
	padding: 10rpx 30rpx;
	background: #2390dc;
	height: 184rpx;
	margin-bottom: 220rpx;
}
.head .meSpreadHead {
	width: 690rpx;
	height: 290rpx;
	background: #fff;
	box-shadow: 0px 1px 26px 0px rgba(202, 202, 202, 0.6);
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
}
.invite {
	width: 690rpx;
	padding: 10rpx 30rpx;
	display: flex;
	justify-content: center;
}
.invite > text {
	width: 270rpx;
	height: 70rpx;
	text-align: center;
	font-size: 32rpx;
	font-weight: 700;
	line-height: 70rpx;
	border-radius: 10rpx;
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
	width: 690rpx;
	padding: 30rpx 30rpx;
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
