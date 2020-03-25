<template>
	<view class="cashOut">
		<view class="cash">
			<text class="cashMoney">提现金额</text>
			<view class="cashInput">
				<label for="">￥</label>
				<input type="digit" value="" @input="inputValue" placeholder="请输入提现金额" />
			</view>
			<view class="displayCash">
				<view class="item">
					可提现金额<text>￥{{collectionList.user_blance}}</text>
				</view>
				<!-- <view class="item">
					冻结资产<text>￥7561.00</text>
				</view> -->
			</view>
		</view>
		<view class="cash">
			<text class="cashMoney">选择提现账户</text>
			<view>
				<radio-group @change="radioChange" :id="index" style="width: 690rpx;display: flex;">
					<view class="item">
						<label class="radio">
							<radio class="itemRadio" value="0"/>
							<text>微信</text>
						</label>
					</view>
					<view class="item">
						<label class="radio">
							<radio value="1" class="itemRadio" />
							<text>支付宝</text>
						</label>
						<!-- <image src="../static/imgLost.png" mode=""></image> -->
					</view>
				</radio-group>
				<image v-if="types == ''" class="cashImg" src="../static/imgLost.png" mode=""></image>
				<view v-if="types == '0'" @tap="getCard(1)" >
					<image class="cashImg" v-if="imgShow == ''" src="../static/imgLost.png" mode=""></image>
					<image class="cashImg" v-else :src="imgShow" mode=""></image>
				</view>
				<view v-if="types == '1'" @tap="getCard(2)" >
					<image class="cashImg" v-if="imgAlipayShow == ''" src="../static/imgLost.png" mode=""></image>
					<image class="cashImg" v-else :src="imgAlipayShow" mode=""></image>
				</view>
				<text class="tip" v-if="types == '1'">请上传支付宝收款码</text>
				<text class="tip" v-else-if="types == '0'">请上传微信收款码</text>
				<text class="tip" v-else>请选择提现方式</text>
			</view>
			<button type="" class="cashButton" @tap="cashOut">预计3个工作日到账，确认提现</button>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	import helper from '../common/helper.js';
	export default {
		data() {
			return {
				types: '',
				collectionList: {},
				money: '',
				imgNew: '',
				imgShow: '',
				imgAlipay: '',
				imgAlipayShow: '',
				imgList: ''
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			radioChange(e) {
				console.log(e);
				this.types = e.detail.value;
				console.log(this.types)
			},
			getList() {
				uni.request({
					url: `${helper.requestUrl}/promote-rebates`,
					method: 'GET',
					header: {
						authorization: app.globalData.token
					},
					success: res => {
						// uni.hideLoading();
						res = helper.null2str(res);
						console.log(res, '++++');
						if (res.data.status_code == 200) {
							this.collectionList = res.data;
						} else {

						}
					}
				});
			},
			inputValue(e){
				console.log(e,'999')
				this.money = e.detail.value
			},
			getCard(e){
				console.log(e)
				let type = e
				this.getImg(type)
			},
			//上传图片
			getImg(op){
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'],
					success: res => {
						uni.showToast({
							title: '图片上传中',
							icon: 'loading'
						});
						Promise.all(
							res.tempFiles.map(item => {
								return new Promise((resolve, reject) => {
									uni.uploadFile({
										url: `${helper.requestUrl}/posts/uploads`,
										filePath: item.path,
										name: 'file',
										header: {
											authorization: app.globalData.token
										},
										success: res => {
											console.log(res)
											resolve({
												path: JSON.parse(res.data).data
											});
										}
									});
								});
							})
						).then(e => {
							uni.hideToast();
							console.log(e[0].path.path,'++++++++++')
							if(op == '1'){
								this.imgNew = e[0].path.nositepath
								this.imgShow =e[0].path.path
							}else if(op == '2'){
								this.imgAlipay = e[0].path.nositepath
								this.imgAlipayShow =e[0].path.path
							}
							
						}).catch(err => console.log(err));
					}
				});
			},
			cashOut() {
				if(this.types == '0'){
					this.imgList = this.imgNew
				}else if(this.types == '1'){
					this.imgList = this.imgAlipay
				}
				if (this.money == '') {
					uni.showToast({
						title: '请输入提现金额',
						icon: 'none'
					})
					return false
				}
				if (this.money > this.collectionList.user_blance && this.money > '0') {
					uni.showToast({
						title: '提现金额不能大于余额且低于0',
						icon: 'none'
					})
					return false
				}
				if (this.types == '') {
					uni.showToast({
						title: '请选择提现方式',
						icon: 'none'
					})
					return false
				}
				if (this.imgList == '') {
					uni.showToast({
						title: '请上传收款码',
						icon: 'none'
					})
					return false
				}
				uni.request({
					url: `${helper.requestUrl}/user/cash-withdrawals-apply`,
					method: 'POST',
					header: {
						authorization: app.globalData.token
					},
					data:{
						money: this.money,
						types: this.types,
						urlimages: this.imgList
					},
					success: res => {
						// uni.hideLoading();
						res = helper.null2str(res);
						console.log(res);
						if (res.statusCode == 200) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
							// this.getList();
							setTimeout( e =>{
								uni.navigateBack({
									delta: 1
								})
							},2000)
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
						}
					}
				});
			},
			
		}
	}
</script>

<style>
	.cashOut {
		width: 690rpx;
		padding: 30rpx;
	}

	.cash {
		width: 638rpx;
		padding: 26rpx;
		margin-bottom: 30rpx;
		/* height: 214rpx; */
		background: #ffffff;
		border: 1rpx solid #ffffff;
		box-shadow: 0rpx 10rpx 35rpx 0rpx rgba(228, 228, 228, 0.4);
		border-radius: 14rpx;
	}

	.cash .cashMoney {
		font-size: 24rpx;
		font-weight: 700;
		color: #333333;
	}

	.cash .cashInput {
		width: 638rpx;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #D2D2D2;
		margin: 10rpx 0 18rpx;
		height: 70rpx;
	}

	.cash .cashInput label {
		font-size: 32rpx;
		font-weight: 700;
		color: #666666;
		margin-right: 10rpx;
	}

	.cash .cashInput input {
		font-size: 24rpx;
		font-weight: 500;
		color: #999;
	}

	.cash .displayCash {
		display: flex;
		align-content: center;
	}

	.cash .displayCash .item {
		display: flex;
		align-content: center;
		margin-right: 20rpx;
		font-size: 20rpx;
		font-weight: 500;
		color: #999999;
	}

	.cash .displayCash .item text {
		color: #2390DC;
	}

	.radio {
		display: flex;
		align-items: center;
		margin-right: 18rpx;
	}

	.radio text {
		font-size: 24rpx;
		font-weight: 700;
		color: #666666;
	}

	.itemRadio {
		transform: scale(.7);
	}

	.cashImg {
		width: 147rpx;
		height: 147rpx;
		background: #eeeeee;
		border-radius: 14rpx;
		overflow: hidden;
		margin: 10rpx 0;
	}

	.tip {
		font-size: 20rpx;
		font-weight: 500;
		color: #999999;
	}

	.cashButton {
		position: fixed;
		bottom: 60rpx;
		width: 640rpx;
		background: #2390dc;
		box-shadow: 0rpx 10rpx 45rpx 0rpx rgba(35, 144, 220, 0.6);
		font-size: 32rpx;
		font-weight: 700;
		color: #ffffff;
		border: none;
		border-radius: 60rpx;
		padding: 4rpx 0;
	}
</style>
