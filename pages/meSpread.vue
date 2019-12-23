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
			<text class="quickInlet">立即邀请</text>
			<text class="faceInlet">面对面邀请</text>
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
	</view>
</template>

<script>
import wTable from '@/components/wTable.vue';
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
			]
		};
	},
	components: { wTable },
	methods: {
		
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
</style>
