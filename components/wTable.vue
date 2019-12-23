<template>
	<view class="w_table">
		<view class="w_table_swper">
			<view class="w_table_content">
				<!-- 表头 -->
				<view class="w-table_title">
					<view class="w-table_title_item" v-for="(item,index) in columns" :class="{'w-table_title_item_border': border }"
					 :key="index" :style="{ width:item.width?item.width+'upx':'230upx',textAlign:item.align||'left' }">
						<!-- <view class="w_table_title_content" v-if="item.type==='checkbox'">
							<checkbox @click.native.stop="checkHeader" :checked="allCheck" />
						</view> -->
						<!-- <view class="w_table_title_content" v-if="item.type==='index'">#</view> -->
						<text class="w_table_title_content" v-if="item.title">{{ item.title }}</text>
					</view>
				</view>
				<!-- 表体 -->
				<view class="w_table_body" v-if="data.length" v-for="(item,index) in data" :key="index">
					<view class="w_table_body_col" v-for="(col,cIndex) in columns" :key="cIndex" :style="{ textAlign:col.align||'left' }"
					 @click="clickRow(item,index)">
						<view class="col_cell" :class="{ 'col_cell_border':border }" :style="{ width:col.width?col.width+'upx':'230upx'}">
							<view class="col_text">
								<checkbox v-if="col.type==='checkbox'" :checked="item._isChecked" @click.native.stop="checkItemCheckbox(item,index)" />
								<view v-if="col.type==='index'">
									{{ index+1 }}
								</view>
								<Cell v-if="col.render" :row="item" :column="col" :index="index" :render="col.render" />
								<text v-else-if="!col.render" v-html="item[col.key]"></text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="data.length == 0" class="w_table_null">
				<view>{{ noDataText }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Cell from './cell'
	export default {
		components: {
			Cell
		},
		props: {
			/**
			 * data要传入的饿数据数组
			 */
			data: {
				type: Array,
				default () {
					return []
				}
			},
			columns: {
				type: Array,
				default () {
					return []
				}
			},
			border: {
				type: Boolean,
				default: false
			},
			height: {
				type: [Number, String],
				default: 0
			},
			headbBackground: {
				type: String,
				default: "#C8C7CC"
			},
			noDataText: {
				type: String,
				default: "暂无数据"
			}

		},
		data: () => {
			return {
				allCheck: false
			}
		},
		methods: {
			/** 
			 * 	-- 单击某一行时触发
			 * @param {Object} item为当前行的数据
			 * @param {Object} index为当前行的下标
			 */
			// clickRow(row, index) {
			// 	let params = {
			// 		row,
			// 		index
			// 	}
			// 	this.$emit('on-row-click', params)
			// },
			/**
			 * 	--	 点击全选
			 */
			// checkHeader() {
			// 	this.allCheck = !this.allCheck;
			// 	this.data.forEach(it => {
			// 		it._isChecked = this.allCheck;
			// 	})
			// 	this.$emit('on-select-all', {
			// 		allChecked: this.data.filter(item => item._isChecked)
			// 	})
			// },
			/**
			 * 	--	点击单选
			 */
			// checkItemCheckbox(item) {
			// 	item._isChecked = !item._isChecked;
			// 	this.data.forEach(it => {
			// 		if(!it._isChecked){
			// 			this.allCheck = false;
			// 		}
			// 	})
			// 	let ary = this.data.filter(item => item._isChecked); //已选择的项
			// 	if(ary.length == this.data.length){
			// 		this.allCheck = true
			// 	}
			// 	this.$emit('on-select', {
			// 		allChecked: ary,
			// 		checked: item
			// 	})
			// }
		},
		created() {
			this.columns.forEach(it => {
				it.type = it.type || 'html';
				if (it.render) {
					it.type = "render"
				}
			})
			this.data.forEach(it => {
				it._isChecked = false;
			})
		},
		mounted() {

		},
		computed: {

		}

	}
</script>

<style>
	.w_table {
		width: 100%;
		position: relative;
		display: inline-block;
		/* height: 100%; */
		/* min-height: 130upx; */
		min-width: 100%;
		background: #fff;
		/* border: 2upx solid #ccc; */
		font-size: 14upx;
		box-sizing: border-box;
		/* overflow: scroll; */
	}

	.w_table_swper {
		height: 100%;
		box-sizing: border-box;
	}

	.w_table_content {
		height: 100%;
		width: 100%;
	}

	.w-table_title {
		width: fit-content;
		height: 60upx;
		display: flex;
		justify-content: space-between;
		line-height: 60upx;
		position: sticky;
		top: 0;
		left: 0;
		z-index: 1;
	}

	.w-table_title_item {
		display: inline-block;
		text-align: center;
	}

	.w-table_title_item_border {
		border-right: 2upx solid #fff;
	}

	.w_table_title_content {
		padding: 0 10upx;
		text-align: center;
		color: #737373;
		font-size: 24rpx;
		font-weight: 700;
	}

	.w_table_body {
		display: flex;
		justify-content: space-between;
	}

	.w_table_body_col {
		height: 60upx;
		line-height: 60upx;
		box-sizing: border-box;
		width: 100%;
		border-bottom: 2upx solid #f8f8f8;
		margin: 0 auto;
	}

	.w_table_body_col>.col_cell {
		display: inline-block;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.col_cell_border {
		border-right: 2upx solid #f8f8f8;
	}

	.col_cell_last {
		border: none;
	}

	.col_text {
		display: inline-block;
		/* padding: 0 10upx; */
		margin: 0 auto;
		font-size: 24rpx;
		color: #737373;
		text-align: center;
		width: 230rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.w_table_null {
		width: 100%;
		height: 60upx;
		position: absolute;
		top: 60upx;
		line-height: 60upx;
		text-align: center;
	}
</style>
