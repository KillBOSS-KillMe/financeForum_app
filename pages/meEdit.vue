<template>
	<view class="edit">
		<view class="itemList">
			<text>头像</text>
			<view class="right" @tap="goImg">
				<image :src="imgUrl+formNode.avatar" mode=""></image>
				<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
			</view>
		</view>
		<view class="itemList moon" data-name="signature" data-title="修改签名" @tap="goEditSet">
			<text>签名</text>
			<view>
				<text>{{ formNode.signature }}</text>
				<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
			</view>
			<!-- <input type="text" v-model="formNode.signature" value=""  placeholder="" /> -->
		</view>
		<view class="itemList moon" data-name="name" data-title="修改姓名" @tap="goEditSet">
			<text>真实姓名</text>
			<view>
				<text>{{ formNode.name }}</text>
				<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
			</view>
		</view>
		<view class="itemList">
			<picker @change="bindPickerChange" :value="index" :range="array" data-name="sex">
				<view class="moon">
					<text>性别</text>
					<view>
						<!-- <text v-if="formNode.sex == ''">{{ formNode.sex }}</text> -->
						<!-- <text>{{ formNode.sex }}</text> -->
						<text>{{ formNode.sex }}</text>
						<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
					</view>
					<!-- <input type="text" value="男" v-model="formNode.sex" placeholder="" /> -->
				</view>
			</picker>
		</view>
		<view class="itemList">
			<pickerAddress @change="goAddress">
				<view class="moon">
					<text>居住地</text>
					<view class="right">
						{{ txt }}
						<!-- 	<text>北京市 东城区 东华门街道</text> -->
						<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
					</view>
				</view>
			</pickerAddress>
		</view>
		<view class="itemList">
			<picker @change="bindPickerChange" :value="index" :range="schoolList" data-name="education">
				<view class="moon">
					<text>学历</text>
					<view>
						<text>{{ formNode.education }}</text>
						<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
					</view>
				</view>
			</picker>
		</view>
		<view class="itemList moon" data-name="sesame_credit" data-title="修改芝麻信用分" @tap="goEditSet">
			<text>芝麻信用分</text>
			<view>
				<text>{{ formNode.sesame_credit }}</text>
				<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
			</view>
		</view>
		<view class="itemList">
			<picker @change="bindPickerChange" :value="index" :range="arrayCard" data-name="credit_card">
				<view class="moon">
					<text>信用卡</text>
					<view>
						<text>{{ formNode.credit_card }}</text>
						<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
					</view>
				</view>
			</picker>
		</view>
		<view class="itemList">
			<picker @change="bindPickerChange" :value="index" :range="arrayCard" data-name="social_security">
				<view class="moon">
					<text>社保</text>
					<view>
						<text>{{ formNode.social_security }}</text>
						<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
					</view>
				</view>
			</picker>
		</view>
		<view class="itemList">
			<picker @change="bindPickerChange" :value="index" :range="arrayCard" data-name="provident_fund">
				<view class="moon">
					<text>公积金</text>
					<view>
						<text>{{ formNode.provident_fund }}</text>
						<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
					</view>
				</view>
			</picker>
		</view>
		<view class="itemList" data-name="" data-title="修改手机">
			<text>手机</text>
			<input type="text" value="" v-model="formNode.mobile" placeholder="" disabled="ture" />
		</view>
		<view class="itemList moon" data-name="email" data-title="修改邮箱" @tap="goEditSet">
			<text>邮箱</text>
			<view>
				<text>{{ formNode.email }}</text>
				<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
			</view>
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
			txt: '选择地址',
			// formNode: [],
			formNode: {
				sex: '',
				credit_card: '',
				social_security: '',   //社保
				provident_fund: '',   //公积金
				education: '',   //学历
				province: '',       //省市区
				city: '',
				district: ''
			},
			array: ['男', '女', '无'],
			arrayCard: ['无', '有'],
			schoolList: ['小学','初中','高中','大专','本科','硕士','博士'],
			index: 0,
			setData: '',
			options: '',
			imgUrl: ''
		};
	},
	components: {
		pickerAddress
	},
	onLoad() {
		this.imgUrl = helper.imgUrl
	},
	onShow() {
		this.getformNode();
	},
	methods: {
		// 进入编辑页
		goEditSet(e) {
			console.log(e);
			let name = e.currentTarget.dataset.name;
			let title = e.currentTarget.dataset.title;
			uni.navigateTo({
				url: `/pages/meEditSet?name=${name}&title=${title}`
			});
		},
		bindPickerChange(e) {
			this.index = e.target.value;
			if (e.currentTarget.dataset.name == 'sex') {
				this.setData = this.array[this.index];
				this.formNode.sex == this.setData;
			} else if (e.currentTarget.dataset.name == 'credit_card') {
				this.setData = this.index;
				this.formNode.credit_card == this.arrayCard[this.index];
			} else if (e.currentTarget.dataset.name == 'social_security') {
				this.setData = this.index;
				this.formNode.social_security == this.arrayCard[this.index];
			} else if(e.currentTarget.dataset.name == 'provident_fund'){
				this.setData = this.index;
				this.formNode.provident_fund == this.arrayCard[this.index];
			} else if(e.currentTarget.dataset.name == 'education'){
				this.setData = ++this.index;
				this.formNode.education == this.schoolList[this.index];
			}
			this.options = e.currentTarget.dataset.name;
			this.submit();
		},
		goAddress(e) {
			console.log(e);
			this.txt = e.data.join('');
			for (let i = 0; i < e.data.length; i++) { 
					this.setData = e.data[i]
					if(i == '0'){
						this.options = 'province';
					} else if(i== '1'){
						this.options = 'city';
					} else if(i== '2'){
						this.options = 'district';
					}
			    this.submit()
			 }
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
					if(this.formNode.credit_card == 0){
						this.formNode.credit_card = '无'
					} else{
							this.formNode.credit_card = '有'
					};
					if(this.formNode.social_security == 0){
						this.formNode.social_security = '无'
					} else{
						this.formNode.social_security = '有'
					}
					if(this.formNode.provident_fund == 0){
						this.formNode.provident_fund = '无'
					} else{
						this.formNode.provident_fund = '有'
					}
					if(this.formNode.education == 1){
						this.formNode.education = '小学'
					} else if(this.formNode.education == 2){
						this.formNode.education = '初中'
					}else if(this.formNode.education == 3){
						this.formNode.education = '高中'
					}else if(this.formNode.education == 4){
						this.formNode.education = '大专'
					}else if(this.formNode.education == 5){
						this.formNode.education = '本科'
					}else if(this.formNode.education == 6){
						this.formNode.education = '硕士'
					}else if(this.formNode.education == 7){
						this.formNode.education = '博士'
					}
					this.txt = this.formNode.province + this.formNode.city + this.formNode.district
					console.log(this.txt)
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
					res = helper.null2str(res);
					console.log(res);
					if (res.data.status_code == '1') {
						uni.showToast({
							title: res.data.message
						});
						setTimeout(() => {
							this.getformNode();
						}, 2000);
					} else {
						uni.showToast({
							title: res.data.message
						});
					}
				}
			});
		},
		// 上图头像
		goImg(){
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
						this.options = 'avatar';
						this.setData = this.imgInfo.path
						this.submit()
						console.log(this.imgInfo, '图片')
					}).catch(err => console.log(err));
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
.right text,
.uni-input {
	font-size: 30rpx;
	color: #333333;
	white-space: nowrap;
	margin-right: 20rpx;
}
.edit .itemList input,
.itemList > view {
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
.edit .itemList > text:first-child,.edit .itemList .moon > text:first-child {
	font-weight: 600;
}
.edit .itemList:last-of-type {
	border: none;
}
/* .edit button {
	margin-top: 30rpx;
} */
.moon{
	width: 690rpx;
	display: flex;
	justify-content: space-between;
	align-content: center;
	align-items: center;
}
.moon > view {
	width: 500rpx;
	display: flex;
	align-content: center;
	justify-content: space-between;
	text-align: right;
}
.moon > view > text {
	width: 460rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	text-align: right;
}
</style>
