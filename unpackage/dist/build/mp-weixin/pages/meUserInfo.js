(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/meUserInfo"],{"32ba":function(t,e,n){"use strict";(function(t){n("99a1"),n("921b");a(n("66fd"));var e=a(n("5091"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"4c28":function(t,e,n){"use strict";n.r(e);var a=n("8834"),o=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,function(){return a[t]})}(u);e["default"]=o.a},5091:function(t,e,n){"use strict";n.r(e);var a=n("ac6e"),o=n("4c28");for(var u in o)"default"!==u&&function(t){n.d(e,t,function(){return o[t]})}(u);n("a3eb");var i=n("2877"),l=Object(i["a"])(o["default"],a["a"],a["b"],!1,null,null,null);e["default"]=l.exports},8834:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=o(n("4e16"));function o(t){return t&&t.__esModule?t:{default:t}}var u=getApp(),i={data:function(){return{Inv:0,imgUrl:"",publishList:[],userInfo:[]}},onLoad:function(){this.imgUrl=a.default.imgUrl,this.getUserInfo(),this.getPublish()},methods:{changeTab:function(t){console.log(t),this.Inv=t},edit:function(){t.navigateTo({url:"/pages/meEdit"})},meFan:function(){t.navigateTo({url:"/pages/meFan"})},meFollow:function(){t.navigateTo({url:"/pages/meFollow"})},getPublish:function(){var e=this;t.showLoading({title:"加载中...",duration:1e6}),t.request({url:"".concat(a.default.requestUrl,"/user/publish"),method:"GET",header:{authorization:u.globalData.token},success:function(n){console.log(n),t.hideLoading(),n=a.default.null2str(n),"1"==n.data.status_code?e.publishList=n.data.data:t.showToast({title:n.data.message,icon:"none"})}})},getUserInfo:function(){var e=this;t.showLoading({title:"用户信息获取中..."}),t.request({url:"".concat(a.default.requestUrl,"/me"),method:"POST",header:{authorization:u.globalData.token},success:function(n){t.hideLoading(),n=a.default.null2str(n),console.log(n.data,"+++++++++"),e.userInfo=n.data,n.data.status_code}})}}};e.default=i}).call(this,n("543d")["default"])},a3eb:function(t,e,n){"use strict";var a=n("dcbc"),o=n.n(a);o.a},ac6e:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return o})},dcbc:function(t,e,n){}},[["32ba","common/runtime","common/vendor"]]]);