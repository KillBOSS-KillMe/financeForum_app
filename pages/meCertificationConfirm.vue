<template>
	<view class="content">
		<view class="online"></view>
		<view class="list">
			<view class="item">
				<text>真实姓名</text>
				<view class="right">
					<input type="text" value="" placeholder="请填写您的真实姓名"/>
					<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
				</view>
			</view>
			<view class="item">
				<text>性别</text>
				<view class="right">
					<input type="text" value="" placeholder="请选择性别"/>
					<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
				</view>
			</view>
			<view class="item">
				<text>身份证号</text>
				<view class="right">
					<input type="text" value="" placeholder="请输入18位有效身份证号"/>
					<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
				</view>
			</view>
			<view class="item">
				<text>联系方式</text>
				<view class="right">
					<input type="text" value="" placeholder="请输入您的联系方式"/>
					<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
				</view>
			</view>
		</view>
		<view class="online"></view>
		<view class="codeImg">
			<text>上传身份证正方反面</text>
			<view class="card">
				<image src="../static/a.jpg" mode=""></image>
				<image src="../static/a.jpg" mode=""></image>
			</view>
		</view>
		<button type="primary" class="meCertification">认证</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
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
	background: #2390DC;
	box-shadow: 0rpx 10rpx 45rpx 0rpx rgba(35,144,220,0.6);
	border-radius: 10rpx;
	barder:none;
	margin-top: 40rpx;
}
</style>
