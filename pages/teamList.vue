<template>
	<view class="teamList">
		<view class="team">
			<text class="title">一级代理</text>
			<view class="list">
				<block v-for="(item,index) in list" :key="index">
					<view class="item">
						<image :src="item.img" mode=""></image>
						<text>{{item.name}}</text>
					</view>
				</block>
			</view>
		</view>
		<view class="team">
			<text class="title">二级代理</text>
			<view class="list">
				<block v-for="(item,index) in list" :key="index">
					<view class="item">
						<image :src="item.img" mode=""></image>
						<text>{{item.name}}</text>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{id:'1',name:'例会',img:'../static/card1.png'},
					{id:'1',name:'例会d',img:'../static/card1.png'},
					{id:'1',name:'例会的',img:'../static/card1.png'},
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.teamList{
	width: 690rpx;
	padding: 30rpx;
}
.team{
	width: 650rpx;
	/* height: 238rpx; */
	background: #ffffff;
	box-shadow: 0rpx 10rpx 44rpx 0rpx rgba(205,205,205,0.45); 
	padding: 20rpx;
	margin-bottom: 30rpx;
}
.title{
	font-size: 28rpx;
	font-weight: 700;
	color: #666666;
	border-bottom: 2rpx solid #eee;
	padding: 10rpx 0;
	margin-bottom: 20rpx;
}
.list{
	display: flex;
	flex-wrap: wrap;
}
.list .item{
	margin:0 10rpx 16rpx 0;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	width: 100rpx;
}
.list .item:nth-child(6n){
	margin-right: 0;
}
.list .item image{
	width: 86rpx;
	height: 86rpx;
	border-radius: 86rpx;
}
.list .item text{
	font-size: 24rpx;
	font-weight: 700;
	color: #666666;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin-top: 6rpx;
}
</style>
