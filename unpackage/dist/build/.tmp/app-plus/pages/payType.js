(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/payType"],{"075f":function(e,t,a){},4078:function(e,t,a){"use strict";var n,o=function(){var e=this,t=e.$createElement;e._self._c},i=[];a.d(t,"b",function(){return o}),a.d(t,"c",function(){return i}),a.d(t,"a",function(){return n})},"45ee":function(e,t,a){"use strict";(function(e,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=i(a("a3a0"));function i(e){return e&&e.__esModule?e:{default:e}}var u=getApp(),s={data:function(){return{options:{},userInfo:{},index:"0",payType:"wechat"}},onLoad:function(e){this.userInfo=u.globalData.userInfo,this.options=e,con},methods:{radioChange:function(t){console.log(e(t," at pages\\payType.vue:63")),this.payType=t.detail.value},wxAppletPay:function(){var e=this;n.showLoading({title:"支付信息加载中...",duration:1e6}),n.request({url:"".concat(o.default.requestUrl,"/buy-vip"),method:"POST",header:{authorization:u.globalData.token},data:{member_id:this.options.id,app_type:"miniapp",pay_type:"wechat"},success:function(t){n.hideLoading(),t=o.default.null2str(t),200==t.statusCode?e.runRecharge(t.data):n.showToast({title:t.data.message,icon:"none",duration:2e3})}})},runRecharge:function(e){n.showToast({title:"支付加载中...",icon:"loading",duration:1e6}),n.requestPayment({provider:"wxpay",timeStamp:e.timeStamp,nonceStr:e.nonceStr,package:e.package,signType:e.signType,paySign:e.paySign,success:function(e){n.hideToast(),e=o.default.null2str(e),n.showToast({title:"支付成功",icon:"success",duration:2e3}),setTimeout(function(e){n.redirectTo({url:"/pages/paySuccess"})},2e3)},fail:function(e){n.showToast({title:"支付失败",icon:"none",duration:2e3})}})},iAgree:function(){var t=this;console.log(e(this.payType," at pages\\payType.vue:139")),n.request({url:"".concat(o.default.requestUrl,"/buy-vip"),method:"POST",header:{authorization:u.globalData.token},data:{member_id:this.options.id,app_type:"app",pay_type:this.payType},success:function(e){t.appWxpay(e.data)}})},appWxpay:function(e){var t="";t="wechat"==this.payType?"wxpay":"alipay",n.requestPayment({provider:t,orderInfo:e,success:function(e){setTimeout(function(e){n.redirectTo({url:"/pages/paySuccess"})},2e3)},fail:function(e){n.showToast({title:"支付失败",icon:"none",duration:2e3})}})}}};t.default=s}).call(this,a("0de9")["default"],a("6e42")["default"])},"62f1":function(e,t,a){"use strict";a.r(t);var n=a("4078"),o=a("7763");for(var i in o)"default"!==i&&function(e){a.d(t,e,function(){return o[e]})}(i);a("e83d");var u,s=a("f0c5"),r=Object(s["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],u);t["default"]=r.exports},7763:function(e,t,a){"use strict";a.r(t);var n=a("45ee"),o=a.n(n);for(var i in n)"default"!==i&&function(e){a.d(t,e,function(){return n[e]})}(i);t["default"]=o.a},"8c48":function(e,t,a){"use strict";(function(e){a("b5b4"),a("921b");n(a("66fd"));var t=n(a("62f1"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,a("6e42")["createPage"])},e83d:function(e,t,a){"use strict";var n=a("075f"),o=a.n(n);o.a}},[["8c48","common/runtime","common/vendor"]]]);