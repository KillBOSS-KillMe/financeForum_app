<template>
	<view class="meSpread">
		<view class="head">
			<view class="meSpreadHead">
				<text class="balance">总余额</text>
				<text class="money">￥13254</text>
				<button class="withdraw" type="primary">提现</button>
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
			<wTable :columns="columns" :data="tableData" @on-row-click="clickrow" border @on-select-all="selectAll" @on-select="selectO" />
			<view class="model">更多用户<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon></view>
		</view>
		<!-- 底部分享弹窗 立即邀请 -->
		<uni-popup ref="showshare" type="bottom" class="meShare" @touchmove.stop.prevent>
			<view class="uni-share">
				<text class="uni-share-title">分享到</text>
				<view class="uni-share-content">
					<view v-for="(item, index) in bottomData" :key="index" class="uni-share-content-box">
						<view class="uni-share-content-image">
							<image :src="item.icon" class="content-image" mode="widthFix" />
						</view>
						<text class="uni-share-content-text">{{ item.text }}</text>
					</view>
				</view>
				<text class="uni-share-btn" @click="cancel('share')">取消分享</text>
			</view>
		</uni-popup>
		<!-- 面对面邀请 -->
		<uni-popup ref="center" type="center" class="meShare" @touchmove.stop.prevent>
			<view class="fase">
				<image src="../static/logo.png" mode=""></image>
				<text>邀请领现金</text>
			</view>
			<!-- <view class="uni-share">
				<view class="uni-share-content">
					<view v-for="(item, index) in bottomData" :key="index" class="uni-share-content-box">
						<view class="uni-share-content-image">
							<image :src="item.icon" class="content-image" mode="widthFix" />
						</view>
						<text class="uni-share-content-text">{{ item.text }}</text>
					</view>
				</view>
			</view> -->
		</uni-popup>
	</view>
</template>

<script>
import wTable from '@/components/wTable.vue';
import uniPopup from "@/components/uni-popup.vue"
export default {
	data() {
		return {
			tableData: [
				{ name:'大锤',age:'17777777777',address:'2019-10-25'},
				{ name:'张三',age:'21',address:'成都'},
				{ name:'李四',age:'16',address:'南京' }
			],
			columns: [
				{ title: '用户名', key: 'name' },
				{ title: '手机号', key: 'age' },
				{ title: '时间', key: 'address' }
			],
			bottomData: [{
					text: '微信',
					icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-2.png',
					name: 'wx'
				},
				{
					text: '支付宝',
					icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-8.png',
					name: 'wx'
				},
				{
					text: 'QQ',
					icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/gird-3.png',
					name: 'qq'
				},
				{
					text: '新浪',
					icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-1.png',
					name: 'sina'
				},
				{
					text: '百度',
					icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-7.png',
					name: 'copy'
				},
				{
					text: '其他',
					icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-5.png',
					name: 'more'
				}
			]
		}
	},
	components: {
		wTable ,
		uniPopup,
	},
	methods: {
		quickInlet(e){
			if(e == 1){
				this.$refs.showshare.open()
			} else if(e == 2){
				this.$refs.center.open()
			}
			console.log(e)
		},
		cancel(type) {
			this.$refs['show' + type].close()
		},
	}
};
</script>

<style>
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
.model{
	width: 690rpx;
	/* background: #000000; */
	background: rgba(255,255,255,.3);
	color: #2390DC;
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

	.modelShow{
		background: #000000;
		width: 750rpx;
		height: 100vh;
		position: fixed;
		z-index: 99;
		top: 0;
		left: 0;
		opacity: .4;
		overflow: hidden;
	}
	.meShare{
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
		width: 60rpx;
		height: 60rpx;
		overflow: hidden;
		border-radius: 10rpx;
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
	.fase{
		width: 400rpx;
		background: #fff;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		padding: 40rpx 20rpx;
	}
	.fase image{
		width: 252rpx;
		height: 252rpx;
	}
	.fase text{
		font-size: 32rpx;
		font-weight: 500;
		color: #333;
		margin-top: 16rpx;
	}
</style>
