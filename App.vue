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
  src: url('//at.alicdn.com/t/font_1566333_9deq1yff1m.eot?t=1577764360529'); /* IE9 */
  src: url('//at.alicdn.com/t/font_1566333_9deq1yff1m.eot?t=1577764360529#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('//at.alicdn.com/t/font_1566333_9deq1yff1m.woff?t=1577764360529') format('woff'),
  url('//at.alicdn.com/t/font_1566333_9deq1yff1m.ttf?t=1577764360529') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('//at.alicdn.com/t/font_1566333_9deq1yff1m.svg?t=1577764360529#iconfont') format('svg'); /* iOS 4.1- */
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
