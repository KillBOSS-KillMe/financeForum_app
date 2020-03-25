<template>
	<view>
		<view class="list">
			<block v-for="(item,index) in list" :key="index">
				<view class="item">
					<image :src="imgUrl+item.theme_pic" mode="aspectFill" v-if="item.theme_pic != ''" :data-id="item.post_id" @tap="geDetail"></image>
					<image src="../static/imgLost.png" mode="aspectFill" v-else :data-id="item.post_id" @tap="geDetail"></image>
					<view class="con">
						<view class="title" :data-id="item.post_id" @tap="geDetail">{{item.title}}</view>
						<view class="info">
							<text>{{item.publish_time}}</text>
							<!-- <text>{{item.user}}</text> -->
							<text>{{item.comments_count}}评</text>
							<text class="del" :data-index="index" @tap="deleteItem">删除</text>
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
				list: [],
				imgUrl: '',
				page: 1
			};
		},
		onLoad() {
			// 获取收藏列表
			this.getList()
			this.imgUrl = helper.imgUrl
		},
		methods:{
			deleteItem(e) {
				// 点击删除
				uni.showModal({
					title: '提示',
					content: '确认删除?',
					success: res => {
						if (res.confirm) {
							// console.log('用户点击确定');
							let index = e.currentTarget.dataset.index
							this.runDeleteItem(index)
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				});
			},
			runDeleteItem(index) {
				// 执行草稿删除
				uni.showLoading({
				  title: '删除中...'
				});
				let list = this.list
				uni.request({
					url: `${helper.requestUrl}/posts/del`,
					method: 'GET',
					header: {
						authorization: app.globalData.token
					},
					data: {
						post_id: list[index].post_id
					},
					success: res => {
						uni.hideLoading();
						res = helper.null2str(res);
						if (res.data.status_code == 200) {
							uni.showToast({
								title: res.data.message,
								icon: 'success',
								duration: 2000
							});
							let newList = []
							for (let i = 0; i < list.length; i++) {
								if (list[i].post_id != list[index].post_id) {
									newList.push(list[i])
								}
							}
							this.list = newList
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'none',
								duration: 2000
							});
						}
					}
				});
			},
			getList() {
				// 获取收藏列表
				uni.showLoading({
				  title: '加载中...',
					duration: 1000000
				});
				uni.request({
					url: `${helper.requestUrl}/user/publish`,
					method: 'GET',
					header: {
						authorization: app.globalData.token
					},
					data:{
						page_size: '20',
						page: this.page,
					},
					success: res => {
						uni.hideLoading();
						res = helper.null2str(res)
						console.log(res)
						if (res.data.status_code == '1') {
							this.list = this.list.concat(res.data.data)
						} else {
							uni.showToast({
								title: res.data.message,
								icon:'none'
							});
						}
				
					}
				})
			},
			geDetail(e){
				console.log(e)
				uni.navigateTo({
					url:`/pages/articleDetail?id=${e.currentTarget.dataset.id}`
				})
			},
			onReachBottom() {
				this.page ++;
				this.getList()
			}
		}
	}
</script>
<style>
	.list {
		width: 750rpx;
		height: auto;
		padding: 0 0 30rpx;
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
	.del {
		color: #E22929;
	}
</style>