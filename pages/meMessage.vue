<template>
	<view class="meMessage">
		<block v-for="(item,index) in list" :key="index">
			<view class="item" :data-title="item.title" :data-type="item.id" @tap="goMessageDetails">
				<view>
					<view class="iconType">
						<uni-icons type="" class="iconfont" :class="item.img"></uni-icons>
						<view class="isType" v-if="item.isType == '1'"></view>
					</view>
					<text>{{item.title}}</text>
				</view>
				<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
			</view>
		</block>
		
	</view>
</template>

<script>
	const app = getApp()
	import helper from '../common/helper.js';
	export default {
		data() {
			return {
				list:[
					{id:'1',img:'iconat',title:'提到我的',isType:'	'},
					{id:'2',img:'iconxiaoxi1',title:'评论',isType:' '},
					{id:'3',img:'iconxitongpeizhi',title:'系统消息',isType:' '}
				]
			}
		},
		onLoad(e) {
			console.log(e)
			this.list[2].isType = e.isType
			// console.log(this.list.isType)
		},
		methods: {
			goMessageDetails(e) {
				console.log(e)
				let type = e.currentTarget.dataset.type
				let title = e.currentTarget.dataset.title
				if(type == '3'){
					uni.navigateTo({
						url: '/pages/message'
					})
				}else{
					uni.navigateTo({
						url: `/pages/meApplyMessage?type=${type}&title=${title}`
					})
				}
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
	font-size: 34rpx;
	font-weight: 600;
	margin-left: 20rpx;
}
.meMessage .item .iconfont{
	width: 96rpx;
	height: 96rpx;
	border-radius: 96rpx;
	font-size: 60rpx;
	font-weight: 600;
	display: flex;
	align-items: center;
}
.iconat{
	color: #f46b6b;
}
.iconxiaoxi1{
	color: #f4c26c;
}
.iconxitongpeizhi{
	color: #6cd3f4;
}
.iconType{
	position: relative;
}
.isType{
	width: 14rpx;
	height: 14rpx;
	background: red;
	border-radius: 14rpx;
	position: absolute;
	top: 15rpx;
	right: 33rpx;
}
</style>
