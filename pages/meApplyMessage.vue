<template>
	<view class="meMessage">
	<!-- 	<view v-if="type == '3'">
			<block v-for="(item,index) in list" :key="index">
				<view class="item">
					<view>
						<image :src="imgUrl+item.img" mode=""></image>
						<view class="right">
							<text class="title">{{item.title}}</text>
							<text>{{item.content}}</text>
						</view>
					</view>
				</view>
			</block>
		</view> -->
		<view v-if="type == '2'">
			<block v-for="(item,index) in list" :key="index">
				<view class="comment">
					<view>
						<text class="title">{{item.post.title}}</text>
						<text class="commentContent">{{item.content}}</text>
						<text class="commentTime">{{item.created_at}}</text>
					</view>
				</view>
			</block>
		</view>
		<view v-if="type == '1'">
			<block v-for="(item,index) in list" :key="index">
				<view class="item">
					<view>
						<image :src="imgUrl + item.about.theme_pic" mode=""></image>
						<view class="right">
							<text class="title">{{item.about.title}}</text>
							<text>提到了我</text>
							<text>{{item.about.updated_at}}</text>
						</view>
					</view>
				</view>
			</block>
		</view>
		<view class="null" v-if="list.length == '0'">暂无数据</view>
	</view>
</template>

<script>
	const app = getApp()
	import helper from '../common/helper.js';
	export default {
		data() {
			return {
				list:[],
				type: '',
				imgUrl: ''
			}
		},
		onLoad(options) {
			console.log(options)
			uni.setNavigationBarTitle({
				title: options.title
			})
			this.type = options.type
			this.getList()
			this.imgUrl = helper.imgUrl
		},
		methods: {
			getList(){
				let url = ''
				if(this.type == '1'){
					url='abouts'
				} else if(this.type == '2'){
					url='comments'
				} else if(this.type == '3'){
					url='news-list'
				}
				uni.request({
					url: `${helper.requestUrl}/user/${url}`,
					method: 'GET',
					header: {
						authorization: app.globalData.token
					},
					// data: {
					// 	page: 1,
					// 	page_size: 5
					// },
					success: res => {
						// uni.hideLoading();
						res = helper.null2str(res);
						console.log(res);
						if (res.data.status_code == 200) {
							this.list = res.data.data;
						} else {
							// uni.showToast({
							// 	title: res.data.message
							// });
						}
					}
				});
			}
		}
	}
</script>

<style>
.meMessage{
	width: 690rpx;
	padding:30rpx;
}
.meMessage .item{
	border: 1rpx solid #F8F8F8;
	border-radius: 10rpx;
	padding: 30rpx;
	margin-top: 20rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.meMessage .item>view{
	display: flex;
	align-items: center;
}
.meMessage .item>view>text{
	color: #333333;
	font-size: 34rpx;
	font-weight: 600;
	margin-left: 20rpx;
}
.meMessage .item image{
	width: 96rpx;
	height: 96rpx;
	border-radius: 96rpx;
	margin-right: 20rpx;
}
.right .title{
	font-size: 30rpx;
	font-weight: 700;
	color: #333;
}
.right text{
	font-size: 26rpx;
	font-weight: 400;
	color: #666666;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.comment{
	width: 690rpx;
	padding: 20rpx 0;
	color: #666;
}
.comment .title{
	font-size: 28rpx !important;
	color: #000000;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.commentContent{
	-webkit-line-clamp: 2;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis; 
	font-size: 26rpx;
	color: #000000;
	margin: 10rpx 0;
}
.commentTime{
	font-size: 24rpx;
}
</style>
