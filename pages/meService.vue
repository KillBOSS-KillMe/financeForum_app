<template>
	<view class="meMessage">
		<view class="item">
			<view class="iconFont"><uni-icons type="" class="iconfont iconweixin1"></uni-icons></view>
			<button type="" open-type="contact" hover-class="btn-hover">联系客服微信 1718444444</button>
			<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
		</view>
		<view class="item">
			<view class="iconFont"><uni-icons type="" class="iconfont icondianhua"></uni-icons></view>
			<button type=""  hover-class="btn-hover">联系客服QQ 1071076818</button>
			<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	import helper from '../common/helper.js';
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
.meMessage{
	width: 690rpx;
	padding: 0 30rpx;
}
.meMessage .item{
	border: 1rpx solid #F8F8F8;
	border-radius: 10rpx;
	padding: 30rpx;
	margin-top: 20rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.meMessage .item>view{
	display: flex;
	align-items: center;
}
.meMessage .item image{
	width: 96rpx;
	height: 96rpx;
	border-radius: 96rpx;
}
.iconfont{
	color: #B8B8B8;
	font-weight: 600;
}
button,.item text{
	border: none !important;
	width: 420rpx;
	color: #333333;
	font-size: 26rpx;
	font-weight: 600;
	margin: 0 !important;
	text-align: left;
	background-color: transparent !important;
}
uni-button:after{
	border: none;
}
button::after{ 
	border: none;
	background: none;
}
/* button:hover{ 
	border: none;
	background: none;
} */
.iconFont{
	width: 100rpx;
	height: 100rpx;
	border-radius: 100rpx;
	/* background: #22BA42; */
	background-image: linear-gradient(-40deg, #A8F4B8, #22BA42);
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0 0 40rpx 0rpx #22BA42;
	
}
.iconFont .iconfont{
	font-size: 60rpx;
	color: #fff;
}
</style>
