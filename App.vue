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
		link: ''
	},
	onLoad(options) {
		
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
	background: #F8F8F8;
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
  src: url('//at.alicdn.com/t/font_1566333_r94r4f19s9p.eot?t=1578559706744'); /* IE9 */
  src: url('//at.alicdn.com/t/font_1566333_r94r4f19s9p.eot?t=1578559706744#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('//at.alicdn.com/t/font_1566333_r94r4f19s9p.woff?t=1578559706744') format('woff'),
  url('//at.alicdn.com/t/font_1566333_r94r4f19s9p.ttf?t=1578559706744') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('//at.alicdn.com/t/font_1566333_r94r4f19s9p.svg?t=1578559706744#iconfont') format('svg'); /* iOS 4.1- */
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

.iconshangjiantou:before {
  content: "\e64a";
}

.iconqiandai:before {
  content: "\e626";
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

.icon54:before {
  content: "\e68c";
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

.iconjiantou:before {
  content: "\e617";
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

.iconshouji1:before {
  content: "\e63e";
}

.iconhongbaoguanli:before {
  content: "\e628";
}

.icontubiaozhizuomoban-:before {
  content: "\e62d";
}

.iconicon:before {
  content: "\e658";
}

.iconat:before {
  content: "\e71c";
}

.iconqian_:before {
  content: "\e61a";
}

.icondianhua:before {
  content: "\e6f9";
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

.iconxiaoxi1:before {
  content: "\e618";
}

.iconshouye:before {
  content: "\e606";
}

.icontianchongxing-:before {
  content: "\e636";
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

.iconxiaoxi2:before {
  content: "\e648";
}

.iconchanpin_yonghuzhifu:before {
  content: "\e603";
}

.iconxitongpeizhi:before {
  content: "\e644";
}

.iconziyuan:before {
  content: "\e61d";
}

.iconshezhi:before {
  content: "\e61b";
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
