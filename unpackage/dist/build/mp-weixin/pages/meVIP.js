(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/meVIP"],{"013c":function(n,t,i){"use strict";i.r(t);var e=i("3bb5"),o=i("6c77");for(var a in o)"default"!==a&&function(n){i.d(t,n,function(){return o[n]})}(a);i("143d");var c,u=i("f0c5"),l=Object(u["a"])(o["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],c);t["default"]=l.exports},"0153":function(n,t,i){},"143d":function(n,t,i){"use strict";var e=i("0153"),o=i.n(e);o.a},"2c3d":function(n,t,i){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e=o(i("a3a0"));function o(n){return n&&n.__esModule?n:{default:n}}var a=getApp(),c={data:function(){return{isCheck:!1,bannerIndex:"0",current:"0",list:[{id:"1",img:"iconchanpin_yonghuzhifu",title:"产品超市",icon:"1"},{id:"2",img:"iconqian_",title:"信贷技术",icon:"1"},{id:"3",img:"iconweixin1",title:"最新资讯",icon:"1"},{id:"4",img:"iconqiyegongchangjianzhu",title:"小微企业",icon:"0"},{id:"5",img:"iconqunfengjingzhunyinliu",title:"精准匹配",icon:"0"},{id:"6",img:"iconxiepinglun",title:"实站心得",icon:"0"},{id:"7",img:"iconliebiao",title:"拒贷汇总",icon:"0"},{id:"8",img:"iconhongbaoguanli",title:"备用金打造",icon:"0"}],vip:[],imgUrl:""}},onLoad:function(){this.vipList(),this.imgUrl=e.default.imgUrl},onShow:function(){console.log(a.globalData.vipIndex),1==a.globalData.vipIndex&&(this.isCheck=!0)},methods:{meTreaty:function(){n.navigateTo({url:"/pages/meTreaty"})},banner:function(n){this.bannerIndex=n.detail.current,console.log(n)},checkboxChange:function(n){this.isCheck=!this.isCheck},vipList:function(){var t=this;n.request({url:"".concat(e.default.requestUrl,"/vips"),method:"GET",header:{authorization:a.globalData.token},success:function(i){n.hideLoading(),i=e.default.null2str(i),console.log(i),200==i.data.status_code?t.vip=i.data:n.showToast({title:i.data.message})}})},goVip:function(t){console.log(this.isCheck),this.isCheck?(console.log(t),n.navigateTo({url:"/pages/payType?id=".concat(t.currentTarget.dataset.id,"&money=").concat(t.currentTarget.dataset.money)})):n.showToast({title:"请同意相关协议",icon:"none",duration:2e3})}}};t.default=c}).call(this,i("543d")["default"])},"3bb5":function(n,t,i){"use strict";var e,o=function(){var n=this,t=n.$createElement;n._self._c},a=[];i.d(t,"b",function(){return o}),i.d(t,"c",function(){return a}),i.d(t,"a",function(){return e})},"6c77":function(n,t,i){"use strict";i.r(t);var e=i("2c3d"),o=i.n(e);for(var a in e)"default"!==a&&function(n){i.d(t,n,function(){return e[n]})}(a);t["default"]=o.a},ecad7:function(n,t,i){"use strict";(function(n){i("b5b4"),i("921b");e(i("66fd"));var t=e(i("013c"));function e(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,i("543d")["createPage"])}},[["ecad7","common/runtime","common/vendor"]]]);