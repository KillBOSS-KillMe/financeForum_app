<template>
	<view class="meTeamList">
		<block v-for="(item,index) in list" :key="index">
			<view class="item" @tap="getDetail" :data-index='indexType' :data-item="item">
				<view class="left">
					<image v-if="item.avatar != ''" :src="imgUrl + item.avatar" mode=""></image>
					<image v-else src="../static/user.png" mode=""></image>
					<view class="info">
						<text class="title">{{item.name}}</text>
						<text class="time">加入时间：{{item.created_at}}</text>
					</view>
				</view>
				<view class="tel" @tap.stop="getTel(item.mobile)">
					<uni-icons type="" class="iconfont icondianhua"></uni-icons>
				</view>
			</view>
		</block>
		<view class="null" v-if="list.length == 0">
			暂无数据
		</view>
	</view>
</template>

<script>
	const app = getApp();
	import helper from '../common/helper.js';
	export default {
		data() {
			return {
				list: [],
				imgUrl: '',
				page: '1',
				indexType: '',
				token: ''
			}
		},
		onLoad(e) {
			// console.log(e)
			this.token = uni.getStorageSync('token')
			this.imgUrl = helper.imgUrl;
			this.indexType = e.index
			let name = ''
			if(this.indexType == 'one'){
				name = '一级代理',
				this.getTeamOne()
			} else if(this.indexType == 'two'){
				name = '二级代理',
				this.getTeamTwo()
			}
			uni.setNavigationBarTitle({
			    title: name
			});
		},
		methods: {
			// 打电话
			getTel(e){
				uni.makePhoneCall({
				    phoneNumber: e //仅为示例
				});
			},
			getDetail(i){
				let index = i.currentTarget.dataset.index
				let itemNew = JSON.stringify(i.currentTarget.dataset.item)
				uni.navigateTo({
					url:`/pages/teamPeopleDetail?itemDetail=${itemNew}&index=${index}`
				})
			},
			getTeamOne(){
				uni.request({
					url: `${helper.requestUrl}/user/team-list-one`,
					method: 'POST',
					header: {
						authorization: this.token
					},
					data: {
						page: this.page,
						page_size: '20'
					},
					success: res => {
						// uni.hideLoading();
						res = helper.null2str(res);
						console.log(res,'8');
						if (res.statusCode == 200) {
							this.list = res.data.datas.one.data
						} else {
							// uni.showToast({
							// 	title: res.data.message
							// });
						}
					}
				});
			},
			getTeamTwo(){
				uni.request({
					url: `${helper.requestUrl}/user/team-list-two`,
					method: 'POST',
					header: {
						authorization: this.token
					},
					data: {
						page: this.page,
						page_size: '20'
					},
					success: res => {
						// uni.hideLoading();
						res = helper.null2str(res);
						console.log(res,'8');
						if (res.statusCode == 200) {
							this.list = res.data.datas.two.data
						} else {
							// uni.showToast({
							// 	title: res.data.message
							// });
						}
					}
				});
			},
			onReachBottom(){
				this.page ++;
				this.getTeamOne()
				this.getTeamTwo()
			}
		}
	}
</script>

<style>
.meTeamList{
	width: 750rpx;
	padding: 16rpx 0 30rpx;
}
.item{
	width: 650rpx;
	margin: 30rpx 30rpx 0;
	background: #ffffff;
	border-radius: 10rpx;
	box-shadow: 10rpx 10rpx 44rpx 0rpx #ededed; 
	padding: 20rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	align-content: center;
}
.item .left{
	width: 580rpx;
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
}
.item .left image{
	width: 64rpx;
	height: 64rpx;
	border-radius: 64rpx;
	overflow: hidden;
	background-color: #000000;
	margin-right: 20rpx;
}
.info .title{
	font-size: 24rpx;
	font-weight: 700;
	color: #666666;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.info>view{
	display: flex;
	margin: 10rpx 0;
}
.info>view text{
	background-color: #2390DC;
	color: #FFFFFF;
	font-size: 18rpx;
	margin-right: 16rpx;
	padding: 6rpx 16rpx;
	border-radius: 5rpx;
}
.info .time{
	font-size: 20rpx;
	color: #666666;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin-top: 15rpx;
}
.item .tel{
	width: 62rpx;
	height: 62rpx;
	background: #0076ff;
	border-radius: 62rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.item .tel .iconfont{
	color: #fff;
	font-size: 40rpx;
	font-weight: 600;
	text-align: center;
}
</style>
