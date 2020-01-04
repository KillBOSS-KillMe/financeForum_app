<template>
	<view class="searchNet">
		<view class="search">
			<picker @change="selSearchType" :value="typeIndex" :range="typeList" range-key="name">
				<view class="searchType" v-if="typeIndex != -1">{{typeList[typeIndex].name}}</view>
				<view class="searchType" v-if="typeIndex == -1">选择搜索</view>
			</picker>
			<input placeholder="请输入搜素内容" @input="bindInput" value="" />
			<text @tap="runSearch(typeList[typeIndex].key)">搜索</text>
		</view>
		<view class="contentList" v-if="typeList[typeIndex].key == 'post'">
			<block v-for="(item, index) in postList" :key="index">
				<view class="item" @tap="goPostDetail" :data-id="item.id">
					<image :src="imgUrl + item.theme_pic" mode="aspectFill" v-if="item.photoalbums.length > 0"></image>
					<image src="../static/a.jpg" mode="aspectFill" v-else></image>
					<view class="itemRight">
						<text class="title">{{ item.title }}</text>
						<view class="itemCon">
							<text>{{ item.created_at }}</text>
							<text>用户名</text>
							<text>{{item.comments_count}}评</text>
						</view>
					</view>
				</view>
			</block>
		</view>
		<view class="userList" v-if="typeList[typeIndex].key == 'user'">
			
		</view>
	</view>
</template>

<script>
const app = getApp();
import helper from '../common/helper.js';
export default {
	data() {
		return {
			typeIndex: 0,
			inputValue: '',
			typeList: [
				{name: '用户', key: 'user'},
				{name: '帖子', key: 'post'}
			],
			postList: [],
			itemList: [],
			current_page: 1,
			imgUrl: ''
		};
	},
	onLoad() {
		this.imgUrl = helper.imgUrl;
	},

	methods: {
		selSearchType(e) {
			console.log('picker发送选择改变，携带值为', e.target.value)
			this.typeIndex = e.target.value
		},
		goPostDetail(e) {
			uni.navigateTo({
				url: `/pages/articleDetail?id=${e.currentTarget.dataset.id}`
			})
		},
		// 跳转详情
		// goDetail(e){
		// 	uni.navigateTo({
		// 		url:`/pages/productDetail?id=${e}`
		// 	})
		// },
		// 获取输入框的输入信息
		bindInput(e) {
			this.inputValue = e.detail.value;
		},
		runSearch(type) {
			uni.showLoading({
			  title: '搜索中...'
			});
			uni.request({
				url: `${helper.requestUrl}/search`,
				header: {
					authorization: app.globalData.token
				},
				method: 'POST',
				data: {
					type: type,
					keywords: this.inputValue,
					page: this.current_page,
					page_size: 20
				},
				success: res => {
					uni.hideLoading();
					res = helper.null2str(res)
					// console.log(res,'++++++++')
					if (res.data.status_code == 200) {
						if (type == 'user') {
							// 用户列表
							this.userList = []
						} else {
							// 帖子
							this.postList = res.data.data
						}
						// this.itemList = this.itemList.concat(res.data.data);
						// // 当前页码
						// this.current_page = res.data.current_page;
						// // 总页码
						// this.last_page = res.data.last_page;
					} else {
						
					}
				}
			});
		}
	}
};
</script>

<style>
	.searchType{
		min-width: 70rpx;
		height: 70rpx;
		font-size: 28rpx;
		color: #333;
		display: flex;
		justify-content: center;
		align-items: center;
	}
.searchNet {
	width: 690rpx;
	padding: 30rpx;
}
.search {
	display: flex;
	justify-content: space-between;
}
.search input {
	width: 400rpx;
	border: 1rpx solid #e8e8e8;
	height: 70rpx;
	line-height: 70rpx;
	padding: 0 20rpx;
	color: #999999;
	font-size: 28rpx;
	font-size: 600;
	border-radius: 10rpx;
}
.search text {
	color: #fff;
	font-size: 28rpx;
	font-size: 600;
	background: #2390dc;
	width: 140rpx;
	text-align: center;
	line-height: 70rpx;
	border-radius: 10rpx;
}


	.contentList .item {
		display: flex;
		justify-content: space-between;
		margin: 40rpx 0;
	}
	.contentList .item image {
		width: 220rpx;
		height: 136rpx;
		border-radius: 10rpx;
	}
	.contentList .item .itemRight {
		width: 440rpx;
		display: flex;
		align-content: space-between;
		flex-wrap: wrap;
	}

	.contentList .item .itemRight .title {
		font-size: 28rpx;
		color: #333333;
		font-weight: 600;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.itemCon {
		width: 440rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		/* justify-content: flex-end; */
	}

	.itemCon text {
		display: block;
		font-size: 24rpx;
		color: #999999;
	}
</style>
