(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/meFavorite"],{"3a0e":function(t,e,n){"use strict";(function(t){n("1549"),n("921b");u(n("66fd"));var e=u(n("96f5"));function u(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"79f5":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u=a(n("ac1e"));function a(t){return t&&t.__esModule?t:{default:t}}var o=getApp(),c={data:function(){return{list:[]}},onLoad:function(){this.getList()},methods:{getList:function(){var e=this;t.showLoading({title:"加载中...",duration:1e6}),t.request({url:"".concat(u.default.requestUrl,"/user/collections"),method:"GET",header:{authorization:o.globalData.token},success:function(n){t.hideLoading(),n=u.default.null2str(n),console.log(n),"1"==n.data.status_code&&(e.list=n.data.data)}})}}};e.default=c}).call(this,n("543d")["default"])},"8f5a":function(t,e,n){"use strict";var u=n("e6cc"),a=n.n(u);a.a},"96f5":function(t,e,n){"use strict";n.r(e);var u=n("b65c"),a=n("ede2");for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);n("8f5a");var c,r=n("f0c5"),i=Object(r["a"])(a["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],c);e["default"]=i.exports},b65c:function(t,e,n){"use strict";var u,a=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"b",function(){return a}),n.d(e,"c",function(){return o}),n.d(e,"a",function(){return u})},e6cc:function(t,e,n){},ede2:function(t,e,n){"use strict";n.r(e);var u=n("79f5"),a=n.n(u);for(var o in u)"default"!==o&&function(t){n.d(e,t,function(){return u[t]})}(o);e["default"]=a.a}},[["3a0e","common/runtime","common/vendor"]]]);