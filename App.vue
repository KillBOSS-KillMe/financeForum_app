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
		token: '',
		vipIndex: '',
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
  src: url('//at.alicdn.com/t/font_1566333_8urt8ph1f4d.eot?t=1577964560192'); /* IE9 */
  src: url('//at.alicdn.com/t/font_1566333_8urt8ph1f4d.eot?t=1577964560192#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('//at.alicdn.com/t/font_1566333_8urt8ph1f4d.woff?t=1577964560192') format('woff'),
  url('//at.alicdn.com/t/font_1566333_8urt8ph1f4d.ttf?t=1577964560192') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('//at.alicdn.com/t/font_1566333_8urt8ph1f4d.svg?t=1577964560192#iconfont') format('svg'); /* iOS 4.1- */
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

.iconqunfengjingzhunyinliu:before {
  content: "\e70f";
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

.iconqiyegongchangjianzhu:before {
  content: "\e802";
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

.iconzhifubao:before {
  content: "\e610";
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

.iconweixin1:before {
  content: "\e659";
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

.iconqian_:before {
  content: "\e61a";
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

.iconchanpin_yonghuzhifu:before {
  content: "\e603";
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
