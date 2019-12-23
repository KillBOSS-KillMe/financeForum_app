<template>
	<view class="indexAccurate">
		<view class="contentList">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="itemRight">
					<text class="title">{{item.title}}</text>
					<view class="itemCon">
						<text>{{item.time}}</text>
						<text>{{item.name}}</text>
						<text>{{item.num}}评</text>
					</view>
				</view>
				<image :src="item.img" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{id:'1',img:'../static/b.jpg',time:'12小时前',name:'admin',num:'3',title:'云南城投股吧说说股票风险如何控制云南城投股吧说说股票风险如何控制云南城投股吧说说股票风险如何控制'},
					{id:'1',img:'../static/b.jpg',time:'11小时前',name:'admin',num:'3',title:'dgfdhdyju'},
					{id:'1',img:'../static/b.jpg',time:'12小时前',name:'admin',num:'2',title:'云南城投股吧说说股票风险如何控制云南城投股吧'}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.indexAccurate .contentList{
	width: 690rpx;
	padding: 10rpx 30rpx 30rpx;
}
.indexAccurate .contentList .item{
	display: flex;
	justify-content: space-between;
	margin-bottom: 40rpx;
}
.indexAccurate .contentList .item image{
	width: 202rpx;
	height: 150rpx;
	border-radius: 10rpx;
}
.indexAccurate .contentList .item .itemRight{
	width: 440rpx;
	display: flex;
	align-content: space-between;
	flex-wrap: wrap;
}
.indexAccurate .contentList .item .itemRight .title{
	font-size: 28rpx;
	color: #333333;
	font-weight: 600;
	overflow : hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.indexAccurate .itemCon{
	width: 440rpx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	/* justify-content: flex-end; */
	
}
.indexAccurate .itemCon text{
	display: block;
	font-size: 24rpx;
	color: #999999;
}
</style>
