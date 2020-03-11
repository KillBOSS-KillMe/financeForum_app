<template>
	<view>
		<view class="nav">
			<view class="nav-left">
				<scroll-view scroll-y :style="'height:'+height+'px'">
					<view class="nav-left-item" v-for="(item,index) in categoryList" @click="categoryClickMain(item.id,index)" :key="index"
					 :style="index==categoryActive?'color:'+activeTextColor+';background-color:'+activeBackgroundColor:''">
						{{item.title}}
					</view>
				</scroll-view>
			</view>
			<view class="nav-right">
				<scroll-view scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:'+height+'px'" scroll-with-animation>
					<view class="nav-right-item" v-for="(item,index2) in subCategoryList" :key="index2" @click="categoryClickSub(item)">
						<image :src="'http://jinrong.beaconway.cn/uploads/'+item.photoalbums[0].path" />
						<view class="navRightContent">
							<text>{{item.title}}</text>
							<view class="applyInfo">
								<text class="time">{{item.created_at}}</text>
								<text class="name">{{item.user.name}}</text>
								<text>评{{item.comments_count}}</text>
							</view>
						</view>
						<view class="null" v-if="subCategoryList.length == 0">暂无数据</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "category",
		data() {
			return {
				height: 0,
				scrollTop: 0,
				scrollHeight: 0,
				categoryActive: 0,
				activeStyle: {
					color: this.activeTextColor,
					backgroundColor: this.activeBackgroundColor
				},
				imgUrl: ''
			}
		},
		props: {
			//主分类激活索引
			defaultActive: {
				type: Number,
				default: 0
			},
			//主分类List
			categoryList: {
				type: Array,
				default: () => {
					return null;
				}
			},
			//侧边分类List
			subCategoryList: {
				type: Array,
				default: () => {
					return null;
				}
			},
			activeTextColor: {
				type: String,
				default: '#2390DC'
			},
			activeBackgroundColor: {
				type: String,
				default: '#e5e5e5'
			},
			//主分类点击事件
			categoryMainClick: {},
			//子分类点击事件
			categorySubClick: {}
		},
		methods: {
			scroll(e) {
				this.scrollHeight = e.detail.scrollHeight;
			},
			categoryClickMain(category, index) {
				this.$emit('categoryMainClick',category)
				this.categoryActive = index;
				this.scrollTop = -this.scrollHeight * index;
			},
			categoryClickSub(category) {
				this.$emit('categorySubClick',category)
			}
		},
		mounted() {
			this.categoryActive = this.defaultActive
			uni.getSystemInfo({
				success: res => {
					this.height = res.screenHeight;
				}
			})
		},
		watch: {
			subCategoryList(newValue, oldValue) {
				
			}
		},
	}
</script>

<style scoped>
	.nav {
		display: flex;
		width: 750rpx;
	}

	.nav-left {
		width: 190rpx;
	}

	.nav-left-item {
		height: 92rpx;
		border-right: solid 1px #E0E0E0;
		border-bottom: solid 1px #E0E0E0;
		font-size: 26rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nav-right {
		width: 510rpx;
		padding: 22rpx 0 22rpx 22rpx;
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
