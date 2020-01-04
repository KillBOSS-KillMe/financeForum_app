<template>
	<view class="searchNet">
		<view class="search">
			<!-- <picker class="picker" bindchange="bindChange" value="{{Index}}"  range="{{Data}}" range-key="name"> -->
			<picker @change="selSearchType" :value="index" :range="typeList" range-key="name">
				<view class="uni-input">{{typeList[index].name}}123123123</view>
			</picker>
			<input placeholder="请输入搜素内容" @input="bindInput" value="" />
			<text @tap="setSearchStorage(inputValue)">查网贷</text>
		</view>
		<view v-if="mask">
			<view class="historySearch" v-if="storageFlag">
				<text class="hotSearchTitle">历史记录</text>
				<view class="history">
					<block v-for="(item, index) in sercherStorage" :key="index">
						<view class="historyItem" @tap="setSearchStorage(item)">
							<view>
								<icon class="iconfont iconlishijilu"></icon>
								<text>{{ item }}</text>
							</view>
							<icon class="iconfont iconbuoumaotubiao20" @tap.stop="clearList(index)"></icon>
						</view>
					</block>
				</view>
			</view>
			<view class="clearHistor" v-if="sercherStorage.length !== 0" @tap="clearSearchStorage">消除全部搜索历史</view>
		</view>
		<view v-if="!mask" class="result">
			<view v-if="itemList.length > 0" class="content">
				<block v-for="(item, index) in itemList" :key="index">
					<view class="item" @tap="goDetail(item.id)">
						<image :src="imgUrl + item.icon"></image>
						<text>{{ item.name }}</text>
					</view>
				</block>
			</view>
			<view v-if="itemList.length == 0" class="none">
				<!-- <icon class="iconfont iconc-kongzhuangtai"></icon> -->
				<text>没有找到相关信息</text>
			</view>
		</view>
	</view>
</template>

<script>
const app = getApp();
import helper from '../common/helper.js';
export default {
	data() {
		return {
			inputValue: '',
			typeList: [
				{name: '用户', key: 'user'},
				{name: '用户', key: 'user'},
				{name: '用户', key: 'user'},
				{name: '用户', key: 'user'},
			],
			sercherStorage: [],
			storageFlag: false, // 显示搜索记录标志位
			mask: true,
			mask1: false,
			itemList: [],
			current_page: 1,
			imgUrl: ''
		};
	},
	onLoad() {
		this.imgUrl = helper.imgUrl;
		this.openLocationsercher();
	},

	methods: {
		selSearchType(e) {
			console.log('picker发送选择改变，携带值为', e.target.value)
			this.index = e.target.value
		},
		// 跳转详情
		goDetail(e){
			uni.navigateTo({
				url:`/pages/productDetail?id=${e}`
			})
		},
		// 获取输入框的输入信息
		bindInput(e) {
			this.inputValue = e.detail.value;
			if (this.inputValue == '') {
				this.mask = true;
			}
		},
		// // 清楚历史记录单条
		clearList(e) {
			console.log(e, '++++');
			let index = e;
			this.sercherStorage.splice(index, 1);
			//将搜索记录更新到缓存
			var searchData = this.sercherStorage;
			uni.setStorageSync('searchData', searchData);
			if (this.sercherStorage.length == 0) {
				this.storageFlag = false;
			} else {
				this.storageFlag = true;
			}
		},
		// // 清楚缓存历史并关闭历史搜索框
		clearSearchStorage() {
			uni.removeStorageSync('searchData');
			this.sercherStorage = [];
			this.storageFlag = false;
		},
		// // 点击缓存搜索列表
		tapSercherStorage(e) {
			var index = e;
			this.inputValue = index;
		},
		// //添加搜索记录并搜索
		setSearchStorage(e) {
			this.inputValue = e;
			if (this.inputValue != '') {
				//将搜索记录更新到缓存
				var searchData = this.sercherStorage;
				searchData.unshift(this.inputValue);
				searchData = [...new Set(searchData)];
				searchData = searchData.splice(0, 6);
				console.log(searchData);
				uni.setStorageSync('searchData', searchData);
				this.storageFlag = true;
				this.mask = false;
				this.openLocationsercher();
				this.itemList = [];
				this.current_page = 1;
				this.getListData();
			}
		},
		// // 打开历史记录列表
		openLocationsercher() {
			console.log(uni.getStorageSync('searchData'));
			this.sercherStorage = uni.getStorageSync('searchData') || []; //调用API从本地缓存中获取数据
			if (this.sercherStorage == '') {
				this.storageFlag = false;
			} else {
				this.storageFlag = true;
			}
		},
		getListData() {
			uni.request({
				url: `${helper.requestUrl}/holes/search`,
				// header: {
				// 	authorization: this.$parent.globalData.token,
				// },
				method: 'GET',
				data: {
					keywords: this.inputValue,
					page: this.current_page,
					page_size: 20
				},
				success: res => {
					res = helper.null2str(res);
					console.log(res);
					if (res.data.status_code == 200) {
						this.itemList = this.itemList.concat(res.data.data);
						// 当前页码
						this.current_page = res.data.current_page;
						// 总页码
						this.last_page = res.data.last_page;
					} else if (res.data.status_code == 400) {
						this.itemList = '';
					}
				}
			});
		}
	}
};
</script>

<style>
.searchNet {
	width: 690rpx;
	padding: 30rpx;
}
.search {
	display: flex;
	justify-content: space-between;
}
.search input {
	width: 470rpx;
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
.historySearch {
	width: 690rpx;
	margin: 10rpx 0;
}
.hotSearchTitle {
	font-size: 32rpx;
	color: #cacaca;
	font-weight: 600;
	display: block;
	padding: 15rpx 30rpx 24rpx;
	border-bottom: 1rpx solid #f0f0f0;
}
.history text {
	display: block;
}
.history .historyItem {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1rpx solid #f0f0f0;
	padding: 20rpx 30rpx;
}
.history view {
	display: flex;
	align-items: center;
}
.history text {
	font-size: 26rpx;
	color: #000000;
}
.iconlishijilu {
	color: #000000;
	font-size: 28rpx;
	width: 28rpx;
	// height: 26rpx;
	display: flex;
	align-items: center;
	margin-right: 16rpx;
}
.clearHistor {
	color: #000000;
	font-size: 26rpx;
	font-weight: 600;
	text-align: center;
	margin: 40rpx 0;
}
.none {
	margin-top: 100rpx;
}
/* .iconc-kongzhuangtai{
	width: 160rpx;
	display: block;
	font-size: 150rpx;
	margin: 0 auto;
} */
.none text {
	text-align: center;
	color: #454545;
	font-size: 24rpx;
	display: block;
	margin: 20rpx 0 0 0;
}
.result {
	width: 690rpx;
	margin: 30rpx 0;
}
.result .content {
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
}
.result .content .item {
	width: 160rpx;
	margin: 0 20rpx 30rpx 0;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}
.result .content .item:nth-child(4n) {
	margin-right: 0;
}
.result .content .item image {
	width: 96rpx;
	height: 96rpx;
	border-radius: 96rpx;
}
.result .content .item text {
	/* text-align: center; */
	color: #333;
	font-size: 28rpx;
	font-weight: 600;
	margin-top: 10rpx;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
</style>
