
// customData = {}  // 自定义数据
// customFunction ()　{}  // 自定义方法
// onLoad () {}  // 在Page和Component共用的生命周期函数
// onShow () {}  // 只在Page中存在的页面生命周期函数
// config = {};  // 只在Page实例中存在的配置数据，对应于原生的page.json文件
// data = {};  // 页面所需数据均需在这里声明，可用于模板数据绑定
// components = {};  // 声明页面中所引用的组件，或声明组件中所引用的子组件
// mixins = [];  // 声明页面所引用的Mixin实例
// computed = {};  // 声明计算属性（详见后文介绍）
// watch = {};  // 声明数据watcher（详见后文介绍）
// methods = {};  // 声明页面wxml中标签的事件处理函数。注意，此处只用于声明页面wxml中标签的bind、catch事件，自定义方法需以自定义方法的方式声明
// 普通自定义方法在methods对象外声明，与methods平级
// events = {};  // 声明组件之间的事件处理函数
//props  {传值}  在WePY中属于  父子组件之间  传值的一种机制

// 页面跳转，传参写法
// this.$redirect('./page2', {a: 1, b: 2})
// this.$redirect({
//   url: './pages?a=1&b=2'
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
		}
	}
</script>

<style>
	.line{
		width: 750rpx;
		height: 6rpx;
		background: #2390DC;
	}
	text{
		display: block;
	}
	
@font-face {font-family: "iconfont";
  src: url('//at.alicdn.com/t/font_1566333_f3wj55yjsk.eot?t=1576744990556'); /* IE9 */
  src: url('//at.alicdn.com/t/font_1566333_f3wj55yjsk.eot?t=1576744990556#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('//at.alicdn.com/t/font_1566333_f3wj55yjsk.woff?t=1576744990556') format('woff'),
  url('//at.alicdn.com/t/font_1566333_f3wj55yjsk.ttf?t=1576744990556') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('//at.alicdn.com/t/font_1566333_f3wj55yjsk.svg?t=1576744990556#iconfont') format('svg'); /* iOS 4.1- */
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




</style>
