(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/meSetting"],{"498d":function(t,n,e){"use strict";e.r(n);var u=e("d435"),o=e.n(u);for(var a in u)"default"!==a&&function(t){e.d(n,t,function(){return u[t]})}(a);n["default"]=o.a},"654d":function(t,n,e){},"8d6c":function(t,n,e){"use strict";e.r(n);var u=e("dc50"),o=e("498d");for(var a in o)"default"!==a&&function(t){e.d(n,t,function(){return o[t]})}(a);e("e0d4");var c,r=e("f0c5"),i=Object(r["a"])(o["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],c);n["default"]=i.exports},bc6f:function(t,n,e){"use strict";(function(t){e("b5b4"),e("921b");u(e("66fd"));var n=u(e("8d6c"));function u(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("6e42")["createPage"])},d435:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=o(e("a3a0"));function o(t){return t&&t.__esModule?t:{default:t}}var a=getApp(),c={data:function(){return{}},methods:{modifyPassword:function(){t.navigateTo({url:"/pages/forgetPassword"})},delCaching:function(){t.showModal({title:"提示",content:"确认删除缓存",success:function(n){n.confirm?t.clearStorageSync():n.cancel}})},outLogin:function(){var n=this;t.showModal({title:"提示",content:"是否退出系统",success:function(t){t.confirm?n.runOutLogin():t.cancel}})},runOutLogin:function(){t.showLoading({title:"退出系统...",duration:1e6}),t.request({url:"".concat(u.default.requestUrl,"/logout"),method:"POST",header:{authorization:a.globalData.token},success:function(n){t.hideLoading(),n=u.default.null2str(n),1==n.data.state_code?t.reLaunch({url:"/pages/login"}):t.showToast({title:n.data.message})}})}}};n.default=c}).call(this,e("6e42")["default"])},dc50:function(t,n,e){"use strict";var u,o=function(){var t=this,n=t.$createElement;t._self._c},a=[];e.d(n,"b",function(){return o}),e.d(n,"c",function(){return a}),e.d(n,"a",function(){return u})},e0d4:function(t,n,e){"use strict";var u=e("654d"),o=e.n(u);o.a}},[["bc6f","common/runtime","common/vendor"]]]);