<template>
	<view>
		<view class="list">
			<block v-for="(item,index) in list" :key="index">
				<view class="item" v-if="item.theme_pic != ''">
					<image v-bind:src="imgUrl + item.theme_pic" data-index="index" />
					<view class="con">
						<view class="title" :data-id="item.id" @tap="goDetails">
							<span class="label">【草稿】</span>
							<span>{{item.title}}</span>
						</view>
						<view class="info">
							<span>{{item.updated_at}}</span>
							<span class="del" :data-index="index" @tap="deleteItem">删除</span>
						</view>
					</view>
				</view>
				<view class="item notImg" v-else>
					<!-- <image v-bind:src="item.image" data-index="index" /> -->
					<view class="con">
						<view class="title" :data-id="item.id" @tap="goDetails">
							<span class="label">【草稿】</span>
							<span>{{item.title}}</span>
						</view>
						<view class="info">
							<span>{{item.updated_at}}</span>
							<span class="del" :data-index="index" @tap="deleteItem">删除</span>
						</view>
					</view>
				</view>
			</block>
			<view class="null" v-if="list.length == 0">暂无数据</view>
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
				nextPageUrl: ''
			};
		},
		onLoad() {
			this.imgUrl = helper.imgUrl;
			// 加载查稿列表
			this.myDraftPosts()
		},
		onReachBottom() {
			// 页面上拉触底事件的处理函数
			if (this.nextPageUrl != '') {
				this.getMore()
			}
		},
		methods: {
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
						post_id: list[index].id
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
								if (list[i].id != list[index].id) {
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
			goDetails(e) {
				let id = e.currentTarget.dataset.id
				uni.navigateTo({
					url: `/pages/articleDetail?id=${id}`
				})
			},
			myDraftPosts() {
				// 加载查稿列表
				uni.showLoading({
					title: '列表获取中...'
				});
				uni.request({
					url: `${helper.requestUrl}/user/my-draft-posts`,
					method: 'GET',
					header: {
						authorization: app.globalData.token
					},
					success: res => {
						uni.hideLoading();
						res = helper.null2str(res)
						console.log(res, '++++++++')
						if (res.data.status_code == 200) {
							this.list = res.data.data
							this.nextPageUrl = res.data.next_page_url
						} else {
							// uni.showToast({
							// 	title: res.data.message
							// });
						}
					}
				})
			},
			getMore() {
				// 加载更多
				uni.showLoading({
					title: '列表获取中...'
				});
				uni.request({
					url: `${helper.requestUrl}/user/my-draft-posts`,
					method: 'GET',
					header: {
						authorization: app.globalData.token
					},
					success: res => {
						uni.hideLoading();
						res = helper.null2str(res)
						console.log(res, '++++++++')
						if (res.data.status_code == 200) {
							let list = this.list
							let newList = res.data.data
							this.list = list.concat(newList)
							this.nextPageUrl = res.data.next_page_url
						} else {
							uni.showToast({
								title: res.data.message
							});
							this.nextPageUrl = ''
						}
					}
				})
			}
		}
	}
</script>
<style>
	.list {
		width: 750rpx;
		height: auto;
	}

	.item {
		width: 690rpx;
		height: 136rpx;
		padding: 20rpx 30rpx;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	.item image {
		width: 220rpx;
		height: 136rpx;
	}

	.item .con {
		width: 450rpx;
		height: 136rpx;
		margin-left: 20rpx;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		flex-direction: column;
	}

	.notImg .con,
	.notImg .title,
	.notImg .info {
		margin: 0 !important;
		width: 690rpx !important;
	}

	.item .title {
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		width: 450rpx;
		height: auto;
		font-size: 28rpx;
		font-weight: 600;
		color: #333333;
		overflow: hidden;

		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.item .title .label {
		color: #E22929;
	}

	.item .info {
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
