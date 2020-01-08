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
  src: url('//at.alicdn.com/t/font_1566333_6oeze2atbq2.eot?t=1578461486520'); /* IE9 */
  src: url('//at.alicdn.com/t/font_1566333_6oeze2atbq2.eot?t=1578461486520#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('//at.alicdn.com/t/font_1566333_6oeze2atbq2.woff?t=1578461486520') format('woff'),
  url('//at.alicdn.com/t/font_1566333_6oeze2atbq2.ttf?t=1578461486520') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('//at.alicdn.com/t/font_1566333_6oeze2atbq2.svg?t=1578461486520#iconfont') format('svg'); /* iOS 4.1- */
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

.iconhongbaoguanli:before {
  content: "\e628";
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

.iconxitongpeizhi:before {
  content: "\e644";
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
