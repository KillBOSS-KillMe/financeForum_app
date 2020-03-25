<template>
	<view class="commissionSet">
		<view class="head"></view>
		<view class="headContent">
			<view class="item">
				<text class="itemTitle">当前奖励比例</text>
				<view class="itemInput">
					<input type="number" :value="list.team_relate_1" @input="getSetData" data-name="team_relate_1" placeholder="请输入奖励比例" />
					<label>%</label>
				</view>
			</view>
			<view class="item">
				<text class="itemTitle">下级奖励比例</text>
				<view class="itemInput">
					<input type="number" :value="list.team_relate_2" @input="getSetData" data-name="team_relate_2" placeholder="请输入奖励比例" />
					<label>%</label>
				</view>
			</view>
		</view>
		<button type="" class="determine" @tap="determine">确认</button>
	</view>
</template>

<script>
	const app = getApp()
	import helper from '../common/helper.js';
	export default {
		data() {
			return {
				list: {
					team_relate_1: '',
					team_relate_2: '',
					post_type: 'post'
				}
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {

			getList() {
				uni.request({
					url: `${helper.requestUrl}/promote-setting`,
					method: 'GET',
					header: {
						authorization: app.globalData.token
					},
					success: res => {
						// uni.hideLoading();
						res = helper.null2str(res);
						this.list.team_relate_1 = res.data.team_relate_1
						this.list.team_relate_2 = res.data.team_relate_2
						console.log(res.data, '**');
					}
				})
			},
			getSetData(e) {
				console.log(e)
				let formNode = this.list
				let name = e.currentTarget.dataset.name
				let value = e.detail.value
				formNode[name] = value
				this.list = formNode
			},
			determine() {
				let add = parseFloat(this.list.team_relate_1) + parseFloat(this.list.team_relate_2)
				console.log(add)
				if (this.list.team_relate_1 == '') {
					uni.showToast({
						title: '请输入奖励比例',
						icon: 'none'
					})
					return false
				}
				if (!(/(^[0-9]\d*$)/.test(this.list.team_relate_1))) {
					uni.showToast({
						title: '请输入整数',
						icon: 'none'
					})
					return false
				}
				// if (this.list.team_relate_1 + this.list.team_relate_2) {
				// 	uni.showToast({
				// 		title: '请输入奖励比例0-100',
				// 		icon: 'none'
				// 	})
				// 	return false
				// }
				if (this.list.team_relate_2 == '') {
					uni.showToast({
						title: '请输入奖励比例',
						icon: 'none'
					})
					return false
				}
				if (!(/(^[0-9]\d*$)/.test(this.list.team_relate_2))) {
					uni.showToast({
						title: '请输入整数',
						icon: 'none'
					})
					return false
				}
				if (add != 100) {
					uni.showToast({
						title: '请输入奖励比例100',
						icon: 'none'
					})
					return false
				}
				uni.request({
					url: `${helper.requestUrl}/promote-setting`,
					method: 'POST',
					header: {
						authorization: app.globalData.token
					},
					data: this.list,
					success: res => {
						// uni.hideLoading();
						res = helper.null2str(res);
						uni.showToast({
							title: res.data.tip_msg,
							icon: "none"
						});
						setTimeout( e =>{
							uni.navigateBack({
								delta: 1
							})
						},2000)
					}
				})
			}
		}
	}
</script>

<style>
	.commissionSet {
		width: 750rpx;
	}

	.head {
		width: 750rpx;
		height: 140rpx;
		background: #2390DC;
	}

	.headContent {
		width: 642rpx;
		margin: -90rpx 30rpx 30rpx;
		padding: 24rpx;
		height: 258rpx;
		background: #ffffff;
		border-radius: 10rpx;
		box-shadow: 0rpx 10rpx 44rpx 0rpx rgba(192, 192, 192, 0.45);
	}

	.itemTitle {
		font-size: 26rpx;
		font-weight: 700;
		color: #666666;
	}

	.itemInput {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 18rpx 0;
		/* 	width: 600rpx;
		height: 26rpx;
		background: #f4f4f4;
		border: 1rpx solid #ffffff;
		border-radius: 23rpx;
		padding: 10rpx 20rpx;
		overflow: hidden; */
	}

	.itemInput input {
		width: 546rpx;
		background: #f4f4f4;
		border: 1rpx solid #ffffff;
		border-radius: 26rpx;
		padding: 10rpx 30rpx;
		overflow: hidden;
		font-size: 24rpx;
		color: #999;
	}

	.itemInput label {
		font-size: 20rpx;
		font-weight: 700;
		color: #666666;
		vertical-align: middle;
	}

	.determine {
		width: 650rpx;
		background: #2390dc;
		border: none;
		position: fixed;
		bottom: 60rpx;
		left: 50rpx;
		box-shadow: 0rpx 10rpx 45rpx 0rpx rgba(35, 144, 220, 0.6);
		border-radius: 60rpx;
		font-size: 32rpx;
		font-weight: 700;
		color: #ffffff;
	}
</style>
