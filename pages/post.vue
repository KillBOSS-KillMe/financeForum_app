<template>
	<view class="container">
		<view class="page-body">
			<view class='wrapper'>
				<view class='toolbar' @tap="format">
					<view :class="formats.bold ? 'ql-active' : ''" class="iconfont icon-zitijiacu" data-name="bold"></view>
					<view :class="formats.italic ? 'ql-active' : ''" class="iconfont icon-zitixieti" data-name="italic"></view>
					<view :class="formats.underline ? 'ql-active' : ''" class="iconfont icon-zitixiahuaxian" data-name="underline"></view>
					<view :class="formats.strike ? 'ql-active' : ''" class="iconfont icon-zitishanchuxian" data-name="strike"></view>
					<view :class="formats.align === 'left' ? 'ql-active' : ''" class="iconfont icon-zuoduiqi" data-name="align"
					 data-value="left"></view>
					<view :class="formats.align === 'center' ? 'ql-active' : ''" class="iconfont icon-juzhongduiqi" data-name="align"
					 data-value="center"></view>
					<view :class="formats.align === 'right' ? 'ql-active' : ''" class="iconfont icon-youduiqi" data-name="align"
					 data-value="right"></view>
					<view :class="formats.align === 'justify' ? 'ql-active' : ''" class="iconfont icon-zuoyouduiqi" data-name="align"
					 data-value="justify"></view>
					<view :class="formats.lineHeight ? 'ql-active' : ''" class="iconfont icon-line-height" data-name="lineHeight"
					 data-value="2"></view>
					<view :class="formats.letterSpacing ? 'ql-active' : ''" class="iconfont icon-Character-Spacing" data-name="letterSpacing"
					 data-value="2em"></view>
					<view :class="formats.marginTop ? 'ql-active' : ''" class="iconfont icon-722bianjiqi_duanqianju" data-name="marginTop"
					 data-value="20px"></view>
					<view :class="formats.previewarginBottom ? 'ql-active' : ''" class="iconfont icon-723bianjiqi_duanhouju" data-name="marginBottom"
					 data-value="20px"></view>
					<view class="iconfont icon-clearedformat" @tap="removeFormat"></view>
					<view :class="formats.fontFamily ? 'ql-active' : ''" class="iconfont icon-font" data-name="fontFamily" data-value="Pacifico"></view>
					<view :class="formats.fontSize === '24px' ? 'ql-active' : ''" class="iconfont icon-fontsize" data-name="fontSize"
					 data-value="24px"></view>

					<view :class="formats.color === '#0000ff' ? 'ql-active' : ''" class="iconfont icon-text_color" data-name="color"
					 data-value="#0000ff"></view>
					<view :class="formats.backgroundColor === '#00ff00' ? 'ql-active' : ''" class="iconfont icon-fontbgcolor"
					 data-name="backgroundColor" data-value="#00ff00"></view>

					<view class="iconfont icon-date" @tap="insertDate"></view>
					<view class="iconfont icon--checklist" data-name="list" data-value="check"></view>
					<view :class="formats.list === 'ordered' ? 'ql-active' : ''" class="iconfont icon-youxupailie" data-name="list"
					 data-value="ordered"></view>
					<view :class="formats.list === 'bullet' ? 'ql-active' : ''" class="iconfont icon-wuxupailie" data-name="list"
					 data-value="bullet"></view>
					<view class="iconfont icon-undo" @tap="undo"></view>
					<view class="iconfont icon-redo" @tap="redo"></view>

					<view class="iconfont icon-outdent" data-name="indent" data-value="-1"></view>
					<view class="iconfont icon-indent" data-name="indent" data-value="+1"></view>
					<view class="iconfont icon-fengexian" @tap="insertDivider"></view>
					<view class="iconfont icon-charutupian" @tap="insertImage"></view>
					<view :class="formats.header === 1 ? 'ql-active' : ''" class="iconfont icon-format-header-1" data-name="header"
					 :data-value="1"></view>
					<view :class="formats.script === 'sub' ? 'ql-active' : ''" class="iconfont icon-zitixiabiao" data-name="script"
					 data-value="sub"></view>
					<view :class="formats.script === 'super' ? 'ql-active' : ''" class="iconfont icon-zitishangbiao" data-name="script"
					 data-value="super"></view>
					<view class="iconfont icon-shanchu" @tap="clear"></view>
					<view :class="formats.direction === 'rtl' ? 'ql-active' : ''" class="iconfont icon-direction-rtl" data-name="direction"
					 data-value="rtl"></view>

				</view>

				<editor id="editor" class="ql-container" placeholder="开始输入..." showImgSize showImgToolbar showImgResize
				 @statuschange="onStatusChange" :read-only="readOnly" @ready="onEditorReady">
				</editor>
			</view>
		</view>
		<view class="postAttach">
			<view>
				<uni-icon class="iconfont iconyuyin" type=""></uni-icon>
				<text>附加语音</text>
			</view>
			<view class="operating">
				<!-- 录音 -->
				<!-- touchstart 手指触摸事件 -->
				<!-- touchend 手指触摸动作结束事件 -->
				<uni-icon class="iconfont iconyuyin" type="" @touchstart="startRecord" @touchend="endRecord"></uni-icon>
				<!-- 播放录音 -->
				<uni-icon class="iconfont iconzanting" type="" @tap="playVoice"></uni-icon>
			</view>
		</view>
		<!-- 	<view class="postAttach">
			<uni-icon class="iconfont iconzanzan" type=""></uni-icon>
			<text class="address">显示所在位置</text>
		</view> -->
		<!-- 当前无好友列表，暂时不做 -->
		<!-- <view class="postAttach">
			<view>
				<uni-icon class="iconfont iconat" type=""></uni-icon>
				<text class="address">通知好友</text>
			</view>
		</view> -->
		<!-- 	<view class="postAttach">
			<uni-icon class="iconfont iconbiaoqing" type=""></uni-icon>
			<uni-icon class="iconfont iconzhaopian" type="" @tap="getPhoto"></uni-icon>
			<uni-icon class="iconfont iconshipin" @tap="getPhoto" type=""></uni-icon>
			<uni-icon class="iconfont iconat" type=""></uni-icon>
		</view> -->
		<view class="submit">
			<view @tap="submit">发布</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	import helper from '../common/helper.js';
	// 录音部分--开始
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.autoplay = true;
	// 录音部分--结束
	export default {
		data() {
			return {
				formNode: {
					title: '',
					content: '',
					board_id: '',
					topic_id: ''
				},
				readOnly: false,
				formats: {}
			}
		},
		onLoad(e) {
			console.log(e);
			this.formNode.board_id = e.id;
			this.name = e.name;
			// 富文本部分
			uni.loadFontFace({
				family: 'Pacifico',
				source: 'url("https://sungd.github.io/Pacifico.ttf")'
			})
			
			// 录音部分
			recorderManager.onStop(res => {
				// 获取音频文件地址
				console.log('recorder stop' + JSON.stringify(res));
				this.voicePath = res.tempFilePath;
				// 上传音频文件
				this.upVoice()
			});
		},
		methods: {
			// 数据提交
			submit() {
				this.editorCtx.getContents({
					success: data => {
						console.log('insert divider success')
						console.log(data)
						// 获取富文本中的内容
						console.log(data.html)
					}
				})
			},
			// |||||||||||||||||||||录音部分--开始|||||||||||||||||||||
			startRecord() {
				console.log('开始录音');
				uni.showToast({
					title: "录音中...",
					duration: 99999999,
					icon: 'loading'
				});
				recorderManager.start();
			},
			endRecord() {
				console.log('录音结束');
				uni.hideToast()
				uni.showToast({
					title: "结束录音",
					duration: 2000,
					icon: 'success'
				});
				recorderManager.stop();
			},
			playVoice() {
				console.log('播放录音');
				if (this.voicePath) {
					innerAudioContext.src = this.voicePath;
					innerAudioContext.play();
				}
			},
			// 音频上传
			upVoice() {
				uni.uploadFile({
					url: `${helper.requestUrl}/posts/uploads`,
					filePath: this.voicePath,
					name: 'file',
					header: {
						authorization: app.globalData.token
					},
					success: res => {
						console.log(res)
						// resolve({
						// 	path: JSON.parse(res.data).data
						// });
					}
				});
			},
			// |||||||||||||||||||||录音部分--结束|||||||||||||||||||||
			// |||||||||||||||||||||---以下---为富文本部分|||||||||||||||||||||
			readOnlyChange() {
				this.readOnly = !this.readOnly
			},
			onEditorReady() {
				uni.createSelectorQuery().select('#editor').context((res) => {
					// console.log(res.context)
					this.editorCtx = res.context
				}).exec()
			},
			undo() {
				this.editorCtx.undo()
			},
			redo() {
				this.editorCtx.redo()
			},
			format(e) {
				let {
					name,
					value
				} = e.target.dataset
				if (!name) return
				// console.log('format', name, value)
				this.editorCtx.format(name, value)
			},
			onStatusChange(e) {
				const formats = e.detail
				this.formats = formats
			},
			insertDivider() {
				this.editorCtx.insertDivider({
					success: function() {
						// console.log('insert divider success')
					}
				})
			},
			clear() {
				this.editorCtx.clear({
					success: function(res) {
						// console.log("clear success")
					}
				})
			},
			removeFormat() {
				this.editorCtx.removeFormat()
			},
			insertDate() {
				const date = new Date()
				const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
				this.editorCtx.insertText({
					text: formatDate
				})
			},
			insertImage() {
				uni.chooseImage({
					count: 1,
					// sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					// sourceType: ['album', 'camera'],
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
											// console.log(res)
											resolve({
												path: JSON.parse(res.data).data
											});
										}
									});
								});
							})
						).then(e => {
							uni.hideToast();
							// this.imgInfo = e[0].path;
							// console.log(this.imgInfo, '图片')
							this.editorCtx.insertImage({
								src: e[0].path.path,
								alt: '图像',
								success: function() {
									// console.log('insert image success')
								}
							})
						}).catch(err => console.log(err));
					}
				});
			}
			// |||||||||||||||||||||---以上---为富文本部分|||||||||||||||||||||
		},
		
	}
</script>

<style>
	.postAttach{
		width: 690rpx;
		height: auto;
		padding: 30rpx;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.postAttach view{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.postAttach .operating .iconfont{
		margin-left: 20rpx;
	}
	.postAttach .iconfont{
		font-size: 40rpx;
	}
	.submit {
		width: 750rpx;
		height: auto;
		padding: 50rpx 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.submit view {
		width: 400rpx;
		height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		font-weight: 600;
		color: #fff;
		background-color: #2390DC;
	}

	.wrapper {
		padding: 5px;
	}

	.iconfont {
		display: inline-block;
		padding: 8px 8px;
		width: 24px;
		height: 24px;
		cursor: pointer;
		font-size: 20px;
	}

	.toolbar {
		box-sizing: border-box;
		border-bottom: 0;
		font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
	}

	.ql-container {
		box-sizing: border-box;
		padding: 12px 15px;
		width: 100%;
		min-height: 30vh;
		height: auto;
		background: #fff;
		margin-top: 20px;
		font-size: 16px;
		line-height: 1.5;
	}

	.ql-active {
		color: #06c;
	}




	/* icon部分 */
	@font-face {
		font-family: "iconfont";
		src: url('https://img-cdn-qiniu.dcloud.net.cn/fonts/editor-icon.ttf') format('truetype');
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-redo:before {
		content: "\e627";
	}

	.icon-undo:before {
		content: "\e633";
	}

	.icon-indent:before {
		content: "\eb28";
	}

	.icon-outdent:before {
		content: "\e6e8";
	}

	.icon-fontsize:before {
		content: "\e6fd";
	}

	.icon-format-header-1:before {
		content: "\e860";
	}

	.icon-format-header-4:before {
		content: "\e863";
	}

	.icon-format-header-5:before {
		content: "\e864";
	}

	.icon-format-header-6:before {
		content: "\e865";
	}

	.icon-clearup:before {
		content: "\e64d";
	}

	.icon-preview:before {
		content: "\e631";
	}

	.icon-date:before {
		content: "\e63e";
	}

	.icon-fontbgcolor:before {
		content: "\e678";
	}

	.icon-clearedformat:before {
		content: "\e67e";
	}

	.icon-font:before {
		content: "\e684";
	}

	.icon-723bianjiqi_duanhouju:before {
		content: "\e65f";
	}

	.icon-722bianjiqi_duanqianju:before {
		content: "\e660";
	}

	.icon-text_color:before {
		content: "\e72c";
	}

	.icon-format-header-2:before {
		content: "\e75c";
	}

	.icon-format-header-3:before {
		content: "\e75d";
	}

	.icon--checklist:before {
		content: "\e664";
	}

	.icon-baocun:before {
		content: "\ec09";
	}

	.icon-line-height:before {
		content: "\e7f8";
	}

	.icon-quanping:before {
		content: "\ec13";
	}

	.icon-direction-rtl:before {
		content: "\e66e";
	}

	.icon-direction-ltr:before {
		content: "\e66d";
	}

	.icon-selectall:before {
		content: "\e62b";
	}

	.icon-fuzhi:before {
		content: "\ec7a";
	}

	.icon-shanchu:before {
		content: "\ec7b";
	}

	.icon-bianjisekuai:before {
		content: "\ec7c";
	}

	.icon-fengexian:before {
		content: "\ec7f";
	}

	.icon-dianzan:before {
		content: "\ec80";
	}

	.icon-charulianjie:before {
		content: "\ec81";
	}

	.icon-charutupian:before {
		content: "\ec82";
	}

	.icon-wuxupailie:before {
		content: "\ec83";
	}

	.icon-juzhongduiqi:before {
		content: "\ec84";
	}

	.icon-yinyong:before {
		content: "\ec85";
	}

	.icon-youxupailie:before {
		content: "\ec86";
	}

	.icon-youduiqi:before {
		content: "\ec87";
	}

	.icon-zitidaima:before {
		content: "\ec88";
	}

	.icon-xiaolian:before {
		content: "\ec89";
	}

	.icon-zitijiacu:before {
		content: "\ec8a";
	}

	.icon-zitishanchuxian:before {
		content: "\ec8b";
	}

	.icon-zitishangbiao:before {
		content: "\ec8c";
	}

	.icon-zitibiaoti:before {
		content: "\ec8d";
	}

	.icon-zitixiahuaxian:before {
		content: "\ec8e";
	}

	.icon-zitixieti:before {
		content: "\ec8f";
	}

	.icon-zitiyanse:before {
		content: "\ec90";
	}

	.icon-zuoduiqi:before {
		content: "\ec91";
	}

	.icon-zitiyulan:before {
		content: "\ec92";
	}

	.icon-zitixiabiao:before {
		content: "\ec93";
	}

	.icon-zuoyouduiqi:before {
		content: "\ec94";
	}

	.icon-duigoux:before {
		content: "\ec9e";
	}

	.icon-guanbi:before {
		content: "\eca0";
	}

	.icon-shengyin_shiti:before {
		content: "\eca5";
	}

	.icon-Character-Spacing:before {
		content: "\e964";
	}
</style>
