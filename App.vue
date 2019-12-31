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
								console.log(data)
								if (data.statusCode == '200') {
									let token = `${data.data.token}`;
									this.$options.globalData.token = token;
									console.log(this.$options.globalData.token)
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
}@font-face {font-family: "iconfont";
  src: url('//at.alicdn.com/t/font_1566333_fq8udkego3d.eot?t=1577756821985'); /* IE9 */
  src: url('//at.alicdn.com/t/font_1566333_fq8udkego3d.eot?t=1577756821985#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('//at.alicdn.com/t/font_1566333_fq8udkego3d.woff?t=1577756821985') format('woff'),
  url('//at.alicdn.com/t/font_1566333_fq8udkego3d.ttf?t=1577756821985') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('//at.alicdn.com/t/font_1566333_fq8udkego3d.svg?t=1577756821985#iconfont') format('svg'); /* iOS 4.1- */
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

.iconzhaopian:before {
  content: "\e640";
}

.iconsousuo:before {
  content: "\e614";
}

.iconicon7:before {
  content: "\e667";
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
