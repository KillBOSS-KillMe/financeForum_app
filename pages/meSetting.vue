<template>
	<view class="meSetting">
		<view class="item" @tap="modifyPassword">
			<view class="left"><text>修改密码</text></view>
			<view><uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon></view>
		</view>
		<view class="item" @tap="delCaching">
			<view class="left"><text>清除缓存</text></view>
			<view>
				<text>{{ num }}M</text>
				<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
			</view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view class="item" @tap="getNew">
			<view class="left"><text>关于</text></view>
			<view>
				<text>V{{ version }}</text>
				<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
			</view>
		</view>
		<!-- #endif -->
		<view class="login" @tap="outLogin"><view>退出登录</view></view>
	</view>
</template>

<script>
const app = getApp();
import helper from '../common/helper.js';
export default {
	data() {
		return {
			num: '0',
			version: '',
			imgUrl: '',
			type: '',
			token: ''
		};
	},
	onLoad() {
		this.token = uni.getStorageSync('token')
		this.imgUrl = helper.imgUrl
		const loginName = uni.getStorageSync('login_name');
		// console.log(loginName)
		const loginPwd = uni.getStorageSync('login_pwd');
		// #ifdef APP-PLUS
		plus.runtime.getProperty(plus.runtime.appid, wgtinfo => {
			console.log(wgtinfo,'99');
			// console.log(wgtinfo.version);   //版本号
			this.version = wgtinfo.version;
		});
		// #endif
	},
	onShow() {
		switch(uni.getSystemInfoSync().platform){
	    case 'android':
				 this.type = 1
	       console.log('运行Android上')
	       break;
	    case 'ios':
				 this.type = 2
	       console.log('运行iOS上')
	       break;
	    default:
	       console.log('运行在开发者工具上')
	       break;
		}
		uni.getStorageInfo({
			success: res => {
				let currentSize = res.currentSize;
				this.num = currentSize;
			}
		});
	},
	methods: {
		// #ifdef APP-PLUS
		getNew() {
			console.log(this.version)
			var req = {
				//升级检测数据
				client_type: this.type,
				current_version: this.version
			};
			uni.request({
				url: `${helper.requestUrl}/update`,
				method: 'POST',
				data: req,
				success: res => {
					console.log(res)
					if (res.statusCode == 200 && res.data.must === 1) {
						let url = res.data.app_link
						uni.showModal({
							//提醒用户更新
							title: '更新提示',
							content: res.data.message,
							success: res => {
								if (res.confirm) {
									uni.showLoading({
									    title: '下载中'
									});
									uni.downloadFile({
											url: this.imgUrl + url,
											success: (downloadResult) => {
													if (downloadResult.statusCode === 200) {
														  uni.hideLoading();
															plus.runtime.install(downloadResult.tempFilePath, {
																	force: false
															}, function() {
																	plus.runtime.restart();
															}, function(e) {
																	uni.showToast({
																		title: '更新失败',
																		icon: 'none'
																	})
															});
													}
											}
									});
								}
							}
						});
					}else{
						uni.showToast({
							title:res.data.message,
							icon: 'none',
							duration:2000
						})
					}
				}
			});
		},
		// #endif
		modifyPassword() {
			// 修改密码
			// 进入修改密码页
			uni.navigateTo({
				url: '/pages/forgetPassword'
			});
		},
		delCaching() {
			// 删除系统缓存
			uni.showModal({
				title: '提示',
				content: '确认删除缓存',
				success: res => {
					if (res.confirm) {
						// console.log('用户点击确定');
						uni.showToast({
							title: '清除中...',
							icon: 'loading',
							duration: 3000
						});
						setTimeout(e => {
							uni.showToast({
								title: '清除完成',
								icon: 'success',
								duration: 2000
							});
						}, 3000);
						uni.clearStorageSync();
						setTimeout(e => {
							this.num = '0';
						}, 3000);
					} else if (res.cancel) {
						// console.log('用户点击取消');
					}
				}
			});
		},
		outLogin() {
			// 退出系统--进入登录页
			uni.showModal({
				title: '提示',
				content: '是否退出系统',
				success: res => {
					if (res.confirm) {
						// console.log('用户点击确定');
						this.runOutLogin();
					} else if (res.cancel) {
						// console.log('用户点击取消');
					}
				}
			});
		},
		runOutLogin() {
			// 退出系统--进入登录页--执行
			uni.showLoading({
				title: '退出系统...',
				duration: 1000000
			});
			uni.request({
				url: `${helper.requestUrl}/logout`,
				method: 'POST',
				header: {
					authorization: this.token
				},
				success: res => {
					uni.hideLoading();
					res = helper.null2str(res);
					if (res.data.state_code == 1) {
						uni.reLaunch({
							url: `/pages/login`
						});
					} else {
						uni.showToast({
							title: res.data.message
						});
					}
				}
			});
		}
	}
};
</script>

<style>
.login {
	margin-top: 200rpx;
	width: 750rpx;
	height: auto;
	display: flex;
	align-items: center;
	justify-content: center;
}

.login view {
	width: 630rpx;
	height: 80rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 10rpx;
	font-size: 32rpx;
	color: #fff;
	background-color: #2390dc;
	box-shadow: 0 10rpx 45rpx 0 rgba(35, 144, 220, 0.6);
}

.item {
	width: 690rpx;
	margin: 0 30rpx;
	display: flex;
	justify-content: space-between;
	border-bottom: 1rpx solid #f3f3f6;
	padding: 30rpx 0;
}

.item .left {
	display: flex;
	justify-content: flex-start;
}

.item text {
	font-size: 30rpx;
	font-weight: 600;
	color: #333333;
	margin: 0 10rpx;
}

.item icon {
	color: #c0c0c0;
	font-size: 40rpx;
	width: 40rpx;
	/* background: #007AFF; */
}

.item .iconchangyongtubiao-xianxingdaochu-zhuanqu- {
	color: #c0c0c0;
}

.item view {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
