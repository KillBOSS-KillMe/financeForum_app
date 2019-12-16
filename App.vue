
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
	
	
	/*每个页面公共css */
	@font-face {font-family: "iconfont";
	  src: url('//at.alicdn.com/t/font_1566333_h1ojde4vym.eot?t=1576488644039'); /* IE9 */
	  src: url('//at.alicdn.com/t/font_1566333_h1ojde4vym.eot?t=1576488644039#iefix') format('embedded-opentype'), /* IE6-IE8 */
		  url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAKgAAsAAAAABmAAAAJVAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcApIWwE2AiQDCAsGAAQgBYRtB1EbogURFYw9si8O7GYf78CmjBARF0Xfm5+oDoHFlXsfD//t9799Zua+P1/M8MQiiWkySSQIWZOXToiEAqFoxSP5JiDPxNam6DcqwjAl58F3+R/5CYSG0GVE//fWB9txI8yG890luqwXX5QHEhXmBcAf907/BApkPqAc1940qQuoiwMpoLE2RVYkkTeMXfACjxPosWCbODw5D1VhjwvEwzQmqAW3orBYFToNS4t4pVHTi/QRL6Pvxx/bo5I0mV1w/oGtsP/HKScha10LEB4CWt0gYxsKcbkxfFYWjJL1hIsVjpUb/DjVtoFWHFUl2F9nZ/eBOch+Jo7HfdRYgsdqawgTk64khh4P+3J10ep63mo8pv+dyGzI9PMbdii8XT/534H9oP2ZPucxgeDwzv94QP+vvQV8nqcvcrY/i2FW6h4swZ/gDKwpBs/WpKJxGhuToTMU9ehBC9tHfJ8qHz9tPFTjE6xd5jPIqjW0kNug0WsHdFT7oMdWx1b3GvVIFqUbWzwBEIa8h2TAB8iGfEIL+Q0aE/5Bx1Bk6HE12rLXhkAkdYhRCzowX0iWNu/qRMW5FwznojnPi6gP5CP5oG+6cmzGDXmJGccrDCIePNMKEzgNl4VgZ8popYki+9i2vulNjaW1Ug4xakEHzBckS5sPmouqfP6C4Vw0d1TVWR/IR+oc9BrdAHQWb4OqHuWV4xUGIh54phVMYBAuC4G9eVBGK404IbiPWqeeHyputpeuf7cFetiKFE6XbOPdqLfwJa9ATpM01R9fsMEuW3CabDzrHzDo7RmpqgoA') format('woff2'),
		  url('//at.alicdn.com/t/font_1566333_h1ojde4vym.woff?t=1576488644039') format('woff'),
		  url('//at.alicdn.com/t/font_1566333_h1ojde4vym.ttf?t=1576488644039') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
		  url('//at.alicdn.com/t/font_1566333_h1ojde4vym.svg?t=1576488644039#iconfont') format('svg'); /* iOS 4.1- */
	}
	
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 16px;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	.iconchangyongtubiao-xianxingdaochu-zhuanqu-:before {
	  content: "\e74b";
	}

</style>
