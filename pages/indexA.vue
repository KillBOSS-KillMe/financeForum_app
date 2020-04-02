<template>
	<view class="indexAccurate">
		<view class="contentList">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="downOption" :up="upOption" @down="downCallback" @up="upCallback" @emptyclick='emptyClick'>
					 <block v-for="(item, index) in list" :key="index">
					 	<view class="item" @tap="goDetail(item.id)">
					 		<view class="itemRight">
					 			<text class="title">{{ item.title }}</text>
					 			<view class="itemCon">
					 				<text>{{ item.created_at }}</text>
					 				<text>{{ item.user.name }}</text>
					 				<text>{{ item.comments_count }}评</text>
					 			</view>
					 		</view>
					 		<image :src="imgUrl + item.photoalbums[0].path" mode="aspectFill" v-if="item.photoalbums.length > 0"></image>
					 		<image src="../static/imgLost.png" mode="aspectFill" v-else></image>
					 	</view>
					 </block>
			</mescroll-body>
			
			<!-- <view class="null" v-if="isShow">暂无数据</view> -->
		</view>
	</view>
</template>
<script>
const app = getApp();
import helper from '../common/helper.js';
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
export default {
	mixins: [MescrollMixin], // 使用mixin
	data() {
		return {
			list: [],
			page: '1',
			page_size: '10',
			boardId: '0',
			imgUrl: '',
			bank_id: '0',
			child_id: '0',
			vip: '',
			isShow: true,
			isShow1: false,
			downOption: {
				auto: false //是否在初始化后,自动执行downCallback; 默认true
			},
			upOption: {
				page: {
					num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					size: 10 // 每页数据的数量,默认10
				},
				noMoreSize: 1, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
				empty: {
					tip: '暂无相关数据'
				},
				textNoMore: '没有更多数据了'
			}
		};
	},
	onShow(e) {
		// console.log(e)
		// this.board_id == e
	},
	onLoad(e) {
		console.log(e,'*******************');
		console.log(e.bankId);
		this.imgUrl = helper.imgUrl;
		console.log(this.imgUrl);
		this.boardId = e.id || 0;

		this.bank_id = e.bankId || 0;
		this.child_id = e.childId || 0;
		// this.getList();
		uni.setNavigationBarTitle({
			title: e.name
		});
	},
	onLaunch() {},
	methods: {
		/*下拉刷新的回调 */
		downCallback() {
			this.mescroll.resetUpScroll()
		},
		 // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
		upCallback (page) {
			this.getList(page)
		},
		getList(page) {
			console.log(page,'-----------------------')
			let pageNum = page.num; // 页码, 默认从1开始
			let pageSize = page.size; // 页长, 默认每页10条
			uni.request({
				url: `${helper.requestUrl}/posts/board-posts`,
				method: 'GET',
				header: {
					authorization: app.globalData.token
				},
				data: {
					board_id: this.boardId,
					bank_id: this.bank_id,
					child_id: this.child_id,
					page_size: pageSize,
					page: pageNum
				},
				success: res => {
					res = helper.null2str(res);
					console.log(res);
					if (res.data.status_code == 200) {
						let curPageData = res.data.data
						let totalPage = res.data.total
						if(page.num == 1) this.list = []; 
						this.list = this.list.concat(curPageData);
						this.mescroll.endByPage(curPageData.length, totalPage); 
					} else if (res.data.status_code == 202) {
						this.vip = res.data.message;
						this.isShow1 = true;
						this.isShow = false;
					} else {
						uni.showToast({
							title: res.data.message
						});
					}
				}
			});
		},
		// 跳转详情
		goDetail(e) {
			uni.navigateTo({
				url: `/pages/articleDetail?id=${e}`
			});
		},
	},
};
</script>

<style>
.indexAccurate .contentList {
	width: 690rpx;
	padding: 10rpx 30rpx 30rpx;
}
.indexAccurate .contentList .item {
	display: flex;
	justify-content: space-between;
	margin-bottom: 40rpx;
}
.indexAccurate .contentList .item image {
	width: 202rpx;
	height: 150rpx;
	border-radius: 10rpx;
}
.indexAccurate .contentList .item .itemRight {
	width: 440rpx;
	display: flex;
	align-content: space-between;
	flex-wrap: wrap;
}
.indexAccurate .contentList .item .itemRight .title {
	font-size: 28rpx;
	color: #333333;
	font-weight: 600;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.indexAccurate .itemCon {
	width: 440rpx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	/* justify-content: flex-end; */
}
.indexAccurate .itemCon text {
	display: block;
	font-size: 24rpx;
	color: #999999;
}
.indexAccurate .itemCon text:nth-child(2) {
	width: 160rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	text-align: center;
}
.showModel {
	width: 750rpx;
	height: 100vh;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 9;
}
</style>
