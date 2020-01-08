<template>
	<view>
		<textarea @input="onInput" placeholder="请输入修改信息"></textarea>
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
			if (this.setData == '') {
				uni.showToast({
					title: '提交值不能为空',
					icon: 'none'
				});
				return false;
			}
			if (this.options.type == 'number') {
				var patrn = /(^[1-9]\d*$)/;
				if (!patrn.test(this.setData)) {
					uni.showToast({
						title: '请输入正整数',
						icon: 'none'
					});
					return ''
				}
			} else if (this.options.type == 'mail') {
				let myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				if(!myreg.test(this.setData)) {
					uni.showToast({
						title: '请输入正确的邮箱',
						icon: 'none'
					});
				  return false;
				}
			}
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
