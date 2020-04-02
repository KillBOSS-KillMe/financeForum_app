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
		<!-- 导航 -->
		<view class="nav">
			<block v-for="(item, index) in pageNode.navs" :key="index">
				<view class="navList" :data-bind_board="item.bind_board" :data-id="item.id" :data-name="item.name" :data-link="item.link" @tap="goNavs">
					<image :src="imgUrl + item.icon" mode="aspectFill"></image>
					<text>{{ item.name }}</text>
				</view>
			</block>
		</view>
		<!-- 数据列表 -->
		<view class="content">
			<view class="inv-h-w">
				<block v-for="(item, index) in pageNode.board_data" :key="index">
					<view :class="['inv-h', Inv == index ? 'inv-h-se' : '']" @tap="selListType" :data-index="index" :data-block_id="item.id">{{ item.title }}</view>
				</block>
			</view>
			<view class="contentList">
				<block v-for="(item, index) in listNode" :key="index">
					<view class="item" @tap="goDetail" :data-id="item.id">
						<image :src="imgUrl + item.photoalbums[0].path" mode="aspectFill" v-if="item.photoalbums.length > 0"></image>
						<image src="../static/imgLost.png" mode="aspectFill" v-else></image>
						<view class="itemRight">
							<text class="title">{{ item.title }}</text>
							<view class="itemCon">
								<text>{{ item.created_at }}</text>
								<text>{{item.user.name}}</text>
								<text>{{item.comments_count}}评</text>
							</view>
						</view>
					</view>
				</block>
				<view class="null" v-if="pageNode.board_data[Inv].posts.length == 0">暂无数据</view>
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
				Inv: 0,
				boardId: '',
				pageNode: [],
				imgUrl: '',
				page_size: 5,
				page:1,
				listNode: []
			};
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
			this.imgUrl = helper.imgUrl
			// this.getUserInfo()
			// this.getListMore()
			this.getList()
		},
		methods: {
			// 是否获取过token
			getIsToken(){
				if (app.globalData.token == "") {
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
							app.globalData.token = `${res.data.token_type} ${res.data.access_token}`
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
			// 导航详情
			goNavs(e) {
				let link = e.currentTarget.dataset.link
				let bind_board = e.currentTarget.dataset.bind_board
				let id = e.currentTarget.dataset.id
				let name = e.currentTarget.dataset.name
				if (app.globalData.token == "") {
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
			//
			selListType(e) {
				this.Inv = e.currentTarget.dataset.index
				this.boardId = e.currentTarget.dataset.block_id
				// console.log(this.boardId,'222')
				this.page = '1'
				this.listNode = []
				this.getListMore()
			},
			// 轮播跳转
			goBanner(e) {
				// console.log(e)
			},
			// 文章详情
			goDetail(e) {
				if (app.globalData.token == "") {
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
						authorization: app.globalData.token
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
						authorization: app.globalData.token
					},
					success: res => {
						uni.hideLoading();
						res = helper.null2str(res)
						if (res.data.status_code == 200) {
							let pageNode = res.data.data
							this.pageNode = pageNode
							if (pageNode.board_data.length > 0){
								// this.boardId = pageNode.board_data[0].block_id
								this.boardId = pageNode.board_data[0].id
								console.log(this.boardId,'999')
								this.getListMore()
							}
						} else {
							uni.showToast({
								title: res.data.message
							});
						}

					}
				})
			},
			//加载更多
			onReachBottom() {
				// console.log(this.boardId)
				this.page ++;
				// console.log(this.page)
				// console.log(this.pageNode.board_data[Inv].block_id)
				uni.showLoading({
				  title: '加载中...',
					duration: 1000000
				});
				this.getListMore()
			},
			getListMore(){
				uni.request({
					url: `${helper.requestUrl}/index-board-posts`,
					method: 'GET',
					header: {
						authorization: app.globalData.token
					},
					data: {
						board_id: this.boardId,
						page_size:this.page_size,
						page:this.page
					},
					success: res => {
						uni.hideLoading();
						res = helper.null2str(res)
						if (res.data.status_code == 200) {
							console.log('888',res.data.data)
							console.log(this.pageNode.board_data[this.Inv].posts,'*****')
							if (res.data.data.length > 0) {
								this.listNode = this.listNode.concat(res.data.data)
								// this.pageNode.board_data[this.Inv].posts = this.pageNode.board_data[this.Inv].posts.concat(res.data.data)
								
								// console.log('//',this.pageNode)
								// console.log(res.data.data)
								// this.pageNode = this.pageNode.concat(res.data.data)
								// console.log(this.pageNode)
							} else {
								uni.showToast({
									title:"没有更多数据了",
									icon:"none"
								})
							}
						} else {
							uni.showToast({
								title: res.data.message
							});
						}
				
					}
				})
			}
		}
	}
</script>

<style>
	.index {
		width: 750rppx;
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
		width: 690rpx;
		padding: 30rpx 30rpx 0;
		/* background: #007AFF; */
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		border-bottom: 12rpx solid #f9f9f9;
	}

	.nav .navList {
		width: 116rpx;
		margin-right: 27.99rpx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		margin-bottom: 38rpx;
	}

	.nav .navList:nth-child(5n) {
		margin-right: 0;
	}

	.nav .navList text {
		font-size: 28rpx;
		color: #333333;
		font-weight: 600;
		display: block;
	}

	.nav .navList image {
		width: 50rpx;
		height: 50rpx;
		margin-bottom: 14rpx;
	}

	.content {
		width: 690rpx;
		padding: 0 30rpx;
	}

	.content .inv-h-w {
		display: flex;
	}

	.content .inv-h {
		font-size: 32rpx;
		flex: 1;
		text-align: center;
		color: #999999;
		padding: 20rpx 0 30rpx;
	}

	.content .inv-h-se {
		color: #2390dc;
		font-weight: 600;
	}

	.content .inv-h-se:after {
		content: ' ';
		display: block;
		border-bottom: 6rpx solid #2390dc;
		width: 46rpx;
		margin: 26rpx auto 0;
		border-radius: 3rpx;
	}

	.content .contentList .item {
		display: flex;
		justify-content: space-between;
		margin-bottom: 40rpx;
	}

	.content .contentList .item image {
		width: 220rpx;
		height: 136rpx;
		border-radius: 10rpx;
	}

	.content .contentList .item .itemRight {
		width: 440rpx;
		display: flex;
		align-content: space-between;
		flex-wrap: wrap;
	}

	.content .contentList .item .itemRight .title {
		font-size: 28rpx;
		color: #333333;
		font-weight: 600;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.content .itemCon {
		width: 440rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		/* justify-content: flex-end; */
	}

	.content .itemCon text {
		display: block;
		font-size: 24rpx;
		color: #999999;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
</style>
