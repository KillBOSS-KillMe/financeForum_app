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


// 水平垂直居中
// display: flex;
// align-items: center;
// justify-content: center;

// 居右
// flex-direction:row;
// justify-content:flex-end

// vertical-align:middle;

// overflow:hidden;
// text-overflow:ellipsis;
// white-space:nowrap;

// 自动换行
// word-break:break-all;

// overflow:hidden;
// text-overflow:ellipsis;
// white-space:nowrap;

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
	/*每个页面公共css */
	
</style>
