(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/collection"],{"2af2":function(t,a,e){"use strict";(function(t,n){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var o=i(e("a3a0"));function i(t){return t&&t.__esModule?t:{default:t}}var u=getApp(),s={data:function(){return{autoplay:!0,interval:2e3,bannerList:[],list:[],page:"1",imgUrl:"",vip:"",isShow:!1}},onLoad:function(){this.imgUrl=o.default.imgUrl},onShow:function(){this.getAd(),this.getList()},methods:{getAd:function(){var a=this;t.showLoading({title:"加载中...",duration:1e6}),t.request({url:"".concat(o.default.requestUrl,"/board/info"),method:"GET",header:{authorization:u.globalData.token},data:{board_id:"5",page_size:"10",page:1},success:function(e){t.hideLoading(),e=o.default.null2str(e),n("log",e," at pages\\collection.vue:77"),200==e.data.status_code?a.bannerList=e.data.board_ad.aditems:t.showToast({title:e.data.message})}})},getList:function(){var a=this;t.showLoading({title:"加载中...",duration:1e6}),t.request({url:"".concat(o.default.requestUrl,"/posts/board-posts"),method:"GET",header:{authorization:u.globalData.token},data:{board_id:"5",page_size:"10",page:this.page},success:function(e){t.hideLoading(),e=o.default.null2str(e),n("log",e," at pages\\collection.vue:108"),200==e.data.status_code?(a.list=a.list.concat(e.data.data),0==e.data.data&&t.showToast({title:"暂无更多数据",icon:"none"})):202==e.data.status_code?(a.vip=e.data.message,a.isShow=!0):t.showToast({title:e.data.message,icon:"none",duration:3e3})}})},goDetail:function(a){t.navigateTo({url:"/pages/articleDetail?id=".concat(a)})},onReachBottom:function(){this.page++,this.getList()}}};a.default=s}).call(this,e("6e42")["default"],e("0de9")["default"])},"65e5":function(t,a,e){"use strict";var n=e("9a2e"),o=e.n(n);o.a},6763:function(t,a,e){"use strict";(function(t){e("b5b4"),e("921b");n(e("66fd"));var a=n(e("bdaf"));function n(t){return t&&t.__esModule?t:{default:t}}t(a.default)}).call(this,e("6e42")["createPage"])},9080:function(t,a,e){"use strict";e.r(a);var n=e("2af2"),o=e.n(n);for(var i in n)"default"!==i&&function(t){e.d(a,t,function(){return n[t]})}(i);a["default"]=o.a},"9a2e":function(t,a,e){},bdaf:function(t,a,e){"use strict";e.r(a);var n=e("ccf4"),o=e("9080");for(var i in o)"default"!==i&&function(t){e.d(a,t,function(){return o[t]})}(i);e("65e5");var u,s=e("f0c5"),c=Object(s["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],u);a["default"]=c.exports},ccf4:function(t,a,e){"use strict";var n,o=function(){var t=this,a=t.$createElement;t._self._c},i=[];e.d(a,"b",function(){return o}),e.d(a,"c",function(){return i}),e.d(a,"a",function(){return n})}},[["6763","common/runtime","common/vendor"]]]);