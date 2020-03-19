<template>
	<view class="teamList">
		<block v-for="(item,index) in list" :key="index">
			<view class="team">
				<view class="head">
					<text class="title" v-if="index == 'one'">一级代理</text>
					<text class="title" v-if="index == 'two'">二级代理</text>
					<view @tap="getMore(index)"> 查看更多 >></view>
				</view>
				<view class="list">
					<block v-for="(itemList,indexList) in item.data" :key="indexList">
						<view class="item" @tap="userDetail" :data-item='itemList' :data-index='index'>
							<image :src="imgUrl+itemList.avatar" mode=""></image>
							<text>{{itemList.name}}</text>
						</view>
					</block>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	const app = getApp();
	import helper from '../common/helper.js';
	export default {
		data() {
			return {
				list:[],
				imgUrl: ''
			}
		},
		onLoad() {
			this.imgUrl = helper.imgUrl;
			this.getList()
		},
		
		methods: {
			// 获取数据
			getList(){
				uni.request({
					url: `${helper.requestUrl}/promote-teamlist`,
					method: 'GET',
					header: {
						authorization: app.globalData.token
					},
					success: res => {
						// uni.hideLoading();
						res = helper.null2str(res);
						console.log(res,'****');
						if (res.data.status_code == 200) {
							this.list = res.data.datas;
						} else {
							// uni.showToast({
							// 	title: res.data.message
							// });
						}
					}
				});
			},
			getMore(e){
				console.log(e)
				uni.navigateTo({
					url: `/pages/meTeamList?index=${e}`
				})
			},
			userDetail(i){
				console.log(i)
				
				let index = i.currentTarget.dataset.index
				let itemNew = JSON.stringify(i.currentTarget.dataset.item)
				uni.navigateTo({
					url:`/pages/teamPeopleDetail?itemDetail=${itemNew}&index=${index}`
				})
			}
		}
	}
</script>

<style>
.teamList{
	width: 690rpx;
	padding: 30rpx;
}
.team{
	width: 650rpx;
	/* height: 238rpx; */
	background: #ffffff;
	box-shadow: 0rpx 10rpx 44rpx 0rpx rgba(205,205,205,0.45); 
	padding: 20rpx;
	margin-bottom: 30rpx;
}
.title{
	font-size: 28rpx;
	font-weight: 700;
	color: #666666;

}
.head{
	display: flex;
	justify-content: space-between;
	border-bottom: 2rpx solid #eee;
	padding: 10rpx 0;
	margin-bottom: 20rpx;
	
}
.head view{
	font-size: 24rpx;
	font-weight: 700;
	color: #999;
}
.list{
	display: flex;
	flex-wrap: wrap;
}
.list .item{
	margin:0 10rpx 16rpx 0;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	width: 134rpx;
}
.list .item:nth-child(5n){
	margin-right: 0;
}
.list .item image{
	width: 86rpx;
	height: 86rpx;
	border-radius: 86rpx;
}
.list .item text{
	font-size: 24rpx;
	font-weight: 700;
	color: #666666;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin-top: 6rpx;
}
</style>
