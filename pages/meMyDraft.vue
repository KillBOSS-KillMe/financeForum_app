<template>
	<view>
		<view class="list">
			<block v-for="(item,index) in list" :key="index">
				<view class="item" v-if="item.image != ''">
					<image v-bind:src="item.image" data-index="index" />
					<view class="con">
						<view class="title">
							<span class="label">【草稿】</span>
							<span>{{item.title + item.title + item.title + index}}</span>
						</view>
						<view class="info">
							<span>{{item.time}}</span>
						</view>
					</view>
				</view>
				<view class="item notImg" v-else>
					<!-- <image v-bind:src="item.image" data-index="index" /> -->
					<view class="con">
						<view class="title">
							<span class="label">【草稿】</span>
							<span>{{item.title + item.title + item.title + index}}</span>
						</view>
						<view class="info">
							<span>{{item.time}}</span>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{image: '../static/a.jpg', title: '标题标题标题标题标题标题标题', time: '12小时前'},
					{image: '', title: '标题标题标题标题标题标题标题', time: '12小时前'},
					{image: '../static/a.jpg', title: '标题标题标题标题标题标题标题', time: '12小时前'},
					{image: '../static/a.jpg', title: '标题标题标题标题标题标题标题', time: '12小时前'},
					{image: '', title: '标题标题标题标题标题标题标题', time: '12小时前'},
					{image: '../static/a.jpg', title: '标题标题标题标题标题标题标题', time: '12小时前'},
					{image: '../static/a.jpg', title: '标题标题标题标题标题标题标题', time: '12小时前'},
					{image: '../static/a.jpg', title: '标题标题标题标题标题标题标题', time: '12小时前'}
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
	.notImg .con,
	.notImg .title,
	.notImg .info{
		margin: 0 !important;
		width: 690rpx !important;
	}
	.item .title{
		display: flex;
		align-items: center;
		justify-content: flex-start;
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
	.item .title .label{
		color: #E22929;
	}
	.item .info{
		width: 450rpx;
		font-size: 24rpx;
		color: #999999;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
</style>