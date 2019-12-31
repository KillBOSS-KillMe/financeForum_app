<template>
	<view>
		<textarea @input="onInput"></textarea>
		<view class="submit">
			<view @tap="submit">确定</view>
		</view>
	</view>
</template>

<script>
const app = getApp();
import helper from '../common/helper.js';
import pickerAddress from '../components/wangding-pickerAddress.vue';
export default {
	data() {
		return {
			setData: ''
		};
	},
	components: {
		pickerAddress
	},
	onLoad(options) {
		this.options = options
		uni.setNavigationBarTitle({
			title: options.title
		})
	},
	methods: {
		//获取input数据
		onInput(e) {
			this.setData = e.detail.value
		},
		submit() {
			uni.showLoading({
			  title: '提交中...',
				duration: 1000000
			});
			uni.request({
				url: `${helper.requestUrl}/user/edit`,
				method: 'POST',
				header: {
					authorization: app.globalData.token
				},
				data: {
					field: this.options.name,
					value: this.setData
				},
				// data: this.setData,
				success: res => {
					uni.hideLoading();
					res = helper.null2str(res)
					console.log(res)
					if (res.data.status_code == '1') {
						uni.showToast({
							title: res.data.message
						});
						setTimeout(() => {
							uni.navigateBack({ data: -1 });
						}, 2000)
					} else {
						uni.showToast({
							title: res.data.message
						});
					}
			
				}
			})
		}
	}
};
</script>

<style>
	textarea{
		width: 630rpx;
		padding: 30rpx;
		height: 300rpx;
		margin: 29rpx;
		font-size: 28rpx;
		box-shadow: #999 1rpx 1rpx 10rpx 5rpx;
	}
	.submit{
		width: 750rpx;
		height: auto;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.submit view{
		width: 400rpx;
		height: 100rpx;
		font-size: 30rpx;
		font-weight: 600;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #2390DC;
	}
</style>
