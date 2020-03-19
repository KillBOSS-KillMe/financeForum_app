<template>
	<view>
		<web-view :src="url"></web-view>
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
		console.log(app.globalData.link,'------------------------')
		this.url = app.globalData.link
		uni.setNavigationBarTitle({
			title: e.name
		})
	},
	methods: {}
};
</script>

<style></style>
