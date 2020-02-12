<template>
	<view class="promptlyGetQr">
		<view>
			<view class="item">
					<uni-icon type="" class="iconfont iconhuabanfuben"></uni-icon>
					<input type="text" value="" placeholder="请输入用户名"/>
			</view>
			<view class="item">
					<uni-icon type="" class="iconfont iconsuo"></uni-icon>
					<input type="password" value="" placeholder="请输入密码"/>
			</view>
			<view class="item">
					<input type="text" value="" placeholder="请输入二维码"/>
					<view class="code">1234</view>
			</view>
		</view>
		<button type="" class="determine" @tap="next(2)">获取推广二维码</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			next(e){
				uni.navigateTo({
					url:'/pages/shareCode?type=${e}'
				})
			}
		}
	}
</script>

<style>
.promptlyGetQr{
	width: 690rpx;
	padding: 30rpx;
}
.item{
	width: 630rpx;
	height: 75rpx;
	background: #ffffff;
	box-shadow: 0rpx 1rpx 36rpx 0rpx rgba(212,212,212,0.6); 
	border-radius: 36rpx;
	margin-bottom: 30rpx;
	display: flex;
	align-items: center;
	padding: 0 30rpx;
}
.item input{
	font-size: 24rpx;
	font-weight: 700;
	color: #b2b2b2;
	width: 580rpx;
}
.item .iconfont{
	font-size: 24rpx;
	color: #19B7F8;
	margin-right: 16rpx;
}
.item .code{
	/* width: 153rpx; */
	background: rgba(101,179,233,0.8);
	box-shadow: 0rpx 1rpx 36rpx 0rpx rgba(212,212,212,0.6); 
	font-size: 28rpx;
	font-weight: 700;
	color: #ffffff;
	border-radius: 60rpx;
	text-align: center;
	padding: 6rpx 24rpx;
	letter-spacing: 4rpx;
}
.determine{
	position: fixed;
	border: none;
	color: #fff;
	bottom: 60rpx;
	left: 127rpx;
	font-size: 28rpx;
	font-weight: 700;
	width: 511rpx;
	height: 62rpx;
	background: #4e9ed8;
	line-height: 62rpx;
	text-align: center;
	border-radius: 60rpx;
	box-shadow: 0rpx 15rpx 38rpx 0rpx rgba(78,158,216,0.6); 
}
</style>
