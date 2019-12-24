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
			<input type="text" value="嘻嘻嘻嘻嘻嘻嘻嘻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻" placeholder=""/>
		</view>
		<view class="itemList">
			<text>真实姓名</text>
			<input type="text" value="黎明" placeholder=""/>
		</view>
		<view class="itemList">
			<text>性别</text>
			<input type="text" value="男" placeholder=""/>
		</view>
		<view class="itemList">
			<text>居住地</text>
			<view class="right">
				<pickerAddress @change="goAddress">{{txt}}</pickerAddress>
			<!-- 	<text>北京市 东城区 东华门街道</text> -->
				<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
			</view>
			
		</view>
		<view class="itemList">
			<text>学历</text>
			<input type="text" value="本科" placeholder=""/>
		</view>
		<view class="itemList">
			<text>支付宝</text>
			<input type="text" value="999" placeholder=""/>
		</view>
		<view class="itemList">
			<text>芝麻信用分</text>
			<input type="text" value="999" placeholder=""/>
		</view>
		<view class="itemList">
			<text>信用卡</text>
			<input type="text" value="无" placeholder=""/>
		</view>
		<view class="itemList">
			<text>社保</text>
			<input type="text" value="无" placeholder=""/>
		</view>
		<view class="itemList">
			<text>公积金</text>
			<input type="text" value="99" placeholder=""/>
		</view>
		<view class="itemList">
			<text>手机</text>
			<input type="text" value="999" placeholder=""/>
		</view>
		<view class="itemList">
			<text>QQ</text>
			<input type="text" value="999" placeholder=""/>
		</view>
		<button type="primary">完成</button>
	</view>
</template>

<script>
	import pickerAddress from '../components/wangding-pickerAddress.vue'
	export default {
		data() {
			return {
				txt: '选择地址',
			}
		},
		components:{
			pickerAddress
		},
		methods: {
			goAddress(data) {
				this.txt = data.data.join('')
				console.log(data.data.join(''))
			}
		}
	}
</script>

<style>
.edit{
	width: 690rpx;
	padding: 0 30rpx 80rpx;
}
.edit .itemList{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 30rpx 0;
	border-bottom: 2rpx dashed #000000;
	
}
.edit .itemList .right{
	display: flex;
	align-items: center;
	font-size: 30rpx;
	color: #333333;
}
.edit .itemList .right image{
	width: 58rpx;
	height: 58rpx;
	border-radius: 58rpx;
	margin-right: 20rpx;
}
.edit .itemList text,.right text{
	font-size: 30rpx;
	color: #333333;
}
.edit .itemList input{
	width: 500rpx;
	font-size: 30rpx;
	color: #333333;
	text-align: right;
}
.edit .itemList>text:first-child{
	font-weight: 600;
}
.edit .itemList:last-of-type{
	border: none;
}
.edit button{
	margin-top: 30rpx;
}
</style>
