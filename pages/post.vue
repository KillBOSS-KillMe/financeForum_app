<template>
	<view class="post">
		<input class="title" type="text" value="" placeholder="请输入标题" @input="inputValue" data-name="title" />
		<view class="content">
			<!-- <editor style="background-color: #EBEBEB; width: 100%; padding: 10upx;" placeholder="公司介绍" id="editor" class="ql-container" :placeholder="placeholder" @input="editorChange" @ready="onEditorReady"></editor> -->
			<editor id="editor" @ready="onEditorReady" @input="contentChange" :read-only="false"></editor>
			<!-- <editor id="editor" class="ql-container" placeholder="请输入发布内容..." @input="inputValue"></editor> -->
			<!-- <textarea value="" placeholder="请输入发布内容..." @input="inputValue" data-name="content"/> -->
			<text class="tip">{{ name }}</text>
		</view>
		<view class="sound">
			<uni-icon class="iconfont iconyuyin" type=""></uni-icon>
			<text>附加语音</text>
		</view>
		<!-- 		<view class="sound">
			<uni-icon class="iconfont iconzanzan" type=""></uni-icon>
			<text class="address">显示所在位置</text>
		</view> -->
		<view class="enclosure">
			<view class="enclosureList">
				<uni-icon class="iconfont iconbiaoqing" type=""></uni-icon>
				<uni-icon class="iconfont iconzhaopian" type="" @tap="getPhoto"></uni-icon>
				<uni-icon class="iconfont iconshipin" type=""></uni-icon>
				<uni-icon class="iconfont iconat" type=""></uni-icon>
			</view>
		</view>
		<button type="primary" class="submit" @tap="post">发帖</button>
	</view>
</template>

<script>
const app = getApp();
import helper from '../common/helper.js';
export default {
	data() {
		return {
			formNode: {
				title: '',
				content: '',
				board_id: '',
				topic_id: '',
				name: '',
				imgInfo: ''
			}
		};
	},
	onLoad(e) {
		console.log(e);
		this.formNode.board_id = e.id;
		this.name = e.name;
	},
	methods: {
		onEditorReady() {
			uni
				.createSelectorQuery()
				.select('#editor')
				.context(res => {
					console.log(res);
					this.editorCtx = res.context;
					let content = {
						// html:`<p wx:nodeid="70">import AceRow from "@/xx/Ace_Row"</p><p wx:nodeid="73">components:{</p><p wx:nodeid="79" style='white-space:pre;'>	AceRow</p><p wx:nodeid="76">}</p><p wx:nodeid="76"><br></p><p wx:nodeid="13">&lt;Ace-Row :gutter='10'&gt;</p><p wx:nodeid="66" style='white-space:pre;'>	&lt;Ace-Col :span='5' :offset='1' &gt;&lt;/Ace-Col&gt;						</p><p wx:nodeid="68">&lt;/Ace-Row&gt;</p>`
					};
					this.editorCtx.setContents(content); //设置富文本编辑器的内容
				})
				.exec();
		},
		contentChange(e) {
			console.log(e.detail);
		},
		inputValue(e) {
			let formNode = this.formNode;
			let name = e.currentTarget.dataset.name;
			let value = e.detail.value;
			formNode[name] = value;
			this.formNode = formNode;
		},
		// 发帖
		post() {
			uni.request({
				url: `${helper.requestUrl}/posts/send`,
				method: 'POST',
				header: {
					authorization: app.globalData.token
				},
				data: this.formNode,
				success: res => {
					uni.hideLoading();
					res = helper.null2str(res);
					console.log(res);
					if (res.data.status_code == '200') {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						});
						setTimeout(() => {
							uni.reLaunch({
								url: `/pages/index`
							});
						}, 2000);
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						});
					}
				}
			});
		},
		// 上传图片
		getPhoto() {
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
						this.imgInfo = e[0].path;
					}).catch(err => console.log(err));
				}
			});
		}
	}
};
</script>

<style>
.post {
	width: 690rpx;
	padding: 10rpx 30rpx;
}
.post .title {
	border: 1rpx solid #f8f8f8;
	padding: 0rpx 20rpx;
	border-radius: 10rpx;
	color: #999999;
	font-size: 30rpx;
	height: 80rpx;
	line-height: 80rpx;
}
.post .content {
	width: 630rpx;
	height: 240rpx;
	border: 1rpx solid #f8f8f8;
	padding: 28rpx;
	margin: 30rpx 0;
	border-radius: 10rpx;
}
#editor {
	height: 210rpx !important;
	width: 636rpx;
	border: 1rpx solid #007AFF;
}
.post .content .tip {
	color: #999999;
	font-size: 28rpx;
	text-align: right;
}
.sound {
	display: flex;
	width: 638rpx;
	height: 28rpx;
	border: 1rpx solid #f8f8f8;
	border-radius: 10rpx;
	align-items: center;
	padding: 26rpx;
	margin-bottom: 30rpx;
}
.sound text {
	font-size: 30rpx;
	font-weight: 600;
	color: #333333;
	margin-left: 16rpx;
}
.sound .address {
	color: #999999;
	font-weight: 200;
}
.enclosure {
	padding: 0 30rpx 100rpx;
}
.enclosureList > .iconfont {
	margin-right: 40rpx;
}
.submit {
	width: 630rpx;
	position: fixed;
	bottom: 60rpx;
	left: 60rpx;
}
.iconfont {
	font-size: 40rpx;
}
</style>
