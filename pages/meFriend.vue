<template>
	<view>
		<view class="search">
			<input type="text" />
			<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></uni-icon>
		</view>
		<view class="list">
			<block v-for="(item,index) in list" :key="index">
				<view class="item">
					<image v-bind:src="item.image" data-index="index" />
					<view class="con">
						<view>
							<text class="title">{{item.name}}</text>
							<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-" v-if="item.gender == 1"></uni-icon>
							<uni-icon type="" class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-" v-if="item.gender == 2"></uni-icon>
							<text class="label" v-if="item.vip > 1">管理员VIP{{item.vip}}级</text>
						</view>
						<view class="info">{{item.info}}</view>
					</view>
					<view class="operating">
						<view>取消</view>
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
					{
						id: 1,
						image: '../static/a.jpg',
						name: 'admin',
						gender: 1,
						vip: 9,
						info: '信息信息信息信息信息'
					},
					{
						id: 1,
						image: '../static/a.jpg',
						name: 'admin',
						gender: 1,
						vip: 9,
						info: '信息信息信息信息信息'
					},
					{
						id: 1,
						image: '../static/a.jpg',
						name: 'admin',
						gender: 1,
						vip: 9,
						info: '信息信息信息信息信息'
					},
					{
						id: 1,
						image: '../static/a.jpg',
						name: 'admin',
						gender: 1,
						vip: 9,
						info: '信息信息信息信息信息'
					}
				]
				
			}
		},
		methods: {
			
		}
	}
</script>

<style >
	.search{
		width: 650rpx;
		height: 70rpx;
		margin: 0 30rpx;
		padding: 0 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #F9F9F9;
	}
	.search .iconfont{
		width: 40rpx;
		height: 40rpx;
		font-size: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.search input{
		width: 640rpx;
		height: 40rpx;
		font-size: 30rpx;
	}
	
	
	.list{
		width: 750rpx;
		height: auto;
	}
	.item{
		width: 690rpx;
		height: 170rpx;
		border-radius: 10rpx;
		background-color: #F9F9F9;
		margin: 20rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	.item image{
		width: 118rpx;
		height: 118rpx;
		border-radius: 118rpx;
		margin: 20rpx;
	}
	.item .con{
		width: 390rpx;
		height: 118rpx;
		border-radius: 118rpx;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		flex-direction: column;
	}
	.item .con view{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.item .title {
		font-size: 24rpx;
		margin: 0 10rpx;
		font-size: 24rpx;
		font-weight: 600;
		color: #333333;
	}
	.item .label{
		font-size: 18rpx;
		padding: 5rpx 10rpx;
		border-radius: 30rpx;
		color: #fff;
		background-color: #D2BF8E;
	}
	.item .iconfont {
		font-size: 22rpx;
		margin: 0 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.item .con .info{
		color: #666666;
		font-size: 26rpx;
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	.operating{
		width: 100rpx;
		height: 118rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		flex-direction: column;
		padding-left: 20rpx;
	}
	.operating view{
		width: 100rpx;
		height: 60rpx;
		font-size: 26rpx;
		color: #fff;
		background-color: #B8B8B8;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
