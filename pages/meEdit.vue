<template>
	<view class="edit">
		<view class="itemList">
			<text>头像</text>
			<view class="right">
				<image src="../static/logo.png" mode=""></image>
				<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
			</view>
		</view>
		<view class="itemList">
			<text>签名</text>
			<view>
				<text>{{formNode.signature}}</text>
				<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
			</view>
			<!-- <input type="text" v-model="formNode.signature" value=""  placeholder="" /> -->
		</view>
		<view class="itemList">
			<text>真实姓名</text>
			<input type="text" value="黎明" v-model="formNode.name" @input="onInput" placeholder="" />
		</view>
		<view class="itemList">
			<text>性别</text>
			<picker @change="bindPickerChange" :value="index" :range="array">
				<view class="uni-input">{{ array[index] }}</view>
			</picker>
			<!-- <input type="text" value="男" v-model="formNode.sex" @input="onInput" placeholder="" /> -->
		</view>
		<view class="itemList">
			<text>居住地</text>
			<view class="right">
				<pickerAddress @change="goAddress">{{ txt }}</pickerAddress>

				<!-- 	<text>北京市 东城区 东华门街道</text> -->
				<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
			</view>
		</view>
		<view class="itemList">
			<text>学历</text>
			<input type="text" value="本科" v-model="formNode.education" @input="onInput" placeholder="" />
		</view>
		<view class="itemList">
			<text>支付宝</text>
			<input type="text" value="999" v-model="formNode.mobile" @input="onInput" placeholder="" />
		</view>
		<view class="itemList">
			<text>芝麻信用分</text>
			<input type="text" value="999" v-model="formNode.sesame_credit" @input="onInput" placeholder="" />
		</view>
		<view class="itemList">
			<text>信用卡</text>
			<input type="text" value="无" v-model="formNode.credit_card" @input="onInput" placeholder="" />
		</view>
		<view class="itemList">
			<text>社保</text>
			<input type="text" value="无" v-model="formNode.social_security" @input="onInput" placeholder="" />
		</view>
		<view class="itemList">
			<text>公积金</text>
			<input type="text" value="99" v-model="formNode.provident_fund" @input="onInput" placeholder="" />
		</view>
		<view class="itemList">
			<text>手机</text>
			<input type="text" value="999" v-model="formNode.mobile" @input="onInput" placeholder="" disabled="ture" />
		</view>
		<view class="itemList">
			<text>邮箱</text>
			<input type="text" value="999" v-model="formNode.email" @input="onInput" placeholder="" />
		</view>
		<!-- <button type="primary" @tap="finish">完成</button> -->
	</view>
</template>

<script>
const app = getApp();
import helper from '../common/helper.js';
import pickerAddress from '../components/wangding-pickerAddress.vue';
export default {
	data() {
		return {
			txt: '选择地址',
			// formNode: [],
			formNode: [],
			array: ['男','女','无'],
			index: 0,
		};
	},
	components: {
		pickerAddress
	},
	onLoad() {
		this.getformNode();
	},
	methods: {
		//获取input数据
		onInput(e) {
			console.log(e, '+++');
			// this.finish()
		},
		bindPickerChange(e){
			console.log('picker发送选择改变，携带值为', e.target.value)
			 this.index = e.target.value
			 console.log(this.array[this.index])
		},
		goAddress(data) {
			console.log(data);
			this.txt = data.data.join('');
			this.formNode.province = data.data[0];
			this.formNode.city = data.data[1];
			this.formNode.district = data.data[2];
			console.log(this.formNode.province, '+');
		},
		getformNode() {
			// 用户信息获取
			uni.showLoading({
				title: '用户信息获取中...'
			});
			uni.request({
				url: `${helper.requestUrl}/me`,
				method: 'POST',
				header: {
					authorization: app.globalData.token
				},
				success: res => {
					uni.hideLoading();
					res = helper.null2str(res);
					this.formNode = res.data;
				}
			});
		},
		// 修改
		finish() {
			console.log(this.formNode);
			uni.showToast({
				title: '提交中...',
				icon: 'none'
			});
			uni.request({
				url: `${helper.requestUrl}/user/edit`,
				method: 'POST',
				header: {
					authorization: app.globalData.token
				},
				data: this.formNode,
				success: res => {
					// uni.hideLoading();
					res = helper.null2str(res);
					console.log(res);
					if (res.data.status_code == 200) {
						this.collectionList = res.data.data;
					} else {
						// uni.showToast({
						// 	title: res.data.message
						// });
					}
				}
			});
		}
	}
};
</script>

<style>
.edit {
	width: 690rpx;
	padding: 0 30rpx 80rpx;
}
.edit .itemList {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 30rpx 0;
	border-bottom: 2rpx dashed #000000;
}
.edit .itemList .right {
	display: flex;
	align-items: center;
	font-size: 30rpx;
	color: #333333;
}
.edit .itemList .right image {
	width: 58rpx;
	height: 58rpx;
	border-radius: 58rpx;
	margin-right: 20rpx;
}
.edit .itemList text,
.right text,.uni-input {
	font-size: 30rpx;
	color: #333333;
}
.edit .itemList input {
	width: 500rpx;
	font-size: 30rpx;
	color: #333333;
	text-align: right;
}
.edit .itemList > text:first-child {
	font-weight: 600;
}
.edit .itemList:last-of-type {
	border: none;
}
.edit button {
	margin-top: 30rpx;
}
</style>
