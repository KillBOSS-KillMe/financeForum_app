<template>
	<view class="articleDetail">
		<view class="content">
			<text class="title">{{ articleDetail.title }}</text>
			<view class="info">
				<view class="left">
					<image :src="imgUrl+articleDetail.theme_pic" mode=""></image>
					<view class="leftTitle">
						<text>{{ articleDetail.user.name }}</text>
						<view class="leftTitleBottom">
							<text>{{ articleDetail.user.type }}</text>
							<text>{{ articleDetail.user.created_at }}</text>
							<text class="follow" @tap="addFollow">关注</text>
						</view>
					</view>
				</view>
				<view class="read">
					<view>
						<uni-icon class="iconfont iconiconset0207 icon" type=""></uni-icon>
						{{ articleDetail.reading }}
					</view>
					<view>
						<uni-icon class="iconfont icondianzan icon" type=""></uni-icon>
						{{ articleDetail.like }}
					</view>
				</view>
			</view>
			<block v-for="(item, index) in articleDetail.extras" :key="index"><rich-text :nodes="item.content" v-if="item.need_reply == 0"></rich-text></block>

			<view class="tip">
				<text>解析：</text>
				<view>
					您还不是
					<text>VIP会员</text>
					,本帖隐藏内容仅限VIP会员可见，点击此处开通会员后查看
				</view>
			</view>
			<!-- <view class="read"><uni-icon class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-" type=""></uni-icon>123</view> -->
			<view class="share">
				<text>分享至</text>
				<!-- 分享到微信好友 -->
				<uni-icon class="iconfont iconweixin" @tap="shareFriend" type=""></uni-icon>
				<!-- <image src="../static/logo.png" mode="" @tap="shareFriend"></image> -->
				<!-- 分享到微信朋友圈 -->
				<uni-icon class="iconfont iconpengyouquan" @tap="shareFriendcricle" type=""></uni-icon>
				<!-- <uni-icon type="iconfont iconpengyouquan"></uni-icon> -->
				<!-- <image src="../static/logo.png" mode="" @tap="shareFriendcricle"></image> -->
			</view>
		</view>
		<view class="line"></view>
		<view class="reward">
			<view class="iconText" @tap="postReward">赏</view>
			<!-- <image src="../static/logo.png" mode=""></image> -->
			<text>觉得不错，打个赏~</text>
			<view class="money">{{articleDetail.rewards_count}}人已经打赏</view>
		</view>
		<view class="line"></view>
		<view class="comment">
			<view class="commentTitle">
				<text class="commentTit">评论</text>
				<text class="commentLandlord" @tap="commentLandlord(articleDetail.user_id)">只看楼主</text>
			</view>
			<view class="list">
				<block v-for="(item, index) in commentList" :key="index">
					<view class="item">
						<image :src="imgUrl+item.user.avatar" mode=""></image>
						<view class="right">
							<view class="itemListHead">
								<view class="itemListHeadLeft">
									<text class="rightName">{{ item.user.name }}</text>
									<uni-icon class="iconfont iconnan" :class="['active', isSex == '1' ? 'curRed' : '']" type=""></uni-icon>
									<text class="rightMember">{{ item.user.type }}</text>
								</view>
								<uni-icon class="iconfont icondiandian icon" type=""></uni-icon>
							</view>
							<text class="rightContent">{{ item.content }}</text>
							<view>
								<block v-for="(postComItem, postComIndex) in item.replies" :key="postComIndex">
									<view class="postCom">
										<text class="cur">{{ postComItem.user.name }}</text>
										<text>回复</text>
										<text class="cur">{{ item.user.name }}：</text>
										<view>{{ postComItem.content }}</view>
									</view>
								</block>
							</view>
							<view class="rightBottom">
								<view class="flex">
									<text>{{ item.floor }}楼</text>
									<text>{{ item.created_at }}</text>
								</view>
								<uni-icon class="iconfont iconhuifu active" type="" @tap="reply" :data-id="item.id" :data-num="1"></uni-icon>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
		<view class="bottom">
			<input type="text" :value="postContent" focus @input="getContent" placeholder="发表评论..." />
			<uni-icon class="iconfont iconziyuan icon" type="" @tap="postDiscuss"></uni-icon>
			<uni-icon class="iconfont iconzanzan" :class="['icon', isHide == '1' ? 'active' : '']" @tap="clickZan" type=""></uni-icon>
			<!-- 收藏 -->
			<!-- 	<uni-icon class="iconfont iconzanzan" type="" v-if="articleDetail.is_collections == 1" @tap="delCollection"></uni-icon>
			<uni-icon class="iconfont iconzanzan" type="" v-if="articleDetail.is_collections == 0" @tap="addCollection"></uni-icon> -->
			<!-- <uni-icon class="iconfont iconfenxiang" type=""></uni-icon> -->
		</view>
	</view>
</template>

<script>
const app = getApp();
import helper from '../common/helper.js';
export default {
	data() {
		return {
			focus: false,
			isShow: '0',
			isHide: '0',
			info: {
				id: '1',
				title: '有钱花二次贷，只要有信用卡或者有公积金就 来，人均10000起步，秒批最高10万，当天到 账',
				img: '../static/logo.png',
				name: 'admin',
				type: '楼主',
				time: '1小时之前'
			},
			nodes: [
				{
					name: 'div',
					attrs: {
						class: 'div-class',
						style: 'color: #333333;font-size:14px;line-height:20px;'
					},
					children: [
						{
							type: 'text',
							text: '公告年终业绩每股收入是:3.98元，（即是第四季度收入是:1.87元的）；2017年前三3季度每股收入业绩是:1.99元，公告'
						}
					]
				}
			],
			commentList: [],
			articleDetail: null,
			options: null,
			imgUrl: '',
			page: '1',
			postContent: '',
			just_landlord: '',
			comment_id: '',
			isSex: '0'
		};
	},
	onLoad(options) {
		this.options = options;
		this.imgUrl = helper.imgUrl;
		// 文章详情加载
		this.getArticleDetail();
	},
	onShow() {
		//评论列表
		this.getComment();
	},
	methods: {
		//获取发布内容
		getContent(e) {
			this.postContent = e.detail.value;
			console.log(e);
		},
		// 文章详情加载
		getArticleDetail() {
			uni.showLoading({
				title: '加载中...',
				duration: 1000000
			});
			uni.request({
				url: `${helper.requestUrl}/posts/show`,
				method: 'GET',
				header: {
					authorization: app.globalData.token
				},
				data: {
					post_id: this.options.id
				},
				success: res => {
					uni.hideLoading();
					res = helper.null2str(res);
					console.log(res);
					if (res.data.status_code == 200) {
						this.articleDetail = res.data;
						if (this.articleDetail.user.sex == 'f') {
							this.isSex = '1';
						}
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						});
						uni.navigateBack({
							delta: 1
						});
					}
				}
			});
		},
		shareFriend() {
			//分享到微信朋友
			this.share('WXSceneSession');
		},
		shareFriendcricle() {
			//分享到微信朋友圈
			this.share('WXSenceTimeline');
		},
		share(WXSenceType) {
			console.log(window.location.href);
			uni.share({
				provider: 'weixin',
				scene: WXSenceType,
				type: 0,
				href: window.location.href,
				title: this.articleDetail.title,
				summary: '唐艺昕，没有水的地方叫沙漠，没有你的地方，你知道叫什么吗？不知道。叫寂寞。',
				imageUrl: 'http:*******************',
				success: function(res) {
					console.log('success:' + JSON.stringify(res));
				},
				fail: function(err) {
					console.log('fail:' + JSON.stringify(err));
				}
			});
		},
		//打赏
		postReward(){
			uni.request({
				url: `${helper.requestUrl}/posts/reward`,
				method: 'GET',
				header: {
					authorization: app.globalData.token
				},
				data: {
					post_id: this.articleDetail.id
				},
				success: res => {
					uni.hideLoading();
					res = helper.null2str(res);
					console.log(res);
					if (res.data.status_code == '200') {
						uni.showToast({
							title: '打赏成功'
						});
					} else {
						uni.showToast({
							title: '打赏失败',
							icon: 'none'
						});
					}
				}
			});
		},
		// 文章--添加--收藏
		addCollection() {
			uni.showLoading({
				title: '加载中...',
				duration: 1000000
			});
			uni.request({
				url: `${helper.requestUrl}/user/add_collection`,
				method: 'POST',
				header: {
					authorization: app.globalData.token
				},
				data: {
					post_id: this.articleDetail.id
				},
				success: res => {
					uni.hideLoading();
					res = helper.null2str(res);
					console.log(res);
					if (res.data.status_code == '1') {
						// 修改帖子的收藏状态
						this.articleDetail.is_collections == 1;
						uni.showToast({
							title: res.data.message
						});
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						});
					}
				}
			});
		},
		// 文章--取消--收藏
		delCollection() {
			uni.showLoading({
				title: '加载中...',
				duration: 1000000
			});
			uni.request({
				url: `${helper.requestUrl}/user/del_collection`,
				method: 'POST',
				header: {
					authorization: app.globalData.token
				},
				data: {
					post_id: this.articleDetail.id
				},
				success: res => {
					uni.hideLoading();
					res = helper.null2str(res);
					console.log(res);
					if (res.data.status_code == '1') {
						// 修改帖子的收藏状态
						this.articleDetail.is_collections == 0;
						uni.showToast({
							title: res.data.message
						});
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						});
					}
				}
			});
		},
		addFollow() {
			// 关注用户
			uni.showLoading({
				title: '加载中...',
				duration: 1000000
			});
			uni.request({
				url: `${helper.requestUrl}/user/add_follow`,
				method: 'POST',
				header: {
					authorization: app.globalData.token
				},
				data: {
					follow_id: this.articleDetail.user_id
				},
				success: res => {
					uni.hideLoading();
					res = helper.null2str(res);
					console.log(res);
					if (res.data.status_code == '1') {
						uni.showToast({
							title: res.data.message
						});
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						});
					}
				}
			});
		},
		// 评论列表
		getComment() {
			uni.request({
				url: `${helper.requestUrl}/posts/post-comments`,
				method: 'GET',
				header: {
					authorization: app.globalData.token
				},
				data: {
					post_id: this.options.id,
					just_landlord: this.just_landlord,
					page: this.page,
					page_size: '10'
				},
				success: res => {
					uni.hideLoading();
					res = helper.null2str(res);
					console.log(res, '**********');
					if (res.data.status_code == '200') {
						this.commentList = this.commentList.concat(res.data.data);
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						});
					}
				}
			});
		},
		//发布评论
		postDiscuss() {
			if (this.postContent == '') {
				uni.showToast({
					title: '请输入发表内容',
					icon: 'none'
				});
			} else {
				if (this.isShow == '0') {
					this.getPost();
				} else if (this.isShow == '1') {
					this.postReply();
				}
			}
		},
		// 评论
		getPost() {
			uni.request({
				url: `${helper.requestUrl}/posts/send-comment`,
				method: 'POST',
				header: {
					authorization: app.globalData.token
				},
				data: {
					post_id: this.options.id,
					content: this.postContent
				},
				success: res => {
					uni.hideLoading();
					res = helper.null2str(res);
					console.log(res);
					if (res.data.status_code == '200') {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						});
						this.postContent = ' ';
					} else {
						uni.showToast({
							title: '发表失败',
							icon: 'none'
						});
					}
				}
			});
		},
		// 回复评论
		reply(e) {
			console.log(e);
			this.comment_id = e.currentTarget.dataset.id;
			this.isShow = e.currentTarget.dataset.num;
			this.focus = true;
		},
		postReply() {
			uni.request({
				url: `${helper.requestUrl}/posts/send-reply`,
				method: 'POST',
				header: {
					authorization: app.globalData.token
				},
				data: {
					comment_id: this.comment_id,
					content: this.postContent
				},
				success: res => {
					uni.hideLoading();
					res = helper.null2str(res);
					console.log(res);
					if (res.data.status_code == '200') {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						});
						this.postContent = ' ';
						this.isShow = '0';
					} else {
						uni.showToast({
							title: '发表失败',
							icon: 'none'
						});
					}
				}
			});
		},
		//只看楼主
		commentLandlord(e) {
			console.log(e);
			this.just_landlord = e;
			this.commentList = [];
			this.page = '1';
			this.getComment();
		},
		// 点赞
		clickZan(e) {
			this.isHide = '1';
			uni.request({
				url: `${helper.requestUrl}/posts/like`,
				method: 'GET',
				header: {
					authorization: app.globalData.token
				},
				data: {
					post_id: this.articleDetail.id
				},
				success: res => {
					uni.hideLoading();
					res = helper.null2str(res);
					console.log(res);
					if (res.data.status_code == '200') {
						uni.showToast({
							title: '点赞成功',
							icon: 'none'
						});
					} else {
						uni.showToast({
							title: '点赞失败',
							icon: 'none'
						});
					}
				}
			});
		},
		onReachBottom() {
			this.page++;
			this.getComment();
		}
	}
};
</script>

<style>
.articleDetail {
	width: 750rpx;
}

.articleDetail .content {
	width: 690rpx;
	padding: 20rpx 30rpx;
}

.articleDetail .content .title {
	font-size: 34rpx;
	font-weight: 600;
	color: #333333;
	-webkit-line-clamp: 3;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
}

.articleDetail .content .info {
	display: flex;
	justify-content: space-between;
	align-content: center;
	align-items: center;
	margin: 30rpx 0;
	border-bottom: 1rpx dashed #ececec;
	border-top: 1rpx dashed #ececec;
	padding: 30rpx 0;
}

.articleDetail .content .info .left {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

.articleDetail .content .info .left > image {
	width: 90rpx;
	height: 90rpx;
	border-radius: 90rpx;
	margin-right: 20rpx;
}

.articleDetail .content .info .left .leftTitle > text {
	font-size: 28rpx;
	color: #333333;
	font-weight: 600;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.articleDetail .content .info .left .leftTitleBottom {
	display: flex;
	align-items: flex-end;
}

.articleDetail .content .info .left .leftTitleBottom > text {
	color: #666666;
	font-size: 24rpx;
	margin-right: 20rpx;
	white-space: nowrap;
}

.articleDetail .follow {
	font-size: 22rpx !important;
	color: #fff !important;
	font-weight: 600;
	background: #2390dc;
	width: 80rpx;
	height: 48rpx;
	line-height: 48rpx;
	text-align: center;
	border-radius: 10rpx;

}

.read {
	width: 100rpx;
	height: 90rpx;
	display: flex;
	align-content: space-between;
	flex-wrap: wrap;
}

.read view {
	font-size: 20rpx;
	color: #333333;
}
.postCom {
	display: flex;
	font-size: 28rpx;
	color: #666666;
	margin: 8rpx 0 14rpx;
	background: #f0f0f0;
	border-radius: 40rpx;
	padding: 10rpx 16rpx;
}
.postCom text {
	white-space: nowrap;
}
.postCom .cur {
	color: #2390dc;
}
.content .tip {
	font-size: 28rpx;
	color: #333333;
	font-weight: 600;
	margin-top: 30rpx;
}

.content .tip > view > text {
	display: inline-block;
	color: #ee4d4d;
}

.content .share {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-top: 30rpx;
}

.content .share text,
.reward text {
	font-size: 28rpx;
	color: #333333;
}
.content .share .iconfont{
	width: 60rpx;
	font-size: 60rpx;
	color: green;
	margin-left: 20rpx;
}
.reward .iconText {
	width: 65rpx;
	height: 65rpx;
	border-radius: 65rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	/* background-color: ; */
}
.content .share image {
	width: 64rpx;
	height: 64rpx;
	border-radius: 64rpx;
	margin-left: 36rpx;
}

.reward {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin: 30rpx auto;
}

.reward image {
	width: 64rpx;
	height: 64rpx;
	border-radius: 64rpx;
}

.reward text {
	text-align: center;
	width: 690rpx;
	margin-top: 10rpx;
}

.comment {
	padding-bottom: 110rpx;
	/* padding: 30rpx 30rpx 100rpx; */
}

.comment .commentTitle {
	padding: 30rpx;
	width: 690rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1rpx solid #e4e4e4;
}

.comment .commentTit {
	font-size: 30rpx;
	color: #333333;
	font-weight: 600;
}

.comment .commentLandlord {
	font-size: 26rpx;
	color: #2390dc;
	font-weight: 600;
	border: 1rpx solid #2390dc;
	padding: 6rpx 14rpx;
	border-radius: 10rpx;
}

.comment .list {
	width: 690rpx;
	padding: 0 30rpx;
}

.comment .item {
	display: flex;
	justify-content: space-between;
	padding: 30rpx 0;
	border-bottom: 1rpx solid #e4e4e4;
}

.comment .item > image {
	width: 90rpx;
	height: 90rpx;
	border-radius: 90rpx;
}

.comment .right {
	width: 580rpx;
}

.comment .rightName {
	font-size: 28rpx;
	color: #333333;
	font-weight: 600;
	/* margin-bottom: 10rpx; */
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.comment .rightContent {
	font-size: 28rpx;
	color: #666;
	-webkit-line-clamp: 2;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	margin-bottom: 10rpx;
}

.comment .rightBottom {
	display: flex;
	justify-content: space-between;
}

.comment .flex {
	display: flex;
	justify-content: flex-start;
}

.comment .flex > text {
	color: #666666;
	font-size: 24rpx;
	margin-right: 36rpx;
}

.comment .itemListHead {
	display: flex;
	justify-content: space-between;
}

.itemListHeadLeft {
	display: flex;
	align-items: flex-start;
}

.rightMember {
	background: #d2bf8e;
	color: #fff;
	font-size: 18rpx;
	padding: 1rpx 10rpx;
	border-radius: 10rpx;
	margin-left: 20rpx;
}

.reward .money {
	font-size: 20rpx;
	font-weight: 700;
	color: #b8b8b8;
}

.bottom {
	width: 690rpx;
	padding: 0 30rpx;
	border-top: 1rpx solid #e4e4e4;
	/* height: 98rpx; */
	height: 98rpx;
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	align-content: center;
	align-items: center;
	background: #fff;
}

.bottom input {
	width: 508rpx;
	border: 1rpx solid #b8b8b8;
	height: 70rpx;
	line-height: 70rpx;
	border-radius: 40rpx;
	padding: 0 20rpx;
	color: #999999;
	font-size: 24rpx;
	/* margin-right: 20rpx; */
}

.bottom .iconfont {
	font-size: 44rpx;
	font-weight: 600;
	/* color: #999; */
	margin-left: 20rpx;
}
.icon {
	color: #999;
}
.iconfont.active {
	color: #2390dc !important;
}
.curRed {
	color: #d4237a;
}
.iconText{
	width: 140rpx;
	height: 140rpx;
	border-radius: 140rpx;
	background: #2390DC;
	color: #fff;
}
</style>
