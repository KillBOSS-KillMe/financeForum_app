<template>
	<view class="content">
		<view class="online"></view>
		<view class="list">
			<view class="item">
				<text>真实姓名</text>
				<view class="right">
					<input type="text" value="" placeholder="请填写您的真实姓名" @blur="inputValue" data-name="real_name"/>
					<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
				</view>
			</view>
<!-- 			<view class="item">
				<text>性别</text>
				<view class="right">
					<input type="text" value="" placeholder="请选择性别"/>
					<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
				</view>
			</view> -->
			<view class="item">
				<text>身份证号</text>
				<view class="right">
					<input type="idcard" value="" placeholder="请输入18位有效身份证号"  @blur="inputValue" data-name="id_card"/>
					<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
				</view>
			</view>
			<view class="item">
				<text>联系方式</text>
				<view class="right">
					<input type="number" value="" placeholder="请输入您的联系方式"  @blur="inputValue" data-name="phone"/>
					<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
				</view>
			</view>
		</view>
		<view class="online"></view>
		<view class="codeImg">
			<text>上传身份证正方反面</text>
			<view class="card">
				<view @tap="getCard(1)">
					<image v-if="formNode.card_positive != ''" :src="formNode.card_positive" mode=""></image>
					<image v-else src="../static/card0.png" mode=""></image>
				</view>
				<view @tap="getCard(2)">
					<image v-if="formNode.card_peverse != ''" :src="formNode.card_peverse" mode=""></image>
					<image v-else src="../static/card1.png" mode=""></image>
				</view>
			</view>
		</view>
		<button type="" v-if="formNode.real_name == '' || formNode.id_card == '' || formNode.phone == '' || formNode.card_positive == '' || formNode.card_peverse == ''" class="meCertification" >认证</button>
		<button type="" v-else class="meCertification" style="background: #2390DC;"  @tap="submint">认证</button>
	</view>
</template>

<script>
	const app = getApp()
	import helper from '../common/helper.js';
	export default {
		data() {
			return {
				formNode: {
					real_name: '',  //真是姓名
					id_card: '',   //身份证
					phone: '',
					card_positive: '',  //身份证正面
					card_peverse: '',
				},
				isDisabled: false,
				imgUrl: ''
			}
		},
		onLoad() {
			this.imgUrl = helper.imgUrl
		},
		methods: {
			inputValue(e){
				let formNode = this.formNode
				let name = e.currentTarget.dataset.name
				let value = e.detail.value
				formNode[name] = value
				this.formNode = formNode
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
							if(op == 1){
								this.formNode.card_positive = e[0].path.path
								console.log(this.formNode.card_positive)
							}else{
								this.formNode.card_peverse = e[0].path.path
							}
						}).catch(err => console.log(err));
					}
				});
			},
			submint(){
				if (this.formNode.real_name == '') {
					wx.showToast({
						title: "请填写您的真实姓名",
						icon: 'none',
						duration: 2000
					});
					return false
				}
				if (this.formNode.id_card == '') {
					wx.showToast({
						title: "请输入18位有效身份证号",
						icon: 'none',
						duration: 2000
					});
					return false
				}
				if (this.formNode.id_card.length != 18) {
					wx.showToast({
						title: "请输入18位有效身份证号",
						icon: 'none',
						duration: 2000
					});
					return false
				}
				if (this.formNode.phone == '') {
					wx.showToast({
						title: "请输入您的联系方式",
						icon: 'none',
						duration: 2000
					});
					return false
				}
				if (this.formNode.phone.length != 11) {
					wx.showToast({
						title: "请输入您的联系方式",
						icon: 'none',
						duration: 2000
					});
					return false
				}
				if (this.formNode.card_positive == '') {
					wx.showToast({
						title: "请上传身份证正面",
						icon: 'none',
						duration: 2000
					});
					return false
				}
				if (this.formNode.card_peverse == '') {
					wx.showToast({
						title: "请上传身份证反面",
						icon: 'none',
						duration: 2000
					});
					return false
				}
				uni.showLoading({
				  title: '认证中...',
					duration: 1000
				});
				uni.request({
					url: `${helper.requestUrl}/user/real-check`,
					method: 'POST',
					header: {
						authorization: app.globalData.token
					},
					data: this.formNode,
					success: res => {
						console.log(res);
						uni.hideLoading();
						res = helper.null2str(res)
						console.log(res,'*-*****')
						if (res.data.status_code == 200) {
							uni.showToast({
								title: res.data.message,
								icon: 'none'
							});
							setTimeout( e =>{
								uni.reLaunch({
									url:'/pages/me'
								})
							},2000)
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'none'
							});
						}
					}
				});
			}
		}
	}
</script>

<style>
.content{
	width: 750rpx;
}
.online{
	width: 750rpx;
	height: 16rpx;
	background: #f3f3f3;
}
.list{
	width: 690rpx;
	padding:0 30rpx;
}
.item{
	display: flex;
	justify-content: space-between;
	border-bottom: 1rpx solid #ECECEC;
	padding: 30rpx 0;
}
.item>text{
	color: #333333;
	font-size: 28rpx;
	font-weight: 600;
}
.right{
	display: flex;
}
.right input{
	text-align: right;
	width: 400rpx;
	font-size: 24rpx;
	color: #B8B8B8;
	margin-right: 10rpx;
}
.right .iconfont{
	color: #C0C0C0;
	font-weight: 600600;
}
.codeImg{
	width: 690rpx;
	padding:30rpx;
}
.codeImg>text{
	font-size: 28rpx;
	font-weight: 600;
	color: #333;
}
.card{
	display: flex;
	justify-content: space-between;
	margin-top: 40rpx;
}
.card image{
	width: 328rpx;
	height: 221rpx;
	border-radius: 10px 10px 10px 10px;
}
.meCertification{
	width: 630rpx;
	height: 80rpx;
	line-height: 80rpx;
	background: #91c0e1;
	box-shadow: 0rpx 10rpx 45rpx 0rpx rgba(35,144,220,0.6);
	border-radius: 10rpx;
	barder:none;
	margin-top: 40rpx;
	color: #fff;
}
</style>
