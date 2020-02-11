<template>
	<view class="cashOut">
		<view class="cash">
			<text class="cashMoney">提现金额</text>
			<view class="cashInput">
				<label for="">￥</label>
				<input type="number" value="" placeholder="请输入提现金额"/>
			</view>
			<view class="displayCash">
				<view class="item">
					可提现金额<text>￥7561.00</text>
				</view>
				<view class="item">
					冻结资产<text>￥7561.00</text>
				</view>
			</view>
		</view>
		<view class="cash">
			<text class="cashMoney">选择提现账户</text>
			<view>
				<radio-group @change="radioChange" :id="index" style="width: 690rpx;display: flex;">
					<view class="item">
						<label class="radio">
							<radio class="itemRadio" value="wechat" checked="true" />
							<text>微信</text>
						</label>
					</view>
					<view class="item">
						<label class="radio">
							<radio value="aliply" class="itemRadio"/>
							<text>支付宝</text>
						</label>
						<!-- <image src="../static/imgLost.png" mode=""></image> -->
					</view>
				</radio-group>
				<image class="cashImg" src="../static/imgLost.png" mode=""></image>
				<text class="tip" v-if="payType == 'aliply'">请上传支付宝收款码</text>
				<text class="tip" v-else>请上传微信收款码</text>
			</view>
			<button type="" class="cashButton">预计3个工作日到账，确认体现</button>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	import helper from '../common/helper.js';
	export default {
		data() {
			return {
				payType: 'wechat'
			}
		},
		methods: {
			radioChange(e) {
				console.log(e);
				this.payType = e.detail.value;
				console.log(this.payType)
			},
		}
	}
</script>

<style>
	.cashOut{
		width: 690rpx;
		padding: 30rpx;
	}
	.cash{
		width: 638rpx;
		padding: 26rpx;
		margin-bottom: 30rpx;
		/* height: 214rpx; */
		background: #ffffff;
		border: 1rpx solid #ffffff;
		box-shadow: 0rpx 10rpx 35rpx 0rpx rgba(228,228,228,0.4); 
		border-radius: 14rpx;
	}
	.cash .cashMoney{
		font-size: 24rpx;
		font-weight: 700;
		color: #333333;
	}
	.cash .cashInput{
		width: 638rpx;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #D2D2D2;
		margin: 10rpx 0 18rpx;
		height: 70rpx;
	}
	.cash .cashInput label{
		font-size: 32rpx;
		font-weight: 700;
		color: #666666;
		margin-right: 10rpx;
	}
	.cash .cashInput input{
		font-size: 24rpx;
		font-weight: 500;
		color: #999;
	}
	.cash .displayCash{
		display: flex;
		align-content: center;
	}
	.cash .displayCash .item{		display: flex;
		align-content: center;
		margin-right: 20rpx;
		font-size: 20rpx;
		font-weight: 500;
		color: #999999;
	}
	.cash .displayCash .item text{
		color: #2390DC;
	}
	.radio{
		display: flex;
		align-items: center;
		margin-right: 18rpx;
	}
	.radio text{
		font-size: 24rpx;
		font-weight: 700;
		color: #666666;
	}
	.itemRadio{
		transform: scale(.7);
	}
	.cashImg{
		width: 147rpx;
		height: 147rpx;
		background: #eeeeee;
		border-radius: 14rpx;
		overflow: hidden;
		margin: 10rpx 0;
	}
	.tip{
		font-size: 20rpx;
		font-weight: 500;
		color: #999999;
	}
	.cashButton{
		position: fixed;
		bottom: 60rpx;
		width: 640rpx;
		background: #2390dc;
		box-shadow: 0rpx 10rpx 45rpx 0rpx rgba(35,144,220,0.6); 
		font-size: 32rpx;
		font-weight: 700;
		color: #ffffff;
		border: none;
		border-radius: 60rpx;
		padding: 4rpx 0;
	}
</style>
