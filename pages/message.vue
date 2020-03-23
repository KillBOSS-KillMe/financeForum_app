<template>
	<view class="message">
		<view class="bg"></view>
		<view class="list">
			<block v-for="(item,index) in list" :key="index">
				<view class="item" @tap="getDetail(index)">
					<view class="head">
						<image src="../static/user.png" mode=""></image>
						<text>系统通知</text>
					</view>
					<view class="contentItem">
						<text class="font">{{item.title}}</text>
						<view class="cur" v-if="item.is_read == '0'"></view>
					</view>
					<!-- <rich-text :nodes="item.title" class="font"></rich-text> -->
				</view>
			</block>
			<view class="null" v-if="list.length == 0">
				暂无数据
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	import helper from '../common/helper.js';
	export default {
		data() {
			return {
				list:[],
				page: '1'
			}
		},
		onShow() {
			this.getList()
		},
		methods: {
			getList(){
				uni.request({
					url: `${helper.requestUrl}/user/news-list`,
					method: 'GET',
					header: {
						authorization: app.globalData.token
					},
					data:{
						page_size: '20',
						page: this.page,
						
					},
					success: res => {
						// uni.hideLoading();
						res = helper.null2str(res);
						// console.log(res,'++++');
						if (res.data.status_code == 200) {
							this.list = res.data.data.data
							console.log(this.list)
						} else {

						}
					}
				});
			},
			getDetail(e){
				let obj = JSON.stringify(this.list[e])
				console.log(obj)
				uni.navigateTo({
					url:`/pages/messageDetail?obj=${obj}`
				})
				this.getType(this.list[e].id)
			},
			getType(typeId){
				uni.request({
					url: `${helper.requestUrl}/user/change_news_status`,
					method: 'POST',
					header: {
						authorization: app.globalData.token
					},
					data:{
						id: typeId
					},
					success: res => {
						res = helper.null2str(res);
					}
				});
			},
			onReachBottom() {
				this.page++;
				this.getList();
			}
		}
	}
</script>

<style>
.message{
	width: 750rpx;
}
.bg{
	width: 690rpx;
	padding: 30rpx;
	height: 30rpx;
	background: #2390DC;
}
.list{
	width: 690rpx;
	margin: 0 auto;
	margin-top: -60rpx;
}
.list .item{
	width: 642rpx;
	background: #ffffff;
	box-shadow: 0rpx 10rpx 35rpx 0rpx rgba(228,228,228,0.4); 
	border-radius: 10rpx;
	padding: 24rpx;
	margin-bottom: 30rpx;
}
.list .item .head{
	display: flex;
	align-items: center;
	margin-bottom: 16rpx;
}
.list .item .head image{
	width: 44rpx;
	height: 44rpx;
	border-radius: 44rpx;
	margin-right: 16rpx;
}
.list .item .head text{
	font-size: 24rpx;
	font-weight: 700;
	color: #666666;
}
.list .item .font{
	font-size: 20rpx;
	font-weight: 500;
	color: #666666;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 630rpx;
}
.list .item .content{
	display: flex;
	margin-top: 8rpx;
}
.list .item .content text{
	font-size: 20rpx;
	font-weight: 500;
	color: #666666;
}
.list .item .button{
	font-size: 20rpx;
	font-weight: 500;
	color: #2390DC;
	margin-top: 13rpx;
}
.cur{
	width: 14rpx;
	height: 14rpx;
	border-radius: 14rpx;
	background-color: red;
	content: '';
	display: block;
}
.contentItem{
	display: flex;
	align-items: center;
	justify-content: space-between;
}

</style>
