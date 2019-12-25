// customData = {} // 自定义数据
// customFunction ()　{} // 自定义方法
// onLoad () {} // 在Page和Component共用的生命周期函数
// onShow () {} // 只在Page中存在的页面生命周期函数
// config = {}; // 只在Page实例中存在的配置数据，对应于原生的page.json文件
// data = {}; // 页面所需数据均需在这里声明，可用于模板数据绑定
// components = {}; // 声明页面中所引用的组件，或声明组件中所引用的子组件
// mixins = []; // 声明页面所引用的Mixin实例
// computed = {}; // 声明计算属性（详见后文介绍）
// watch = {}; // 声明数据watcher（详见后文介绍）
// methods = {}; // 声明页面wxml中标签的事件处理函数。注意，此处只用于声明页面wxml中标签的bind、catch事件，自定义方法需以自定义方法的方式声明
// 普通自定义方法在methods对象外声明，与methods平级
// events = {}; // 声明组件之间的事件处理函数
//props {传值} 在WePY中属于 父子组件之间 传值的一种机制

// 页面跳转，传参写法
// this.$redirect('./page2', {a: 1, b: 2})
// this.$redirect({
// url: './pages?a=1&b=2'
// });
// this.$navigate(url)

// 阴影边框
// box-shadow: #f1fefb 1rpx 1rpx 10rpx 5rpx;

// flexflexflexflexflexflexflexflex
// display: flex;
// align-items: center;
// justify-content: space-between;
// 竖向
// display: flex;
// align-items: center;
// justify-content: space-between;
// flex-direction: column;
// 换行
// display: flex;
// align-items: center;
// justify-content: space-between;
// flex-direction: row;
// flex-wrap: wrap;


//换行隐藏
//overflow : hidden;
//text-overflow: ellipsis;
//display: -webkit-box;
//-webkit-line-clamp: 2;
//-webkit-box-orient: vertical;


// 居右
// flex-direction:row;
// justify-content:flex-end

// vertical-align:middle;


// 自动换行
// word-break:break-all;

// 单行文本溢出
// overflow:hidden;
// text-overflow:ellipsis;
// white-space:nowrap;

// 多行文本溢出
<!-- -webkit-line-clamp: 2;
display: -webkit-box;
-webkit-box-orient: vertical;
overflow: hidden;
text-overflow: ellipsis; -->

<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
			requestUrl: 'http://www.finance.cc/api',
			imgUrl: 'http://www.finance.cc/uploads/',
			token: ''
		},
		methods: {
			/**
			 * 时间戳转时间
			 */
			transformTime(timestamp = +new Date()) {
				if (timestamp) {
					var time = new Date(timestamp);
					var y = time.getFullYear(); //getFullYear方法以四位数字返回年份
					var M = time.getMonth() + 1; // getMonth方法从 Date 对象返回月份 (0 ~ 11)，返回结果需要手动加一
					var d = time.getDate(); // getDate方法从 Date 对象返回一个月中的某一天 (1 ~ 31)
					var h = time.getHours(); // getHours方法返回 Date 对象的小时 (0 ~ 23)
					var m = time.getMinutes(); // getMinutes方法返回 Date 对象的分钟 (0 ~ 59)
					var s = time.getSeconds(); // getSeconds方法返回 Date 对象的秒数 (0 ~ 59)
					return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
				} else {
					return '';
				}
			},
			/**
			 * null => ''
			 * @param {*} data 要处理的数据
			 */
			null2str(data) {
				for (let x in data) {
					if (data[x] === null) { // 如果是null 把直接内容转为 ''
						data[x] = ''
					} else {
						if (Array.isArray(data[x])) { // 是数组遍历数组 递归继续处理
							data[x] = data[x].map(z => {
								return this.null2str(z)
							})
						}
						if (typeof(data[x]) === 'object') { // 是json 递归继续处理
							data[x] = this.null2str(data[x])
						}
					}
				}
				return data
			}
		}
		
		// getToken() {
		// 	uni.login({
		// 	  // provider: 'weixin',
		// 	  success: res => {
		// 	    console.log(res.code,'+++6+');
		// 	  }
		// 	});
		// wx.login({
		//   success: res => {
		// 	if (res.code) {
		// 	  console.log(res.code) 
		// 	  wx.request({
		// 		// url: `${this.globalData.requestUrl}/auth/get_token`,
		// 		url: `${this.globalData.requestUrl}/weapp/authorizations`,
		// 		method: 'POST',
		// 		header: {
		// 		  apikey: this.globalData.apikey
		// 		},
		// 		data: {
		// 		  code: res.code,
		// 		  verification_code: '1234'
		// 		},
		// 		success: data => {
		// 		  wx.hideToast()
		// 		  data = this.null2str(data)
		// 		  if (data.data.code == '200') {
		// 			let token = `${data.data.msg.token_type} ${data.data.msg.token}`
		// 			console.log('==========================')
		// 			console.log(token)
		// 			console.log('==========================')
		// 			this.$parent.globalData.token = token
		// 		  }
		// 		}
		// 	  })
		// 	}
		//   }
		// })
		// }
	}
</script>

<style>
	.line {
		width: 750rpx;
		height: 6rpx;
		background: #2390DC;
	}

	text {
		display: block;
	}
	.null{
		text-align: center;
		font-size: 24rpx;
		color: #999999;
	}
	uni-tabbar .uni-tabbar__icon {
		width: 43rpx !important;
		height: 43rpx !important;
	}

	@font-face {
		font-family: "iconfont";
		src: url('//at.alicdn.com/t/font_1566333_2jzcez69zrc.eot?t=1577238101641');
		/* IE9 */
		src: url('//at.alicdn.com/t/font_1566333_2jzcez69zrc.eot?t=1577238101641#iefix') format('embedded-opentype'),
			/* IE6-IE8 */
			url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
			url('//at.alicdn.com/t/font_1566333_2jzcez69zrc.woff?t=1577238101641') format('woff'),
			url('//at.alicdn.com/t/font_1566333_2jzcez69zrc.ttf?t=1577238101641') format('truetype'),
			/* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
			url('//at.alicdn.com/t/font_1566333_2jzcez69zrc.svg?t=1577238101641#iconfont') format('svg');
		/* iOS 4.1- */
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.iconzanzan:before {
		content: "\e65a";
	}

	.iconsousuo:before {
		content: "\e614";
	}

	.iconxinshoubangzhu:before {
		content: "\e64c";
	}

	.iconshezhi:before {
		content: "\e604";
	}

	.iconfenxiang:before {
		content: "\e613";
	}

	.iconyonghuguanli:before {
		content: "\e620";
	}

	.iconrenzheng:before {
		content: "\e60f";
	}

	.iconhuiyuan:before {
		content: "\e619";
	}

	.iconzaixiankefu:before {
		content: "\e61c";
	}

	.iconico_zuo:before {
		content: "\e601";
	}

	.iconhuiyuan1:before {
		content: "\e65f";
	}

	.iconhongbaoguanli:before {
		content: "\e628";
	}

	.iconsaoyisao:before {
		content: "\e605";
	}

	.iconshujuhuizong:before {
		content: "\e63b";
	}

	.iconchangyongtubiao-xianxingdaochu-zhuanqu-:before {
		content: "\e74b";
	}

	.iconshengdanhuahuan:before {
		content: "\e63f";
	}
</style>
