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
  src: url('//at.alicdn.com/t/font_1566333_mthkmvp08a.eot?t=1578049936539'); /* IE9 */
  src: url('//at.alicdn.com/t/font_1566333_mthkmvp08a.eot?t=1578049936539#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('//at.alicdn.com/t/font_1566333_mthkmvp08a.woff?t=1578049936539') format('woff'),
  url('//at.alicdn.com/t/font_1566333_mthkmvp08a.ttf?t=1578049936539') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('//at.alicdn.com/t/font_1566333_mthkmvp08a.svg?t=1578049936539#iconfont') format('svg'); /* iOS 4.1- */
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

.iconshoujihaomaguizheng:before {
  content: "\e6fc";
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
