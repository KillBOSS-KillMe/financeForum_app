(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index"],{"08e4":function(t,e,a){"use strict";a.r(e);var n=a("9e49"),o=a.n(n);for(var i in n)"default"!==i&&function(t){a.d(e,t,function(){return n[t]})}(i);e["default"]=o.a},2206:function(t,e,a){"use strict";(function(t){a("99a1"),a("921b");n(a("66fd"));var e=n(a("276a"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("6e42")["createPage"])},"276a":function(t,e,a){"use strict";a.r(e);var n=a("b44a"),o=a("08e4");for(var i in o)"default"!==i&&function(t){a.d(e,t,function(){return o[t]})}(i);a("8b94");var u=a("2877"),r=Object(u["a"])(o["default"],n["a"],n["b"],!1,null,null,null);e["default"]=r.exports},"8b94":function(t,e,a){"use strict";var n=a("97c7"),o=a.n(n);o.a},"97c7":function(t,e,a){},"9e49":function(t,e,a){"use strict";(function(t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(a("4e16"));function i(t){return t&&t.__esModule?t:{default:t}}var u=getApp(),r={data:function(){return{indicatorDots:!0,autoplay:!0,interval:2e3,duration:500,Inv:0,boardId:"",pageNode:[],imgUrl:"",page_size:10,page:1}},onLaunch:function(){},onShow:function(){this.imgUrl=o.default.imgUrl,this.getUserInfo(),this.getList()},onHide:function(){},onLoad:function(){},methods:{goNavs:function(e){var a=e.currentTarget.dataset.link,o=e.currentTarget.dataset.bind_board,i=e.currentTarget.dataset.id,u=e.currentTarget.dataset.name;console.log(t(o," at pages\\index.vue:95")),"0"==o?n.navigateTo({url:"/pages/".concat(a)}):"1"==o&&n.navigateTo({url:"/pages/indexAccurate?id=".concat(i,"&name=").concat(u)})},selListType:function(t){this.Inv=t.currentTarget.dataset.index,this.boardId=t.currentTarget.dataset.block_id,this.page="1"},goBanner:function(e){console.log(t(e," at pages\\index.vue:114"))},goDetail:function(e){console.log(t(e," at pages\\index.vue:118")),n.navigateTo({url:"/pages/articleDetail?id=".concat(e.currentTarget.dataset.id)})},getUserInfo:function(){var e=this;n.showLoading({title:"用户信息获取中..."}),n.request({url:"".concat(o.default.requestUrl,"/me"),method:"POST",header:{authorization:u.globalData.token},success:function(a){n.hideLoading(),a=o.default.null2str(a),console.log(t(a,"++++++++"," at pages\\index.vue:137")),e.userInfo=a.data,u.globalData.userInfo=a.data,console.log(t(e.userInfo.mobile," at pages\\index.vue:140"))}})},getList:function(){var t=this;n.showLoading({title:"加载中...",duration:1e6}),n.request({url:"".concat(o.default.requestUrl,"/index"),method:"GET",header:{},success:function(e){if(n.hideLoading(),e=o.default.null2str(e),200==e.data.status_code){var a=e.data.data;t.pageNode=a,a.board_data.length>0&&(t.boardId=a.board_data[0].block_id)}else n.showToast({title:e.data.message})}})},onReachBottom:function(){var e=this;console.log(t(this.boardId," at pages\\index.vue:176")),this.page++,n.showLoading({title:"加载中...",duration:1e6}),n.request({url:"".concat(o.default.requestUrl,"/index-board-posts"),method:"GET",header:{authorization:u.globalData.token},data:{board_id:this.boardId,page_size:this.page_size,page:this.page},success:function(t){n.hideLoading(),t=o.default.null2str(t),200==t.data.status_code?(""==t.data.data&&n.showToast({title:"暂无数据",icon:"none"}),e.pageNode=e.pageNode.concat(t.data.data)):n.showToast({title:t.data.message})}})}}};e.default=r}).call(this,a("0de9")["default"],a("6e42")["default"])},b44a:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},o=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return o})}},[["2206","common/runtime","common/vendor"]]]);