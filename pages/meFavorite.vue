<template>
	<view>
		<view class="list">
			<block v-for="(item,index) in list" :key="index">
				<view class="item">
					<image v-bind:src="item.image" data-index="index" />
					<view class="con">
						<view class="title">{{item.title + item.title + item.title + index}}</view>
						<view class="info">
							<text>{{item.time}}</text>
							<text>{{item.user}}</text>
							<text>{{item.comment}}评</text>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	import helper from '../common/helper.js';
	export default {
		data() {
			return {
				list: [
					{image: '../static/a.jpg', title: '标题标题标题标题标题标题标题', time: '12小时前', user: 'admin', comment: 20},
					{image: '../static/a.jpg', title: '标题标题标题标题标题标题标题', time: '12小时前', user: 'admin', comment: 20},
					{image: '../static/a.jpg', title: '标题标题标题标题标题标题标题', time: '12小时前', user: 'admin', comment: 20},
					{image: '../static/a.jpg', title: '标题标题标题标题标题标题标题', time: '12小时前', user: 'admin', comment: 20},
					{image: '../static/a.jpg', title: '标题标题标题标题标题标题标题', time: '12小时前', user: 'admin', comment: 20},
					{image: '../static/a.jpg', title: '标题标题标题标题标题标题标题', time: '12小时前', user: 'admin', comment: 20},
					{image: '../static/a.jpg', title: '标题标题标题标题标题标题标题', time: '12小时前', user: 'admin', comment: 20},
					{image: '../static/a.jpg', title: '标题标题标题标题标题标题标题', time: '12小时前', user: 'admin', comment: 20}
				]
			};
		}
	}
</script>
<style>
	.list {
		width: 750rpx;
		height: auto;
	}
	.item{
		width: 690rpx;
		height: 136rpx;
		padding: 20rpx 30rpx;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.item image{
		width: 220rpx;
		height: 136rpx;
	}
	.item .con{
		width: 450rpx;
		height: 136rpx;
		margin-left: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
	}
	.item .title{
		width: 450rpx;
		height: auto;
		font-size: 28rpx;
		font-weight: 600;
		color: #333333;
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.item .info{
		width: 450rpx;
		font-size: 24rpx;
		color: #999999;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>