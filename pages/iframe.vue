<template>
	<view>
		<web-view :src="url"></web-view>
		<!-- <web-view src="https://www.xncredit.com/h5/loan_2017/zx_search/index.html?ref=gongjuxiang&from=singlemessage&isappinstalled=0"></web-view> -->
	</view>
</template>

<script>
	const app =getApp()
export default {
	data() {
		return {
			url: ''
		};
	},
	onLoad(e) {
		console.log(e,'****')
		this.url = app.globalData.link
		uni.setNavigationBarTitle({
			title: e.name
		})
	},
	methods: {}
};
</script>

<style></style>
