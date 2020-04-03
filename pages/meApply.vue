<template>
	<view class="apply">
		<!-- <pageSearch></pageSearch> -->
		<block v-for="(item,index) in collectionList" :key="index">
			<view class="collection">
				<text class="title">{{item.title}}</text>
				<view class="collectionList">
					<block  v-for="(childrenItem,childrenIndex) in item.children" :key="childrenIndex">
						<view class="item" @tap="go" :data-id="childrenItem.id" :data-extra="childrenItem.extra" :data-type="childrenItem.type" :data-name="childrenItem.title">
							<image class="img" :src="imgUrl+childrenItem.icon" mode=""></image>
							<text>{{childrenItem.title}}</text>
						</view>
					</block>
				</view>
			</view>
			<view class="line"></view>
		</block>
	</view>
</template>

<script>
	const app = getApp()
	import helper from '../common/helper.js';
	export default {
		data() {
			return {
				collectionList:[],
				imgUrl:'',
				is_member: '',
				token: ''
			}
		},
		onLoad() {
			this.token = uni.getStorageSync('token')
			this.getList();
			this.imgUrl = helper.imgUrl
		},
		methods: {
			// collectionList
			getList(){
				console.log(this.token)
				uni.request({
					url: `${helper.requestUrl}/system-tools/apps`,
					method: 'GET',
					header: {
						authorization: this.token
					},
					success: res => {
						// uni.hideLoading();
						res = helper.null2str(res)
						console.log(res)
						if (res.data.status_code == 200) {
							this.collectionList = res.data.data
							this.is_member = res.data.is_member
						} else {
							// uni.showToast({
							// 	title: res.data.message
							// });
						}
				
					}
				})
			},
			go(e){
				let type = e.currentTarget.dataset.type
				let extra = e.currentTarget.dataset.extra
				let id = e.currentTarget.dataset.id
				let name = e.currentTarget.dataset.name
				console.log(type, extra, id, name)
				if(type == 'block'){
					if (extra != '') {
						if(name == '会员区别'){
							uni.navigateTo({
								url:`/pages/articleDetail?id=189`
							})
						} else if(name == '推广返佣'){
							if(this.is_member == 1){
								// 会员
								uni.navigateTo({
									url:`/pages/${extra}`
								})
							}else{
								uni.showToast({
									title: '您不是会员，暂无此权限',
									icon: "none",
									duration: 2000
								})
							}
						}else{
							uni.navigateTo({
								url:`/pages/${extra}`
							})
						}
						
					} else {
						uni.showToast({
							title: '此页面不存在'
						});
					}
				} else if(type == 'series'){
					
				} else if(type == 'post'){
					uni.navigateTo({
						url:`/pages/articleDetail?id=${id}`
					})
					// 帖子
				} else if(type == 'child'){
					// 应用子
					console.log(id)
					uni.navigateTo({
						url:`/pages/applyShow?id=${id}&name=${name}`
					})
				} else if(type == 'ex_link'){
					if(extra == ''){
						uni.showToast({
							title: '此页面不存在',
							icon: 'none'
						})
					}else{
						// #ifdef MP-WEIXIN
								uni.showToast({
									title:'该小程序在不支持，请下载App',
									icon: 'none'
								})
						// #endif
						// #ifdef APP-PLUS || H5
								app.globalData.link = extra
								uni.navigateTo({
									url:`/pages/iframe?name=${name}`
								})
								
						// #endif
					}
					// plus.runtime.openURL(extra)
					// window.location.href = extra
					// 外联
				} else if(type == 'category'){
					uni.navigateTo({
						url:`/pages/applyShow?id=${id}&name=${name}`
					})
				}
				console.log(e)
			}
		}
	}
</script>

<style>
.apply{
	width: 750rpx;
}
.collection{
	width: 690rpx;
	padding: 30rpx 30rpx 0;
}
.collection .title{
	color: #333333;
	font-size: 32rpx;
	font-weight: 600;
}
.collectionList{
	margin: 30rpx 0;
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
}
.collectionList .item{
	/* margin-right: ; */
	width: 131rpx;
	margin:0 8rpx 30rpx 0;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
}
.collectionList .item:nth-child(5n){
	margin-right: 0;
}
.collectionList .item image{
	width: 96rpx;
	height: 96rpx;
	border-radius: 50rpx;
	display: block;
}
.collectionList .item text{
	display: block;
	font-size: 28rpx;
	color: #333333;
	font-weight: 600;
	margin-top: 16rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.line{
	width: 750rpx;
	background: #F9F9F9;
	height: 6rpx;
}
</style>
