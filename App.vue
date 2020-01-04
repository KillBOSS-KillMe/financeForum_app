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
		this.getToken()
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
/* button[type=primary]{
	background: none;
} */
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
  src: url('//at.alicdn.com/t/font_1566333_4kqxbw8daeo.eot?t=1578130232912'); /* IE9 */
  src: url('//at.alicdn.com/t/font_1566333_4kqxbw8daeo.eot?t=1578130232912#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('//at.alicdn.com/t/font_1566333_4kqxbw8daeo.woff?t=1578130232912') format('woff'),
  url('//at.alicdn.com/t/font_1566333_4kqxbw8daeo.ttf?t=1578130232912') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('//at.alicdn.com/t/font_1566333_4kqxbw8daeo.svg?t=1578130232912#iconfont') format('svg'); /* iOS 4.1- */
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

.iconzhizhang5:before {
  content: "\e64f";
}

.iconhongbao1:before {
  content: "\e657";
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

.iconxiaoxi:before {
  content: "\e62c";
}

.iconshipin:before {
  content: "\e663";
}

.iconxiepinglun:before {
  content: "\e668";
}

.iconshoujihaomaguizheng:before {
  content: "\e6fc";
}

.icontihuoguanli:before {
  content: "\e6a4";
}

.icontihuoguanli1:before {
  content: "\e6a9";
}

.iconshouji:before {
  content: "\e616";
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
