(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/exchang"],{"016b":function(t,e,a){"use strict";a.r(e);var n=a("4e2f"),i=a("ef36");for(var o in i)"default"!==o&&function(t){a.d(e,t,function(){return i[t]})}(o);a("29dd");var u=a("2877"),c=Object(u["a"])(i["default"],n["a"],n["b"],!1,null,null,null);e["default"]=c.exports},"0404":function(t,e,a){"use strict";(function(t){a("99a1"),a("921b");n(a("66fd"));var e=n(a("016b"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("6e42")["createPage"])},"29dd":function(t,e,a){"use strict";var n=a("69c4"),i=a.n(n);i.a},"4e2f":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},i=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return i})},"69c4":function(t,e,a){},"719d":function(t,e,a){"use strict";(function(t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=o(a("4e16"));function o(t){return t&&t.__esModule?t:{default:t}}var u=getApp(),c={data:function(){return{navList:[{id:"1",img:"iconxiepinglun",title:"实战心得"},{id:"2",img:"iconliebiao",title:"拒贷汇总"},{id:"3",img:"iconbulletin",title:"微金公告"},{id:"4",img:"iconyonghu",title:"从业感悟"},{id:"5",img:"iconqiapiansousuo",title:"论坛搜索"}],Inv:0,pageData:"",imgUrl:"",page:"1"}},onLoad:function(){this.getIndexData(),this.imgUrl=i.default.imgUrl},methods:{selListType:function(t){this.Inv=t.currentTarget.dataset.index,this.boardId=t.currentTarget.dataset.block_id},goDetail:function(e){t.navigateTo({url:"/pages/articleDetail?id=".concat(e)})},getIndexData:function(){var e=this;t.showLoading({title:"加载中...",duration:1e6}),t.request({url:"".concat(i.default.requestUrl,"/forum/index"),method:"GET",header:{authorization:u.globalData.token},success:function(a){t.hideLoading(),a=i.default.null2str(a),console.log(n(a," at pages\\exchang.vue:115")),"200"==a.data.status_code?e.pageData=a.data.data:t.showToast({title:a.data.message,icon:"none"})}})},getNav:function(e){console.log(n(e," at pages\\exchang.vue:129"));var a=e;"1"==a&&t.navigateTo({url:"/pages/experience"})},onReachBottom:function(){this.page++,this.getList()},getList:function(){var e=this;t.showLoading({title:"加载中...",duration:1e6}),t.request({url:"".concat(i.default.requestUrl,"/forum/posts"),method:"GET",header:{authorization:u.globalData.token},data:{board_id:this.boardId,page:this.page,page_size:"10"},success:function(a){t.hideLoading(),a=i.default.null2str(a),console.log(n(a," at pages\\exchang.vue:161")),"200"==a.data.status_code?e.pageData=e.pageData.concat(a.data.data):t.showToast({title:a.data.message,icon:"none"})}})}}};e.default=c}).call(this,a("6e42")["default"],a("0de9")["default"])},ef36:function(t,e,a){"use strict";a.r(e);var n=a("719d"),i=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,function(){return n[t]})}(o);e["default"]=i.a}},[["0404","common/runtime","common/vendor"]]]);