(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/meApplyMessage"],{"0655":function(t,e,n){"use strict";var a=n("ac00"),u=n.n(a);u.a},7641:function(t,e,n){"use strict";(function(t,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u=s(n("4e16"));function s(t){return t&&t.__esModule?t:{default:t}}var o=getApp(),i={data:function(){return{list:[],type:"",imgUrl:""}},onLoad:function(e){console.log(t(e," at pages\\meApplyMessage.vue:57")),a.setNavigationBarTitle({title:e.title}),this.type=e.type,this.getList(),this.imgUrl=u.default.imgUrl},methods:{getList:function(){var e=this,n="";"1"==this.type?n="abouts":"2"==this.type?n="comments":"3"==this.type&&(n="news-list"),a.request({url:"".concat(u.default.requestUrl,"/user/").concat(n),method:"GET",header:{authorization:o.globalData.token},success:function(n){n=u.default.null2str(n),console.log(t(n," at pages\\meApplyMessage.vue:84")),200==n.data.status_code&&(e.list=n.data.data)}})}}};e.default=i}).call(this,n("0de9")["default"],n("6e42")["default"])},"8ec8":function(t,e,n){"use strict";n.r(e);var a=n("7641"),u=n.n(a);for(var s in a)"default"!==s&&function(t){n.d(e,t,function(){return a[t]})}(s);e["default"]=u.a},"99bb":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},u=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return u})},ac00:function(t,e,n){},bb41:function(t,e,n){"use strict";(function(t){n("99a1"),n("921b");a(n("66fd"));var e=a(n("d7b7"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},d7b7:function(t,e,n){"use strict";n.r(e);var a=n("99bb"),u=n("8ec8");for(var s in u)"default"!==s&&function(t){n.d(e,t,function(){return u[t]})}(s);n("0655");var o=n("2877"),i=Object(o["a"])(u["default"],a["a"],a["b"],!1,null,null,null);e["default"]=i.exports}},[["bb41","common/runtime","common/vendor"]]]);