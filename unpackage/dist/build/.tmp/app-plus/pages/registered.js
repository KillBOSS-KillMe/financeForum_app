(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/registered"],{"1c8e":function(e,t,o){},"30ec":function(e,t,o){"use strict";(function(e,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=a(o("a3a0"));function a(e){return e&&e.__esModule?e:{default:e}}getApp();var r={data:function(){return{title:"Hello",disabled:!1,currentTime:60,time:"获取验证码",formNode:{mobile:"",code:"",password:"",verification_key:"",password1:"",invitation:""}}},onLoad:function(t){if(e("log",decodeURIComponent(t.q),"-------------"," at pages\\registered.vue:37"),"undefined"!=t.q){var o=decodeURIComponent(t.q);e("log",o," at pages\\registered.vue:41"),this.formNode.invitation=i.default.getQueryString(o,"invitation"),e("log",this.formNode.invitation,"999"," at pages\\registered.vue:43")}else this.formNode.invitation=""},methods:{getLoginName:function(e){var t=this.formNode,o=e.currentTarget.dataset.name,n=e.detail.value;t[o]=n,this.formNode=t},getCode:function(){var t=this;return!this.disabled&&(""==this.formNode.mobile?(wx.showToast({title:"请输入手机号",icon:"none",duration:2e3}),!1):11!=this.formNode.mobile.length?(wx.showToast({title:"请输入正确的手机号",icon:"none",duration:2e3}),!1):(n.showToast({title:"请求发送中...",icon:"loading",duration:1e3}),this.disabled=!0,e("log",i.default.requestUrl," at pages\\registered.vue:88"),n.showLoading({title:"加载中...",duration:1e6}),void n.request({url:"".concat(i.default.requestUrl,"/send_sms"),method:"POST",data:{mobile:this.formNode.mobile},success:function(o){e("log",o," at pages\\registered.vue:100"),n.hideLoading(),o=i.default.null2str(o),200==o.statusCode?(t.formNode.verification_key=o.data.key,t.countdown()):n.showToast({title:o.data.message})}})))},countdown:function(){var e=this,t=this.currentTime;this.time="倒计时".concat(t,"秒");var o=setInterval(function(){e.time="倒计时"+(t-1)+"秒",t--,t<=0&&(clearInterval(o),e.time="重新获取",e.currentTime=60,e.disabled=!1)},1e3)},login:function(){return""==this.formNode.mobile?(n.showToast({title:"请输入手机号",icon:"none",duration:2e3}),!1):11!=this.formNode.mobile.length?(n.showToast({title:"请输入正确的手机号",icon:"none",duration:2e3}),!1):""==this.formNode.code?(n.showToast({title:"请输入验证码",icon:"none",duration:2e3}),!1):""==this.formNode.password?(n.showToast({title:"请输入密码",icon:"none",duration:2e3}),!1):""==this.formNode.password1?(n.showToast({title:"请确认密码",icon:"none",duration:2e3}),!1):this.formNode.password!=this.formNode.password1?(n.showToast({title:"请输入密码一致",icon:"none",duration:2e3}),!1):(n.showLoading({title:"注册中...",duration:1e6}),void n.request({url:"".concat(i.default.requestUrl,"/register"),method:"POST",data:this.formNode,success:function(t){e("log",t," at pages\\registered.vue:194"),n.hideLoading(),t=i.default.null2str(t),1==t.data.status_code?(n.showToast({title:t.data.message}),n.reLaunch({url:"./index"})):n.showToast({title:t.data.message,icon:"none"})}}))}}};t.default=r}).call(this,o("0de9")["default"],o("6e42")["default"])},4134:function(e,t,o){"use strict";var n,i=function(){var e=this,t=e.$createElement;e._self._c},a=[];o.d(t,"b",function(){return i}),o.d(t,"c",function(){return a}),o.d(t,"a",function(){return n})},4923:function(e,t,o){"use strict";var n=o("1c8e"),i=o.n(n);i.a},cb9f:function(e,t,o){"use strict";o.r(t);var n=o("4134"),i=o("ee4f");for(var a in i)"default"!==a&&function(e){o.d(t,e,function(){return i[e]})}(a);o("4923");var r,s=o("f0c5"),d=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],r);t["default"]=d.exports},d30e:function(e,t,o){"use strict";(function(e){o("b5b4"),o("921b");n(o("66fd"));var t=n(o("cb9f"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,o("6e42")["createPage"])},ee4f:function(e,t,o){"use strict";o.r(t);var n=o("30ec"),i=o.n(n);for(var a in n)"default"!==a&&function(e){o.d(t,e,function(){return n[e]})}(a);t["default"]=i.a}},[["d30e","common/runtime","common/vendor"]]]);