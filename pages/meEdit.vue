<template>
	<view class="edit">
		<view class="itemList">
			<text>头像</text>
			<view class="right">
				<image src="../static/logo.png" mode=""></image>
				<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
			</view>
		</view>
		<view class="itemList moon" data-name="signature" data-title="修改签名" @tap="goEditSet">
			<text>签名</text>
			<view>
				<text>{{formNode.signature}}</text>
				<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
			</view>
			<!-- <input type="text" v-model="formNode.signature" value=""  placeholder="" /> -->
		</view>
		<view class="itemList" data-name="name" data-title="修改姓名" @tap="goEditSet">
			<text>真实姓名</text>
			<input type="text" value="黎明" v-model="formNode.name" placeholder="" />
		</view>
		<picker @change="bindPickerChange" :value="index" :range="array" data-name="sex">
			<view class="itemList moon">
				<text>性别</text>
				<view>
					<text>{{ array[index] }}</text>
					<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
				</view>
				<!-- <input type="text" value="男" v-model="formNode.sex" placeholder="" /> -->
			</view>
		</picker>
		<pickerAddress @change="goAddress">
			<view class="itemList">
				<text>居住地</text>
				<view class="right">
					{{ txt }}
					<!-- 	<text>北京市 东城区 东华门街道</text> -->
					<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
				</view>
			</view>
		</pickerAddress>
		<view class="itemList" data-name="education" data-title="修改学历" @tap="goEditSet">
			<text>学历</text>
			<input type="text" value="" v-model="formNode.education" placeholder="" />
		</view>
		<view class="itemList" data-name="" data-title="修改支付宝" @tap="goEditSet">
			<text>支付宝</text>
			<input type="text" value="" v-model="formNode.mobile" placeholder="" />
		</view>
		<view class="itemList" data-name="sesame_credit" data-title="修改芝麻信用分" @tap="goEditSet">
			<text>芝麻信用分</text>
			<input type="text" value="" v-model="formNode.sesame_credit" placeholder="" />
		</view>
		<picker @change="bindPickerChange" :value="index" :range="arrayCard" data-name="credit_card">
			<view class="itemList moon">
				<text>信用卡</text>
				<view>
					<text>{{ arrayCard[index] }}</text>
					<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
				</view>
				<!-- <input type="text" value="男" v-model="formNode.sex" placeholder="" /> -->
			</view>
		</picker>
<!-- 		<view class="itemList" data-name="credit_card" data-title="修改信用卡">
			
			<text>信用卡</text>
			<input type="text" value="无" v-model="formNode.credit_card" placeholder="" />
		</view> -->
		<view class="itemList" data-name="social_security" data-title="修改社保" @tap="goEditSet">
			<text>社保</text>
			<input type="text" value="无" v-model="formNode.social_security" placeholder="" />
		</view>
		<view class="itemList" data-name="provident_fund" data-title="修改公积金" @tap="goEditSet">
			<text>公积金</text>
			<input type="text" value="99" v-model="formNode.provident_fund" placeholder="" />
		</view>
		<view class="itemList" data-name="" data-title="修改手机">
			<text>手机</text>
			<input type="text" value="" v-model="formNode.mobile" placeholder="" disabled="ture" />
		</view>
		<view class="itemList" data-name="email" data-title="修改邮箱" @tap="goEditSet">
			<text>邮箱</text>
			<input type="text" value="" v-model="formNode.email" placeholder="" />
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
			arrayCard: ['有','无'],
			index: 0,
			setData: '',
			options: ''
		};
	},
	components: {
		pickerAddress
	},
	onLoad() {
		
	},
	onShow() {
		this.getformNode();
	},
	methods: {
		// 进入编辑页
		goEditSet(e) {
			console.log(e)
			let name = e.currentTarget.dataset.name
			let title = e.currentTarget.dataset.title
			uni.navigateTo({
				url: `/pages/meEditSet?name=${name}&title=${title}`
			})
		},
		bindPickerChange(e){
			console.log(e)
			console.log('picker发送选择改变，携带值为', e.target.value)
			this.index = e.target.value
			if(e.currentTarget.dataset.name == 'sex'){
				this.setData = this.array[this.index]
			} else{
				this.setData = this.arrayCard[this.index]
			}
			 this.options = e.currentTarget.dataset.name
			 this.submit()
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
					field: this.options,
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
							this.getformNode()
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
	justify-content: flex-end;
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
	white-space: nowrap;
	margin-right: 20rpx;
}
.edit .itemList input,.itemList>view {
	width: 520rpx;
	font-size: 30rpx;
	color: #333333;
	text-align: right;
	overflow: hidden;
}
/* .edit .itemList input,.itemList>view {
	display: flex;
	justify-content: space-between;
} */
.edit .itemList > text:first-child {
	font-weight: 600;
}
.edit .itemList:last-of-type {
	border: none;
}
.edit button {
	margin-top: 30rpx;
}
.moon>view{
	width: 500rpx;
	display: flex;
	justify-content: space-between;
	text-align: right;
}
.moon>view>text{
	width: 460rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	text-align: right;
}
</style>
