(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/meEditSet"],{"0dc3":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=o(n("a3a0"));function o(t){return t&&t.__esModule?t:{default:t}}var i=getApp(),s=function(){return Promise.all([n.e("common/vendor"),n.e("components/wangding-pickerAddress")]).then(n.bind(null,"968a"))},u={data:function(){return{setData:""}},components:{pickerAddress:s},onLoad:function(e){this.options=e,t.setNavigationBarTitle({title:e.title})},methods:{onInput:function(t){this.setData=t.detail.value},submit:function(){if(""==this.setData)return t.showToast({title:"提交值不能为空",icon:"none"}),!1;if("number"==this.options.type){var e=/(^[1-9]\d*$)/;if(!e.test(this.setData))return t.showToast({title:"请输入正整数",icon:"none"}),""}else if("mail"==this.options.type){var n=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;if(!n.test(this.setData))return t.showToast({title:"请输入正确的邮箱",icon:"none"}),!1}t.showLoading({title:"提交中...",duration:1e6}),t.request({url:"".concat(a.default.requestUrl,"/user/edit"),method:"POST",header:{authorization:i.globalData.token},data:{field:this.options.name,value:this.setData},success:function(e){t.hideLoading(),e=a.default.null2str(e),console.log(e),"1"==e.data.status_code?(t.showToast({title:e.data.message}),setTimeout(function(){t.navigateBack({data:-1})},2e3)):t.showToast({title:e.data.message})}})}}};e.default=u}).call(this,n("543d")["default"])},"4b4e":function(t,e,n){"use strict";var a=n("6cde"),o=n.n(a);o.a},5195:function(t,e,n){"use strict";n.r(e);var a=n("0dc3"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);e["default"]=o.a},"6cde":function(t,e,n){},a57c:function(t,e,n){"use strict";var a,o=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"b",function(){return o}),n.d(e,"c",function(){return i}),n.d(e,"a",function(){return a})},b833:function(t,e,n){"use strict";n.r(e);var a=n("a57c"),o=n("5195");for(var i in o)"default"!==i&&function(t){n.d(e,t,function(){return o[t]})}(i);n("4b4e");var s,u=n("f0c5"),r=Object(u["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],s);e["default"]=r.exports},f367:function(t,e,n){"use strict";(function(t){n("b5b4"),n("921b");a(n("66fd"));var e=a(n("b833"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])}},[["f367","common/runtime","common/vendor"]]]);