(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/payType"],{"1c95":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement;e._self._c},o=[];a.d(t,"a",function(){return n}),a.d(t,"b",function(){return o})},"4e11":function(e,t,a){},"50c5":function(e,t,a){"use strict";a.r(t);var n=a("1c95"),o=a("c826");for(var i in o)"default"!==i&&function(e){a.d(t,e,function(){return o[e]})}(i);a("99fc");var u=a("2877"),s=Object(u["a"])(o["default"],n["a"],n["b"],!1,null,null,null);t["default"]=s.exports},"7fdf":function(e,t,a){"use strict";(function(e,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=i(a("4e16"));function i(e){return e&&e.__esModule?e:{default:e}}var u=getApp(),s={data:function(){return{options:{},userInfo:{},index:"0",payType:"wechat"}},onLoad:function(e){this.userInfo=u.globalData.userInfo,this.options=e},methods:{radioChange:function(t){console.log(e(t," at pages\\payType.vue:62")),this.payType=t.detail.value},wxAppletPay:function(){var e=this;n.showLoading({title:"支付信息加载中...",duration:1e6}),n.request({url:"".concat(o.default.requestUrl,"/bay-vip"),method:"POST",header:{authorization:u.globalData.token},data:{member_id:this.options.id,app_type:"miniapp",pay_type:"wechat"},success:function(t){n.hideLoading(),t=o.default.null2str(t),200==t.statusCode?e.runRecharge(t.data):n.showToast({title:t.data.message,icon:"none",duration:2e3})}})},runRecharge:function(e){n.showToast({title:"支付加载中...",icon:"loading",duration:1e6}),n.requestPayment({provider:"wxpay",timeStamp:e.timeStamp,nonceStr:e.nonceStr,package:e.package,signType:e.signType,paySign:e.paySign,success:function(e){n.hideToast(),e=o.default.null2str(e),n.showToast({title:"支付成功",icon:"success",duration:2e3}),setTimeout(function(e){n.navigateBack({data:-1})},2e3)},fail:function(e){n.showToast({title:"支付失败",icon:"none",duration:2e3})}})},iAgree:function(){console.log(e(this.payType," at pages\\payType.vue:138")),n.request({url:"".concat(o.default.requestUrl,"/bay-vip"),method:"POST",header:{authorization:u.globalData.token},data:{member_id:this.options.id,pay_type:this.payType},success:function(t){console.log(e(t," at pages\\payType.vue:150")),console.log(e(t.data," at pages\\payType.vue:151")),n.requestPayment({provider:"alipay",orderInfo:t.data,success:function(t){console.log(e("success:"+JSON.stringify(t)," at pages\\payType.vue:157")),console.log(e("*********"," at pages\\payType.vue:158"))},fail:function(e){}})}})}}};t.default=s}).call(this,a("0de9")["default"],a("6e42")["default"])},"99fc":function(e,t,a){"use strict";var n=a("4e11"),o=a.n(n);o.a},b1f3:function(e,t,a){"use strict";(function(e){a("99a1"),a("921b");n(a("66fd"));var t=n(a("50c5"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,a("6e42")["createPage"])},c826:function(e,t,a){"use strict";a.r(t);var n=a("7fdf"),o=a.n(n);for(var i in n)"default"!==i&&function(e){a.d(t,e,function(){return n[e]})}(i);t["default"]=o.a}},[["b1f3","common/runtime","common/vendor"]]]);