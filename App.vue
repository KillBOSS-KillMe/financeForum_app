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
  src: url('//at.alicdn.com/t/font_1566333_wwg1oxwete.eot?t=1577762253292'); /* IE9 */
  src: url('//at.alicdn.com/t/font_1566333_wwg1oxwete.eot?t=1577762253292#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('//at.alicdn.com/t/font_1566333_wwg1oxwete.woff?t=1577762253292') format('woff'),
  url('//at.alicdn.com/t/font_1566333_wwg1oxwete.ttf?t=1577762253292') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('//at.alicdn.com/t/font_1566333_wwg1oxwete.svg?t=1577762253292#iconfont') format('svg'); /* iOS 4.1- */
}

@font-face {font-family: "iconfont";
  src: url('//at.alicdn.com/t/font_1566333_cc9u23abb9o.eot?t=1577763142418'); /* IE9 */
  src: url('//at.alicdn.com/t/font_1566333_cc9u23abb9o.eot?t=1577763142418#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('//at.alicdn.com/t/font_1566333_cc9u23abb9o.woff?t=1577763142418') format('woff'),
  url('//at.alicdn.com/t/font_1566333_cc9u23abb9o.ttf?t=1577763142418') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('//at.alicdn.com/t/font_1566333_cc9u23abb9o.svg?t=1577763142418#iconfont') format('svg'); /* iOS 4.1- */
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

.iconbiaoqing:before {
  content: "\e603";
}

.iconshouye:before {
  content: "\e606";
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
