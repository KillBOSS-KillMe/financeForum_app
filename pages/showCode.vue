<template>
	<view class="shareCode">
		<image class="bg" src="../static/QRBg.png" mode=""></image>
		<view class="content">
			<text class="head">新微金推广二维码</text>
			<view class="con">
				<image v-if="codeList.msg_log == '显示二维码'" :src="codeList.face" mode=""></image>
				<image v-else src="../static/1.png" mode=""></image>
				<text>注:推广二维码仅限一次，分享后需要刷新</text>
				<!-- <button type="" class="submit" v-if="codeType == '1'" @tap="quickInlet(1)">提交开通申请</button> -->
				<view>
					<view>
						<button type="" v-if="showIs == '0'" class="submit" @tap="quickInlet(2)">分享</button>
						<button type="" class="submit" v-else style="background: #DCDCDC;" @tap="des">分享</button>
					</view>
					<!-- #ifdef APP-PLUS -->
					<view class="purple_btn btn_box" @click="saveImgToLocal">保存到相册</view>
					<!-- #endif -->

					<!-- #ifdef MP-WEIXIN -->
					<view v-if="openSettingBtnHidden" class="purple_btn btn_box" @click="saveEwm">保存到相册</view>

					<button v-else class="purple_btn btn_box" hover-class="none" open-type="openSetting" @opensetting="handleSetting">保存到相册</button>
					<!-- #endif -->
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
								<view class="uni-share-content-image"><uni-icon type="" class="iconfont iconweixin"></uni-icon></view>
								<text class="uni-share-content-text">微信好友</text>
							</view>
						</button>
						<!-- #endif -->
						<!-- #ifdef APP-PLUS -->
						<block v-for="(item, index) in bottomData" :key="index">
							<view class="uni-share-content-box" @tap="goShare(item.type)">
								<view class="uni-share-content-image"><uni-icon type="" class="iconfont" :class="item.icon"></uni-icon></view>
								<text class="uni-share-content-text">{{ item.text }}</text>
							</view>
						</block>
						<!-- #endif -->
					</view>
					<text class="uni-share-btn" @tap="cancel('share')">取消分享</text>
				</view>
			</uni-popup>
			<!-- 遮罩 -->
			<view class="modelShow" v-if="codeList.msg_log != '显示二维码'">
				<view class="zhezhao"></view>
				<text>请获取二维码</text>
			</view>
			<view class="modelShow" v-if="showIs == '1'">
				<view class="zhezhao"></view>
				<text @tap="again">请重新获取二维码</text>
			</view>
		</view>
		<canvas style="width: 416rpx;height: 420rpx;background-color: #FFFFFF;" canvas-id="mycanvas" class="test" />
	</view>
</template>

<script>
const app = getApp();
import helper from '../common/helper.js';
import uniPopup from '@/components/uni-popup.vue';
import { pathToBase64, base64ToPath } from '../components/index.js';
export default {
	data() {
		return {
			bottomData: [
				{
					text: '微信好友',
					type: 'WXSceneSession',
					icon: 'iconweixin'
				},
				{
					text: '朋友圈',
					type: 'WXSenceTimeline',
					icon: 'iconpengyouquan'
				}
			],
			codeType: '',
			codeList: {},
			showIs: '0',
			openSettingBtnHidden: true, //是否授权,
			imgUrl: '',
			canvasWidth: '',
			canvasHeight: ''
		};
	},
	components: {
		uniPopup
	},
	onLoad(option) {
		console.log(option);
		this.codeType = option.type;
		this.imgUrl = helper.imgUrl;
	},
	onShow() {
		this.getCode();
	},
	// 微信分享
	onShareAppMessage() {
		let url = this.getPageUrl();
		return {
			title: this.articleDetail.title,
			path: url
		};
		// setTimeout( e =>{
		// 	this.showIs = '1'
		// },3000)
	},
	shareFriend() {
		//分享到微信朋友
		this.goShare('WXSceneSession');
	},
	shareFriendcricle() {
		//分享到微信朋友圈
		this.goShare('WXSenceTimeline');
	},
	methods: {
		quickInlet(e) {
			if (e == 2) {
				this.$refs.showshare.open();
			} else if (e == 1) {
				this.getList();
			}
		},
		// 保存二维码
		//微信小程序保存到相册
		handleSetting(e) {
			console.log(e);
			if (!e.detail.authSetting['scope.writePhotosAlbum']) {
				this.openSettingBtnHidden = false;
			} else {
				this.openSettingBtnHidden = true;
			}
		},
		saveEwm() {
			let that = this;
			//获取相册授权
			uni.getSetting({
				success(res) {
					if (!res.authSetting['scope.writePhotosAlbum']) {
						uni.authorize({
							scope: 'scope.writePhotosAlbum',
							success() {
								//这里是用户同意授权后的回调
								that.saveImgToLocal();
							},
							fail() {
								//这里是用户拒绝授权后的回调
								that.openSettingBtnHidden = false;
							}
						});
					} else {
						//用户已经授权过了
						that.saveImgToLocal();
					}
				}
			});
		},
		saveImgToLocal() {
			uni.showModal({
				title: '提示',
				content: '确定保存到相册吗',
				success: res => {
					if (res.confirm) {
						let that = this;
						// this.qr_path = path;
						let system_info = uni.getSystemInfoSync();
						let ctx = uni.createCanvasContext('mycanvas');
						uni.getImageInfo({
							src: that.codeList.faceurl,
							success(res) {
								console.log(res);
							  ctx.fillStyle = '#FFFFFF';
								ctx.fillRect(0, 0, 218, 218);
								ctx.drawImage(res.path, 0, 0, 203, 203);
								// ctx.fillStyle = '#FFFFFF';
								ctx.draw(true, () => {
									uni.canvasToTempFilePath({
										x: 0,
										y: 0,
										width: 203,
										height: 203,
										destWidth: 203,
										destHeight: 203,
										canvasId: 'mycanvas',
										success: function(res) {
											uni.saveImageToPhotosAlbum({
												filePath: res.tempFilePath,
												success: function() {
													uni.showToast({
														title: '图片保存成功～'
													});
												},
												fail: function(e) {},
												complete: function() {
													uni.hideLoading();
												}
											});
										},
										fail(e) {
											uni.showToast({
												title: '保存失败',
												icon: 'none'
											});
										}
									});
								});
							}
						});
					} else if (res.cancel) {
						uni.showToast({
							title: '取消成功',
							icon: 'none'
						})
					}
				}
			})
		},
		// 分享获取数据
		getCode() {
			uni.request({
				url: `${helper.requestUrl}/promote-showmycode`,
				method: 'GET',
				header: {
					authorization: app.globalData.token
				},
				success: res => {
					res = helper.null2str(res);
					console.log(res, '---');
					if (res.data.code == -1) {
						uni.showToast({
							title: res.data.tip_msg,
							icon: 'none'
						});
						setTimeout(e => {
							uni.navigateTo({
								url:'/pages/message'
							})
						}, 2000);
					} else {
						this.codeList = res.data;
						this.showIs = '0';
						console.log(this.codeList.face, '*');
					}
				}
			});
		},
		// 提交申请
		getList() {
			uni.request({
				url: `${helper.requestUrl}/promote-getmycode`,
				method: 'GET',
				header: {
					authorization: app.globalData.token
				},
				success: res => {
					// uni.hideLoading();
					res = helper.null2str(res);
					console.log(res, '++++');
					if (res.data.code == 0) {
						uni.showToast({
							title: res.data.tip_msg,
							icon: 'none'
						});
						// if (res.data.tip_msg == '恭喜您,审核通过!') {
						// 	let itemNew = res.data.memberinfos.user_setting_account;
						// 	console.log(itemNew, 'm');
						// 	uni.navigateTo({
						// 		url: `/pages/getQrCode?item=${itemNew}`
						// 	});
						// } else {
						// 	// uni.navigateTo({
						// 	// 	url: '/pages/getQrCode'
						// 	// });
						// }
					} else {
						uni.showToast({
							title: res.data.tip_msg,
							icon: 'none'
						});
						setTimeout(e => {
							uni.navigateBack({
								delta: 1
							});
						}, 2000);
					}
				}
			});
		},
		cancel(type) {
			this.$refs['show' + type].close();
		},
		des() {
			uni.showToast({
				title: '请重新获取二维码',
				icon: 'none'
			});
		},
		goShare(e) {
			console.log(e);
			let sceneType = '';
			if (e == 'WXSceneSession') {
				sceneType = 'WXSceneSession';
			} else if (e == 'WXSenceTimeline') {
				sceneType = 'WXSenceTimeline';
			}
			uni.share({
				provider: 'weixin',
				scene: sceneType,
				type: 0,
				href: this.codeList.share_link,
				title: '新微金论坛',
				summary: '我正在使用新微金论坛，赶紧跟我一起来体验！',
				// summary: this.codeList.share_link,
				imageUrl: ' ',
				success: res => {
					this.showIs = '1';
				},
				fail: err => {
				}
			});
		},
		// 获取当前页路径及参数,用于分享
		getPageUrl() {
			let pageNode = getCurrentPages();
			pageNode = pageNode[pageNode.length - 1];
			let url = pageNode.route;
			let options = pageNode.options;
			let optionsString = '?';
			for (let key in options) {
				optionsString += key;
				optionsString += '=';
				optionsString += options[key];
				optionsString += '&';
			}
			optionsString = optionsString.substring(0, optionsString.length - 1);
			url += optionsString;
			return url;
		},
		again() {
			this.getCode();
		}
	}
};
</script>

<style>
.shareCode {
	width: 750rpx;
	height: 100vh;
	overflow: hidden;
	position: relative;
}
.bg {
	width: 750rpx;
	height: 100vh;
	overflow: hidden;
}
.content {
	position: absolute;
	top: 80rpx;
	left: 50%;
	margin-left: -276rpx;
	z-index: 6;
	width: 552rpx;
	background: #ffffff;
	border: 1rpx solid #ffffff;
	border-radius: 14rpx;
	padding: 0 0 60rpx 0;
}
.content .head {
	font-size: 28rpx;
	font-weight: 700;
	color: #333333;
	text-align: center;
	border-bottom: 2rpx dashed #dcdcdc;
	padding: 24rpx 0;
}
.content .head::after {
	content: '';
	display: block;
	width: 20rpx;
	height: 40rpx;
	background: #2390dc;
	border-radius: 0 50rpx 50rpx 0;
	position: absolute;
	top: 66rpx;
	left: -2rpx;
}
.content .head::before {
	content: '';
	display: block;
	width: 20rpx;
	height: 40rpx;
	background: #2390dc;
	border-radius: 50rpx 0 0 50rpx;
	position: absolute;
	top: 66rpx;
	right: -2rpx;
}
.con {
	margin-top: 50rpx;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
}
.con image {
	width: 416rpx;
	height: 420rpx;
	border: 1px solid #ffffff;
}

.con text {
	font-size: 20rpx;
	font-weight: 700;
	color: #666666;
	margin: 30rpx 0 40rpx;
}
.con .submit {
	width: 420rpx;
	height: 50rpx;
	line-height: 50rpx;
	background: #2390dc;
	box-shadow: 0rpx 10rpx 45rpx 0rpx rgba(35, 144, 220, 0.6);
	border: none;
	color: #fff;
	font-size: 24rpx;
	font-weight: 700;
	letter-spacing: 1rpx;
	border-radius: 30rpx;
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
	font-size: 32rpx;
	text-align: center;
	color: #fff;
	font-weight: 700;
	background: #2390dc;
}
.share-btn {
	border: none;
	background: none;
}
button::after {
	border: none;
}
/* 遮罩 */
.modelShow {
	width: 420rpx;
	height: 440rpx;
	position: absolute;
	top: 126rpx;
	left: 50%;
	margin-left: -210rpx;
	z-index: 5;
}
.zhezhao {
	width: 420rpx;
	height: 440rpx;
	background-color: #fff;
	opacity: 0.7;
	position: absolute;
}
.modelShow text {
	width: 420rpx;
	font-size: 24rpx;
	font-weight: 700;
	color: #333333;
	letter-spacing: 1px;
	height: 440rpx;
	line-height: 440rpx;
	position: absolute;
	left: 50%;
	margin-left: -70rpx;
	z-index: 6;
}
.purple_btn {
	font-size: 28rpx;
	margin-top: 35rpx;
	text-align: center;
	width: 300rpx;
	margin: 50rpx auto 0;
	height: 60rpx;
	line-height: 60rpx;
	/* border: 1rpx solid #C0C0C0; */
}
</style>
