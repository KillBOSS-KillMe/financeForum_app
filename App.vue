// customData = {} // 自定义数据 // customFunction () {} // 自定义方法 // onLoad () {} // 在Page和Component共用的生命周期函数 // onShow () {} // 只在Page中存在的页面生命周期函数 //
config = {}; // 只在Page实例中存在的配置数据，对应于原生的page.json文件 // data = {}; // 页面所需数据均需在这里声明，可用于模板数据绑定 // components = {}; //
声明页面中所引用的组件，或声明组件中所引用的子组件 // mixins = []; // 声明页面所引用的Mixin实例 // computed = {}; // 声明计算属性（详见后文介绍） // watch = {}; //
声明数据watcher（详见后文介绍） // methods = {}; // 声明页面wxml中标签的事件处理函数。注意，此处只用于声明页面wxml中标签的bind、catch事件，自定义方法需以自定义方法的方式声明 //
普通自定义方法在methods对象外声明，与methods平级 // events = {}; // 声明组件之间的事件处理函数 //props {传值} 在WePY中属于 父子组件之间 传值的一种机制 // 页面跳转，传参写法 //
this.$redirect('./page2', {a: 1, b: 2}) // this.$redirect({ // url: './pages?a=1&b=2' // }); // this.$navigate(url) // 阴影边框 // box-shadow: #f1fefb 1rpx 1rpx 10rpx 5rpx; //
flexflexflexflexflexflexflexflex // display: flex; // align-items: center; // justify-content: space-between; // 竖向 // display: flex; // align-items: center; // justify-content:
space-between; // flex-direction: column; // 换行 // display: flex; // align-items: center; // justify-content: space-between; // flex-direction: row; // flex-wrap: wrap;
//换行隐藏 //overflow : hidden; //text-overflow: ellipsis; //display: -webkit-box; //-webkit-line-clamp: 2; //-webkit-box-orient: vertical; // 居右 // flex-direction:row; //
justify-content:flex-end // vertical-align:middle; // 自动换行 // word-break:break-all; // 单行文本溢出 // overflow:hidden; // text-overflow:ellipsis; // white-space:nowrap; //
多行文本溢出
<!-- -webkit-line-clamp: 2;
display: -webkit-box;
-webkit-box-orient: vertical;
overflow: hidden;
text-overflow: ellipsis; -->
<script>
import helper from './common/helper.js';
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	globalData: {
		token: ''
	},
	onLoad() {
		// this.getToken()
	},
	methods: {
		// 获取Token
		getToken() {
			uni.login({
				success: res => {
					if (res.code) {
						console.log(res.code);
						uni.request({
							url: `${helper.requestUrl}/refresh`,
							method: 'POST',
							header: {
								authorization: this.$options.globalData.token
							},
							// data: {
							// 	code: res.code
							// },
							success: data => {
								data = helper.null2str(data);
								console.log(data);
								if (data.statusCode == '200') {
									let token = `${data.data.token}`;
									this.$options.globalData.token = token;
									console.log(this.$options.globalData.token);
								}
							}
						});
					}
				}
			});
		}
	}
};
</script>

<style>
.line {
	width: 750rpx;
	height: 6rpx;
	background: #2390dc;
}

text {
	display: block;
}
.null {
	text-align: center;
	font-size: 24rpx;
	color: #999999;
}
uni-tabbar .uni-tabbar__icon {
	width: 43rpx !important;
	height: 43rpx !important;
}
.nullList {
	width: 750rpx;
	height: 300rpx;
	font-size: 50rpx;
	font-weight: 600;
	color: #eee;
	display: flex;
	align-items: center;
	justify-content: center;
}
@font-face {font-family: "iconfont";
  src: url('//at.alicdn.com/t/font_1566333_d01ejbjuk3r.eot?t=1577948967988'); /* IE9 */
  src: url('//at.alicdn.com/t/font_1566333_d01ejbjuk3r.eot?t=1577948967988#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('//at.alicdn.com/t/font_1566333_d01ejbjuk3r.woff?t=1577948967988') format('woff'),
  url('//at.alicdn.com/t/font_1566333_d01ejbjuk3r.ttf?t=1577948967988') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('//at.alicdn.com/t/font_1566333_d01ejbjuk3r.svg?t=1577948967988#iconfont') format('svg'); /* iOS 4.1- */
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

.iconiconset0207:before {
  content: "\e66a";
}

.icondianzan:before {
  content: "\e60c";
}

.iconzhaopian:before {
  content: "\e640";
}

.iconyonghu:before {
  content: "\e652";
}

.iconhuifu:before {
  content: "\e66f";
}

.iconsousuo:before {
  content: "\e614";
}

.iconicon7:before {
  content: "\e667";
}

.iconweixin:before {
  content: "\e6b3";
}

.iconbuoumaotubiao20:before {
  content: "\e612";
}

.iconbiaoqing:before {
  content: "\e615";
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

.iconpengyouquan:before {
  content: "\e73b";
}

.icondiandian:before {
  content: "\e653";
}

.iconlishijilu:before {
  content: "\e64d";
}

.iconrenzheng:before {
  content: "\e60f";
}

.iconqiapiansousuo:before {
  content: "\e6b2";
}

.iconbulletin:before {
  content: "\e6df";
}

.iconhuiyuan:before {
  content: "\e619";
}

.iconzaixiankefu:before {
  content: "\e61c";
}

.iconlocation:before {
  content: "\e611";
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

.iconat:before {
  content: "\e71c";
}

.icongongwenbao:before {
  content: "\e70b";
}

.iconzanting:before {
  content: "\e63d";
}

.iconsaoyisao:before {
  content: "\e605";
}

.iconshouye:before {
  content: "\e606";
}

.iconliebiao:before {
  content: "\e60a";
}

.iconnan:before {
  content: "\e832";
}

.iconhuiyuan2:before {
  content: "\e64e";
}

.iconrenshu:before {
  content: "\e63c";
}

.iconshipin:before {
  content: "\e663";
}

.iconxiepinglun:before {
  content: "\e668";
}

.icontihuoguanli:before {
  content: "\e6a4";
}

.icontihuoguanli1:before {
  content: "\e6a9";
}

.iconziyuan:before {
  content: "\e61d";
}

.iconyuyin:before {
  content: "\e6a3";
}

.iconshujuhuizong:before {
  content: "\e63b";
}

.iconjurassic_apply:before {
  content: "\e697";
}

.iconchangyongtubiao-xianxingdaochu-zhuanqu-:before {
  content: "\e74b";
}

</style>
