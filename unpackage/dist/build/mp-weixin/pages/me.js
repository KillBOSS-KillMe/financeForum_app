(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/me"],{"50eb":function(e,t,n){"use strict";n.r(t);var a=n("f3b0"),u=n.n(a);for(var r in a)"default"!==r&&function(e){n.d(t,e,function(){return a[e]})}(r);t["default"]=u.a},"66db":function(e,t,n){"use strict";var a,u=function(){var e=this,t=e.$createElement;e._self._c},r=[];n.d(t,"b",function(){return u}),n.d(t,"c",function(){return r}),n.d(t,"a",function(){return a})},"6ca6":function(e,t,n){},ce7d:function(e,t,n){"use strict";var a=n("6ca6"),u=n.n(a);u.a},f3b0:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=u(n("a3a0"));function u(e){return e&&e.__esModule?e:{default:e}}var r=getApp(),o={data:function(){return{userInfo:{},imgUrl:"",imageUrl:""}},onLoad:function(){this.imgUrl=a.default.imgUrl},onShow:function(){this.getUserInfo()},methods:{goPageNavigateTo:function(t){console.log(t);var n=t.currentTarget.dataset.name;"meNewbieRead"==n?e.navigateTo({url:"/pages/articleDetail?id=".concat(21)}):"meReserve"==n?e.navigateTo({url:"/pages/indexAccurate?id=".concat(9,"&name=","备用金打造")}):"meAllProduct"==n?e.navigateTo({url:"/pages/indexAccurate?id=".concat(11,"&name=","各省产品汇总")}):e.navigateTo({url:"/pages/".concat(n)})},getUserInfo:function(){var t=this;e.showLoading({title:"用户信息获取中..."}),e.request({url:"".concat(a.default.requestUrl,"/me"),method:"POST",header:{authorization:r.globalData.token},success:function(n){e.hideLoading(),n=a.default.null2str(n),200==n.statusCode&&(t.userInfo=n.data,t.imageUrl=t.imgUrl+t.userInfo.avatar)}})}}};t.default=o}).call(this,n("543d")["default"])},f405:function(e,t,n){"use strict";n.r(t);var a=n("66db"),u=n("50eb");for(var r in u)"default"!==r&&function(e){n.d(t,e,function(){return u[e]})}(r);n("ce7d");var o,c=n("f0c5"),i=Object(c["a"])(u["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);t["default"]=i.exports},f4f5:function(e,t,n){"use strict";(function(e){n("b5b4"),n("921b");a(n("66fd"));var t=a(n("f405"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])}},[["f4f5","common/runtime","common/vendor"]]]);