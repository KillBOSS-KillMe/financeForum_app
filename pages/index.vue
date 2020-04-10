<template>
	<view class="index">
	<!-- 	<pageSearch></pageSearch> -->
		<!-- 轮播 -->
		<view class="page-section-spacing banner">
			<swiper class="swiper" :indicator-dots="indicatorDots" indicator-color="rgba(255,255,255,.3)" indicator-active-color="#fff"
			 :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="(item, index) in pageNode.ad.aditems" :key="index">
					<image class="bannerImg" :data-id="item.id" :data-link="item.link" :src="imgUrl + item.image" mode="aspectFill"
					 @tap="goBanner"></image>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="nav">
			<view class="nav-left">
				<scroll-view scroll-y>
					<view class="nav-left-item" v-for="(item,index) in categoryList" @click="categoryMainClick(item.id,index,item.title)" :key="index"
					 :style="index==categoryActive?'color:'+activeTextColor+';background-color:'+activeBackgroundColor:''">
						{{item.title}}
					</view>
				</scroll-view>
			</view>
			<view class="nav-right">
				<scroll-view  scroll-y="true"  @scrolltolower="toLowFun">
					<view class="nav-right-item" v-for="(item,index2) in subCategoryList" :key="index2" @click="categorySubClick(item)">
						<image :src="imgUrl+item.photoalbums[0].path" />
						<view class="navRightContent">
							<text>{{item.title}}</text>
							<view class="applyInfo">
								<text class="time">{{item.created_at}}</text>
								<text class="name">{{item.user.name}}</text>
								<text>评{{item.comments_count}}</text>
							</view>
						</view>
					</view>
					<view class="null" v-if="isShow">暂无数据</view>
				</scroll-view>
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
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				pageNode: [],
				imgUrl: '',
				categoryList:[],
				subCategoryList:[],
				page: '1',
				page_size: '10',
				boardId: '',
				categoryActive: 0,
				activeStyle: {
					color: this.activeTextColor,
					backgroundColor: this.activeBackgroundColor
				},
				vip:'',
				token: '',
				isShow: true,
			};
		},
		props: {
			//主分类激活索引
			defaultActive: {
				type: Number,
				default: 0
			},
			activeTextColor: {
				type: String,
				default: '#333'
			},
			activeBackgroundColor: {
				type: String,
				default: '#ffffff'
			},
		},
		onLaunch() {
			  
		},
		onShow() {
			
		},
		onHide() {
			
		},
		onShareAppMessage(){
			return {
				title: '子诺新微金分享',
				path: 'pages/index'
			}
		},
		onLoad() {
			this.token = uni.getStorageSync('token')
			this.imgUrl = helper.imgUrl
			this.getNav()
			this.categoryActive = 0
			this.subCategoryList = []
			this.getList()
		},
		methods: {
			// 是否获取过token
			getIsToken(){
				if (this.token == "") {
					// 获取缓存中用于登录的用户名和密码
					// 如果没有缓存信息,不进行登录,用户点击操作时,提示进入登录页
					const loginName = uni.getStorageSync('login_name');
					const loginPwd = uni.getStorageSync('login_pwd');
					// console.log(loginName + '---===---' + loginPwd)
					if (loginName == '' || loginPwd == '') {
						uni.showToast({
							title: '未检测到用户的登录记录，请进行登录',
							icon: 'none',
							duration: 3000
						});
						setTimeout(() => {
							// 进入登录页
							uni.reLaunch({
								url: './login'
							});
						}, 3000)
						
					} else {
						// 执行登录操作
						this.runLogin(loginName, loginPwd)
					}
				} else {
					// 获取用户信息
					this.getUserInfo()
					// this.getList()
				}
			},
			// 进行登录操作
			runLogin(loginName, loginPwd) {
				uni.request({
					url: `${helper.requestUrl}/login`,
					method: 'POST',
					data: {
						username: loginName,
						password: loginPwd
					},
					success: res => {
						console.log(res);
						uni.hideLoading();
						res = helper.null2str(res)
						if (res.statusCode == 200) {
							// 登录的账号和密码存入缓存
							uni.setStorageSync('login_name', this.loginName);
							uni.setStorageSync('login_pwd', this.loginPaw);
							this.token = `${res.data.token_type} ${res.data.access_token}`
							uni.setStorageSync('token', this.token);
							
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'none',
								duration: 3000
							});
							setTimeout(() => {
								// 进入登录页
								uni.reLaunch({
									url: './login'
								});
							}, 3000)
						}
					}
				});
			},
			categoryMainClick(id,index,name){
				this.boardId = id
				this.page = '1'
				this.page_size = '10'
				this.subCategoryList = []
				this.categoryActive = index;
				this.getNavList()
			},
			categorySubClick(e){
				// console.log(e);
				if (this.token == "") {
					const loginName = uni.getStorageSync('login_name');
					const loginPwd = uni.getStorageSync('login_pwd');
					// console.log(loginName + '---===---' + loginPwd)
					if (loginName == '' || loginPwd == '') {
						uni.showToast({
							title: '未检测到用户的登录记录，请进行登录',
							icon: 'none',
							duration: 3000
						});
						setTimeout(() => {
							// 进入登录页
							uni.reLaunch({
								url: './login'
							});
						}, 2000)
						
					} else {
						// 执行登录操作
						this.runLogin(loginName, loginPwd)
						uni.navigateTo({
							url:`/pages/articleDetail?id=${e.id}`
						})
					}
				}else{
					
					uni.navigateTo({
						url:`/pages/articleDetail?id=${e.id}`
					})
				}
			},
			// 获取导航
			getNav(){
				uni.request({
					url: `${helper.requestUrl}/board/boards`,
					method: 'GET',
					header: {
						authorization: this.token
					},
					success: res => {
						res = helper.null2str(res)
						console.log(res)
						if (res.data.status_code == 200) {
							this.categoryList = res.data.data
							this.boardId = res.data.data[0].id
							this.getNavList()
							// console.log(this.boardId)
						} else {
							if(res.data.message == '用户不存在或登陆已过期'){
								uni.showToast({
									title: '未检测到用户的登录记录，请进行登录',
									icon: 'none',
									duration: 3000
								});
								setTimeout(() => {
									// 进入登录页
									uni.reLaunch({
										url: './login'
									});
								}, 3000)
							}else{
								uni.showToast({
									title: res.data.message,
									icon: 'none',
									duration: 3000
								});
							}
						}
				
					}
				})
			},
			//获取数据
			getNavList(){
				uni.request({
					url: `${helper.requestUrl}/posts/board-posts`,
					method: 'GET',
					header: {
						authorization: this.token
					},
					data:{
						board_id: this.boardId,
						page_size: this.page_size,
						page: this.page
					},
					success: res => {
						res = helper.null2str(res)
						console.log(res)
						if (res.data.status_code == 200) {
							 this.subCategoryList = this.subCategoryList.concat(res.data.data)
							 if(res.data.data == 0){
							 	uni.showToast({
							 		title:'暂无更多数据',
							 		icon:"none"
							 	})
								this.isShow = true
								// console.log(this.isShow )
							 }else{
								 this.isShow =false
							 }
							
						} else if(res.data.status_code == 202) {
							this.vip = res.data.message
							this.isShow = false
						}else{
							uni.showToast({
								title: res.data.message,
								icon:'none',
								duration:2000
							});
						}
				
					}
				})
			},
			toLowFun() {
				this.page++;
				this.getNavList()
			},
			// 导航详情
			goNavs(e) {
				let link = e.currentTarget.dataset.link
				let bind_board = e.currentTarget.dataset.bind_board
				let id = e.currentTarget.dataset.id
				let name = e.currentTarget.dataset.name
				if (this.token == "") {
					const loginName = uni.getStorageSync('login_name');
					const loginPwd = uni.getStorageSync('login_pwd');
					// console.log(loginName + '---===---' + loginPwd)
					if (loginName == '' || loginPwd == '') {
						uni.showToast({
							title: '未检测到用户的登录记录，请进行登录',
							icon: 'none',
							duration: 3000
						});
						setTimeout(() => {
							// 进入登录页
							uni.reLaunch({
								url: './login'
							});
						}, 2000)
					} else {
						// 执行登录操作
						this.runLogin(loginName, loginPwd)
						if (bind_board == '0') {
							uni.navigateTo({
								url: `/pages/${link}`
							})
						} else{
							uni.navigateTo({
								url: `/pages/indexA?id=${bind_board}&name=${name}`
							})
						}
					}
				}else{
					if (bind_board == '0') {
						uni.navigateTo({
							url: `/pages/${link}`
						})
					} else{
						uni.navigateTo({
							url: `/pages/indexA?id=${bind_board}&name=${name}`
						})
					}
				}
				// console.log(e.currentTarget.dataset.id)
				
				// console.log(bind_board)
			},
			// 轮播跳转
			goBanner(e) {
				// console.log(e)
			},
			// 文章详情
			goDetail(e) {
				if (this.token == "") {
					const loginName = uni.getStorageSync('login_name');
					const loginPwd = uni.getStorageSync('login_pwd');
					// console.log(loginName + '---===---' + loginPwd)
					if (loginName == '' || loginPwd == '') {
						uni.showToast({
							title: '未检测到用户的登录记录，请进行登录',
							icon: 'none',
							duration: 3000
						});
						setTimeout(() => {
							// 进入登录页
							uni.reLaunch({
								url: './login'
							});
						}, 2000)
						
					} else {
						// 执行登录操作
						this.runLogin(loginName, loginPwd)
						uni.navigateTo({
							url: `/pages/articleDetail?id=${e.currentTarget.dataset.id}`
						})
					}
				}else{
					uni.navigateTo({
						url: `/pages/articleDetail?id=${e.currentTarget.dataset.id}`
					})
				}
				
			},
			getUserInfo() {
				// 用户信息获取
				uni.showLoading({
				  title: '用户信息获取中...'
				});
				uni.request({
					url: `${helper.requestUrl}/me`,
					method: 'POST',
					header: {
						authorization: this.token
					},
					success: res => {
						uni.hideLoading();
						res = helper.null2str(res)
						console.log(res,'++++++++')
						this.userInfo = res.data
						app.globalData.userInfo = res.data
						console.log(this.userInfo.mobile)
					}
				})
			},
			//获取数据
			getList() {
				uni.showLoading({
				  title: '加载中...',
					duration: 1000000
				});
				uni.request({
					url: `${helper.requestUrl}/index`,
					method: 'GET',
					header: {
						authorization: this.token
					},
					success: res => {
						uni.hideLoading();
						res = helper.null2str(res)
						if (res.data.status_code == 200) {
							let pageNode = res.data.data
							this.pageNode = pageNode
						} else {
							uni.showToast({
								title: res.data.message
							});
						}

					}
				})
			},
		}
	}
</script>

<style>
	.index {
		width: 750rppx;
		height: 100vh;
		overflow: hidden;
	}

	.banner {
		width: 690rpx;
		margin: 30rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.bannerImg {
		width: 690rpx;
	}
	.swiper{
		width: 690rpx;
		height:300rpx;
		overflow: hidden;
		border-radius: 10rpx;
	}
	swiper-item{
		width: 690rpx;
		height:300rpx;
		overflow: hidden;
		border-radius: 10rpx;
	}
	.nav {
			display: flex;
			height: calc(100vh - 200px);
			width: 750rpx;
		}
		scroll-view {
			height: 100%;
		}
		.nav-left {
			width: 190rpx;
		
		}
		.nav-left-item {
			height: 92rpx;
			font-size: 26rpx;
			display: flex;
			align-items: center;
			justify-content: center;
				background: #2390dc;
				color: #fff;
		}
		.nav-right {
			width: 510rpx;
			padding: 22rpx 0 0 22rpx;
			/* height: 97vh; */
		}
	
		.nav-right-item {
			display: flex;
			justify-content: flex-start;
			margin: 0 0 30rpx;
			width: 504rpx;
		}
		.navRightContent{
			width: 440rpx;
			display: flex;
			align-content: space-between;
			flex-wrap: wrap;
		}
		.navRightContent>text{
			font-size: 26rpx;
			color: #333333;
			font-weight: 600;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.nav-right-item image {
			width: 130rpx;
			height: 110rpx;
			border-radius: 8rpx;
			margin-right: 16rpx;
		}
		.applyInfo{
			display: flex;
			justify-content: space-between;
			width: 354rpx;
		}
		.applyInfo>text{
			display: block;
			font-size: 22rpx;
			color: #999999;
		}
		.name{
			width: 90rpx;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}
		.time{
			width: 150rpx;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}
		.active {
			color: #2390DC;
		}
	
		.padding {
			height: var(--status-bar-height);
			width: 100%;
			top: 0;
			position: fixed;
			background-color: #F24544;
		}
</style>
