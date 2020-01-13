<template>
	<view class="meTeamList">
		<block v-for="(item,index) in list" :key="index">
			<view class="item">
				<view class="left">
					<image v-if="item.avatar != ''" :src="imgUrl + item.avatar" mode=""></image>
					<image v-else src="../static/user.png" mode=""></image>
					<view class="info">
						<text class="title">{{item.name}}</text>
						<view>
							<text v-if="item.type == 'normal'">{{item.deploy.userlevel.level_name}}</text>
							<text style="background-color: #C6A25D;" v-if="item.type == 'member'">{{item.deploy.vipuserlevel.level_name}}</text>
							<text v-show="item.invitees_level == 0">团队长</text>
						</view>
						<text class="time">加入时间：{{item.created_at}}</text>
					</view>
				</view>
				<view class="tel" @tap="getTel(item.mobile)">
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
				is_get_leader: ''   //0所有 1团队长
			}
		},
		onLoad(e) {
			console.log(e)
			uni.setNavigationBarTitle({
			    title: e.name
			});
			if(e.name == '团队长列表'){
				this.is_get_leader = '0'
			}else{
				this.is_get_leader = '1'
			}
			this.getTeam()
			this.imgUrl = helper.imgUrl;
		},
		methods: {
			// 打电话
			getTel(e){
				uni.makePhoneCall({
				    phoneNumber: e //仅为示例
				});
			},
			// 获取团队总人数
			getTeam(){
				uni.request({
					url: `${helper.requestUrl}/user/team-list`,
					method: 'GET',
					header: {
						authorization: app.globalData.token
					},
					data: {
						page: this.page,
						page_size: '20',
						is_get_leader: this.is_get_leader
					},
					success: res => {
						// uni.hideLoading();
						res = helper.null2str(res);
						console.log(res);
						if (res.data.status_code == 200) {
							this.list = res.data.data
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
				this.getTeam()
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
