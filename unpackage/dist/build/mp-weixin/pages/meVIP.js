(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/meVIP"],{"10df":function(n,i,t){"use strict";(function(n){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var e=o(t("ac1e"));function o(n){return n&&n.__esModule?n:{default:n}}var a=getApp(),c={data:function(){return{isCheck:!1,bannerIndex:"0",current:"0",list:[{id:"1",img:"iconchanpin_yonghuzhifu",title:"产品超市",icon:"1"},{id:"2",img:"iconqian_",title:"信贷技术",icon:"1"},{id:"3",img:"iconweixin1",title:"最新资讯",icon:"1"},{id:"4",img:"iconqiyegongchangjianzhu",title:"小微企业",icon:"1"},{id:"5",img:"iconqunfengjingzhunyinliu",title:"精准匹配",icon:"0"},{id:"6",img:"iconxiepinglun",title:"实站心得",icon:"0"},{id:"7",img:"iconliebiao",title:"拒贷汇总",icon:"0"},{id:"8",img:"iconhongbaoguanli",title:"备用金打造",icon:"0"},{id:"9",img:"iconfengxian",title:"风险把控",icon:"1"},{id:"10",img:"icondaikuan1",title:"贷款流程",icon:"1"}],vip:[],imgUrl:""}},onLoad:function(){this.vipList(),this.imgUrl=e.default.imgUrl},onShow:function(){console.log(a.globalData.vipIndex),1==a.globalData.vipIndex&&(this.isCheck=!0)},methods:{meTreaty:function(){n.navigateTo({url:"/pages/meTreaty"})},banner:function(n){this.bannerIndex=n.detail.current,console.log(n)},checkboxChange:function(n){this.isCheck=!this.isCheck},vipList:function(){var i=this;n.request({url:"".concat(e.default.requestUrl,"/vips"),method:"GET",header:{authorization:a.globalData.token},success:function(t){n.hideLoading(),t=e.default.null2str(t),console.log(t),200==t.data.status_code?i.vip=t.data:n.showToast({title:t.data.message})}})},goVip:function(i){console.log(this.isCheck),this.isCheck?(console.log(i),n.navigateTo({url:"/pages/payType?id=".concat(i.currentTarget.dataset.id,"&money=").concat(i.currentTarget.dataset.money)})):n.showToast({title:"请同意相关协议",icon:"none",duration:2e3})}}};i.default=c}).call(this,t("543d")["default"])},"8b1b":function(n,i,t){"use strict";(function(n){t("1549"),t("921b");e(t("66fd"));var i=e(t("d486"));function e(n){return n&&n.__esModule?n:{default:n}}n(i.default)}).call(this,t("543d")["createPage"])},a814:function(n,i,t){"use strict";var e=t("f74d"),o=t.n(e);o.a},d1b5:function(n,i,t){"use strict";t.r(i);var e=t("10df"),o=t.n(e);for(var a in e)"default"!==a&&function(n){t.d(i,n,function(){return e[n]})}(a);i["default"]=o.a},d486:function(n,i,t){"use strict";t.r(i);var e=t("f2c3"),o=t("d1b5");for(var a in o)"default"!==a&&function(n){t.d(i,n,function(){return o[n]})}(a);t("a814");var c,u=t("f0c5"),l=Object(u["a"])(o["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],c);i["default"]=l.exports},f2c3:function(n,i,t){"use strict";var e,o=function(){var n=this,i=n.$createElement;n._self._c},a=[];t.d(i,"b",function(){return o}),t.d(i,"c",function(){return a}),t.d(i,"a",function(){return e})},f74d:function(n,i,t){}},[["8b1b","common/runtime","common/vendor"]]]);