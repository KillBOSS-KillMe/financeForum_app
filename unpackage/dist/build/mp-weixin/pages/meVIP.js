(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/meVIP"],{"1fb9":function(n,t,i){"use strict";i.r(t);var e=i("fb35"),a=i.n(e);for(var o in e)"default"!==o&&function(n){i.d(t,n,function(){return e[n]})}(o);t["default"]=a.a},"642b":function(n,t,i){"use strict";var e=i("b911"),a=i.n(e);a.a},a3cc:function(n,t,i){"use strict";i.r(t);var e=i("cfe8"),a=i("1fb9");for(var o in a)"default"!==o&&function(n){i.d(t,n,function(){return a[n]})}(o);i("642b");var c=i("2877"),u=Object(c["a"])(a["default"],e["a"],e["b"],!1,null,null,null);t["default"]=u.exports},b911:function(n,t,i){},c3a2:function(n,t,i){"use strict";(function(n){i("99a1"),i("921b");e(i("66fd"));var t=e(i("a3cc"));function e(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,i("543d")["createPage"])},cfe8:function(n,t,i){"use strict";var e=function(){var n=this,t=n.$createElement;n._self._c},a=[];i.d(t,"a",function(){return e}),i.d(t,"b",function(){return a})},fb35:function(n,t,i){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e=a(i("4e16"));function a(n){return n&&n.__esModule?n:{default:n}}var o=getApp(),c={data:function(){return{bannerList:[{id:"1",img:"../static/a.jpg"},{id:"2",img:"../static/b.jpg"}],isCheck:!1,bannerIndex:"0",current:"0",list:[{id:"1",img:"iconchanpin_yonghuzhifu",title:"产品超市",icon:"1"},{id:"2",img:"iconqian_",title:"信贷技术",icon:"1"},{id:"3",img:"iconweixin1",title:"最新资讯",icon:"1"},{id:"4",img:"iconqiyegongchangjianzhu",title:"小微企业",icon:"0"},{id:"5",img:"iconqunfengjingzhunyinliu",title:"精准匹配",icon:"0"},{id:"6",img:"iconxiepinglun",title:"实站心得",icon:"0"},{id:"7",img:"iconliebiao",title:"拒贷汇总",icon:"0"},{id:"8",img:"iconhongbaoguanli",title:"备用金打造",icon:"0"}],vip:[]}},onLoad:function(){console.log(o.globalData.vipIndex),1==o.globalData.vipIndex&&(this.isCheck=!0),this.vipList()},methods:{meTreaty:function(){n.navigateTo({url:"/pages/meTreaty"})},banner:function(n){this.bannerIndex=n.detail.current,console.log(n)},checkboxChange:function(n){this.isCheck=0==n,console.log(this.isCheck)},vipList:function(){var t=this;n.request({url:"".concat(e.default.requestUrl,"/vips"),method:"GET",header:{authorization:o.globalData.token},success:function(i){n.hideLoading(),i=e.default.null2str(i),console.log(i),200==i.data.status_code?t.vip=i.data.data:n.showToast({title:i.data.message})}})},goVip:function(t){console.log(t),n.navigateTo({url:"/pages/payType?id=".concat(t.currentTarget.dataset.id,"&money=").concat(t.currentTarget.dataset.money)})}}};t.default=c}).call(this,i("543d")["default"])}},[["c3a2","common/runtime","common/vendor"]]]);