<template>
	<view class="meVip">
		<block v-for="(item,index) in list" :key="index">
			<view class="item" @tap="goNext(item.id)">
				<view>
					<image :src="item.img" mode=""></image>
					<text>{{item.title}}</text>
				</view>
				<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
			</view>
		</block>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{id:'1',img:'../static/logo.png',title:'联系客服微信 bn154896547'},
					{id:'2',img:'../static/logo.png',title:'联系客服电话 18535464004 '}
				]
			}
		},
		methods: {
			goNext(e){
				// if(e == 1){
					
				// }else if(){
					
				// }
				console.log(e)
			}
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
.meMessage .item>view>text{
	color: #333333;
	font-size: 28rpx;
	font-weight: 600;
	margin-left: 34rpx;
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
</style>
