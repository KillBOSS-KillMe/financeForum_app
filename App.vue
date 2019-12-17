
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
	
	/*每个页面公共css */
	@font-face {font-family: "iconfont";
	  src: url('//at.alicdn.com/t/font_1566333_92q9xaq6bc.eot?t=1576551781222'); /* IE9 */
	  src: url('//at.alicdn.com/t/font_1566333_92q9xaq6bc.eot?t=1576551781222#iefix') format('embedded-opentype'), /* IE6-IE8 */
	  url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAATgAAsAAAAACZAAAASUAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDMgqGCIUFATYCJAMUCwwABCAFhG0Hbxs4CMgOJQXBwGDgEQFCBM/v923OlbcqbTe5QfLmCa+QNqHWREMkJQiNKJ48EdIfalOPpgp1oapCyEFTgZSQqs3cnyZsi0xUXzu4HH9DfJ7Vdplj8BqAUaAFtLcvsqJAOJIW8Uw6+J/A6wQ6jQuAHMwqqAD6CnVeIHakNAH0IzqloDi0C03G1iJegqo9PdK6hhfO5+OftdAnqZl60/ELmRKQ8hN5c0g0+v++c3k2eNydBewuMhYAhbiYadsh8mILRDrliLa9gPJduyT9jNdDr+ve5P9vAaIFKTq1GFmSfzzRUGXdiN0bL/xEDDKZnxZkEj/ryAS/8gUXRlbJ7E504D+xG7ATI7MixP4oNNhQfXx/52y113Z1FkAf77bfjYge+K/Zg2Hea4pvapxXO6zBdlz23VehrMCO+a4C9zfaWlnRtbYrPUaZO+31WBuz9ahYpfLcpsKOXXVAsCc2a7ZYjy7DkCcr1mwYs15uiSxz8BBkCYouazT2q7ej4LWy4pr+mKqle0G6vw/D8q3ZygDxmjF7cp8K07yvVqurlMqKVXYt+9Woy6hSVc7RBBMrbXkFlzcdu+W0Vog4ftt5wx3+gtptiyb7vMp1o7IrIYvGf99J7R7zp/ecc9Jde1ZOLZ+9c9QKSpauO2ZDrxjbUN1cbfWkLt36r90s82cHk/1K/JIOPjefZZFhM5CkPSequtrruzDcEhu03jDHKCO0bkjW/M/L4cez2OJitW7JZScdvaG9E1HXuqMdPk6OZenn2w7uKzSvBgW9dnb6626fsdRS6IaJTj/oco2xwMNSNtXXG9sO1horz2f1mww+37gO07qSzGRG1M7NLLCdaXkQtyuxxw2rL4CNV+aBed4L9QYGkgZM8UI/LbAQoSgEYwUUVYhISwp00/UG3zeExTYgAwMIihsYNrJDfcLe6w2m61bRIoXiEU+/Ghl//SE8cnZ6lOwmlJY5ORkWQShz2Hi3YCA8cnJ+JDx9ZGz01VuFcLy3sFc4Ru7AOrDt4N1Snp9pZ2Y3s0mNNp8dtT0THg16AbR25COiegq/tYB8Dt+dtfPjxNt0P1u+UdOc/Kvc02yS8Esfu5I9n5wpSLyt7gKq814LOZn//vArthRFqOprkcoNnmSvHoZ43fBflZK3xjXoMVGMVC4ktBsJIGkzBlm7CaRgF6DqsgGNdnug07zs3V2GcESidGDOFEDodwCSXm8g63cdKdhHUI36BI3+EEGnE2FxZJepkKLpHCR4KMHFfbiUZBlKN/KoW1wGaUUHwYWFDq4KcnJpEA8NCoknsyEDuS5WyLvpMJ6ncIpjO/EsuA12dLC4jGPbIMkHtfK8LC44mMp6URDJdgLUARyIwIMkcGJ9cFIkFoOyuvPQxPvLQDSFDgSuoKLMWgXiyEkHx4UKElIByZYxlSpOZbRcN1oYHo+iZlE4rE64LLRAHVqMhZNlT2oDkXhBWhtEZOIEk05UVVnQ8IrOc8z/eKuqK2ukyFGiRqO5STD6CH0KMr1SgqH1DiKzuV/BepOtEXUfa2TzCrGUYAML2DiEoSUES7YqAvvBTDBdjhYA') format('woff2'),
	  url('//at.alicdn.com/t/font_1566333_92q9xaq6bc.woff?t=1576551781222') format('woff'),
	  url('//at.alicdn.com/t/font_1566333_92q9xaq6bc.ttf?t=1576551781222') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
	  url('//at.alicdn.com/t/font_1566333_92q9xaq6bc.svg?t=1576551781222#iconfont') format('svg'); /* iOS 4.1- */
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
	
	.iconfenxiang:before {
	  content: "\e613";
	}
	
	.iconico_zuo:before {
	  content: "\e601";
	}
	
	.iconchangyongtubiao-xianxingdaochu-zhuanqu-:before {
	  content: "\e74b";
	}


</style>
