(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/meFan"],{"28d8":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=o(a("4e16"));function o(t){return t&&t.__esModule?t:{default:t}}var u=getApp(),s={data:function(){return{list:[]}},onLoad:function(){this.getList()},methods:{getList:function(){var e=this;t.showLoading({title:"加载中...",duration:1e6}),t.request({url:"".concat(n.default.requestUrl,"/user/fans"),method:"GET",header:{authorization:u.globalData.token},success:function(a){t.hideLoading(),a=n.default.null2str(a),console.log(a),"1"==a.data.status_code?e.list=a.data.data:t.showToast({title:a.data.message,icon:"none"})}})},delFollows:function(e){var a=this,o=e.currentTarget.dataset.id,s=e.currentTarget.dataset.index;t.showLoading({title:"执行中...",duration:1e6}),t.request({url:"".concat(n.default.requestUrl,"/user/del_follow"),method:"POST",header:{authorization:u.globalData.token},data:{follow_id:o},success:function(e){t.hideLoading(),e=n.default.null2str(e),console.log(e),"1"==e.data.status_code?(a.list.splice(s,1),t.showToast({title:e.data.message})):t.showToast({title:e.data.message,icon:"none"})}})}}};e.default=s}).call(this,a("543d")["default"])},"29b5":function(t,e,a){"use strict";var n=a("ebc1"),o=a.n(n);o.a},"69be":function(t,e,a){"use strict";(function(t){a("99a1"),a("921b");n(a("66fd"));var e=n(a("e75e"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},"7f44":function(t,e,a){"use strict";a.r(e);var n=a("28d8"),o=a.n(n);for(var u in n)"default"!==u&&function(t){a.d(e,t,function(){return n[t]})}(u);e["default"]=o.a},c19f:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},o=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return o})},e75e:function(t,e,a){"use strict";a.r(e);var n=a("c19f"),o=a("7f44");for(var u in o)"default"!==u&&function(t){a.d(e,t,function(){return o[t]})}(u);a("29b5");var s=a("2877"),i=Object(s["a"])(o["default"],n["a"],n["b"],!1,null,null,null);e["default"]=i.exports},ebc1:function(t,e,a){}},[["69be","common/runtime","common/vendor"]]]);