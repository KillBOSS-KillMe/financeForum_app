(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/articleDetail"],{"18ee":function(t,e,o){},"402e":function(t,e,o){"use strict";o.r(e);var a=o("fcd0"),s=o.n(a);for(var n in a)"default"!==n&&function(t){o.d(e,t,function(){return a[t]})}(n);e["default"]=s.a},"4b57":function(t,e,o){"use strict";o.r(e);var a=o("79cb"),s=o("402e");for(var n in s)"default"!==n&&function(t){o.d(e,t,function(){return s[t]})}(n);o("f60a");var i=o("2877"),l=Object(i["a"])(s["default"],a["a"],a["b"],!1,null,null,null);e["default"]=l.exports},"79cb":function(t,e,o){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},s=[];o.d(e,"a",function(){return a}),o.d(e,"b",function(){return s})},b5f4:function(t,e,o){"use strict";(function(t){o("99a1"),o("921b");a(o("66fd"));var e=a(o("4b57"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,o("543d")["createPage"])},f60a:function(t,e,o){"use strict";var a=o("18ee"),s=o.n(a);s.a},fcd0:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=s(o("4e16"));function s(t){return t&&t.__esModule?t:{default:t}}var n=getApp(),i={data:function(){return{focus:!1,isShow:"0",isHide:"0",info:{id:"1",title:"有钱花二次贷，只要有信用卡或者有公积金就 来，人均10000起步，秒批最高10万，当天到 账",img:"../static/logo.png",name:"admin",type:"楼主",time:"1小时之前"},nodes:[{name:"div",attrs:{class:"div-class",style:"color: #333333;font-size:14px;line-height:20px;"},children:[{type:"text",text:"公告年终业绩每股收入是:3.98元，（即是第四季度收入是:1.87元的）；2017年前三3季度每股收入业绩是:1.99元，公告"}]}],commentList:[],articleDetail:null,options:null,imgUrl:"",page:"1",postContent:"",just_landlord:"",comment_id:"",isSex:"0"}},onLoad:function(t){this.options=t,this.imgUrl=a.default.imgUrl,this.getArticleDetail()},onShow:function(){this.getComment()},methods:{getContent:function(t){this.postContent=t.detail.value,console.log(t)},getArticleDetail:function(){var e=this;t.showLoading({title:"加载中...",duration:1e6}),t.request({url:"".concat(a.default.requestUrl,"/posts/show"),method:"GET",header:{authorization:n.globalData.token},data:{post_id:this.options.id},success:function(o){t.hideLoading(),o=a.default.null2str(o),console.log(o),200==o.data.status_code?(e.articleDetail=o.data,"f"==e.articleDetail.user.sex&&(e.isSex="1")):(t.showToast({title:o.data.message,icon:"none"}),t.navigateBack({delta:1}))}})},shareFriend:function(){this.share("WXSceneSession")},shareFriendcricle:function(){this.share("WXSenceTimeline")},share:function(e){console.log(window.location.href),t.share({provider:"weixin",scene:e,type:0,href:window.location.href,title:this.articleDetail.title,summary:"唐艺昕，没有水的地方叫沙漠，没有你的地方，你知道叫什么吗？不知道。叫寂寞。",imageUrl:"http:*******************",success:function(t){console.log("success:"+JSON.stringify(t))},fail:function(t){console.log("fail:"+JSON.stringify(t))}})},postReward:function(){t.request({url:"".concat(a.default.requestUrl,"/posts/reward"),method:"GET",header:{authorization:n.globalData.token},data:{post_id:this.articleDetail.id},success:function(e){t.hideLoading(),e=a.default.null2str(e),console.log(e),"200"==e.data.status_code?t.showToast({title:"打赏成功"}):t.showToast({title:"打赏失败",icon:"none"})}})},addCollection:function(){var e=this;t.showLoading({title:"加载中...",duration:1e6}),t.request({url:"".concat(a.default.requestUrl,"/user/add_collection"),method:"POST",header:{authorization:n.globalData.token},data:{post_id:this.articleDetail.id},success:function(o){t.hideLoading(),o=a.default.null2str(o),console.log(o),"1"==o.data.status_code?(e.articleDetail.is_collections,t.showToast({title:o.data.message})):t.showToast({title:o.data.message,icon:"none"})}})},delCollection:function(){var e=this;t.showLoading({title:"加载中...",duration:1e6}),t.request({url:"".concat(a.default.requestUrl,"/user/del_collection"),method:"POST",header:{authorization:n.globalData.token},data:{post_id:this.articleDetail.id},success:function(o){t.hideLoading(),o=a.default.null2str(o),console.log(o),"1"==o.data.status_code?(e.articleDetail.is_collections,t.showToast({title:o.data.message})):t.showToast({title:o.data.message,icon:"none"})}})},addFollow:function(){t.showLoading({title:"加载中...",duration:1e6}),t.request({url:"".concat(a.default.requestUrl,"/user/add_follow"),method:"POST",header:{authorization:n.globalData.token},data:{follow_id:this.articleDetail.user_id},success:function(e){t.hideLoading(),e=a.default.null2str(e),console.log(e),"1"==e.data.status_code?t.showToast({title:e.data.message}):t.showToast({title:e.data.message,icon:"none"})}})},getComment:function(){var e=this;t.request({url:"".concat(a.default.requestUrl,"/posts/post-comments"),method:"GET",header:{authorization:n.globalData.token},data:{post_id:this.options.id,just_landlord:this.just_landlord,page:this.page,page_size:"10"},success:function(o){t.hideLoading(),o=a.default.null2str(o),console.log(o,"**********"),"200"==o.data.status_code?e.commentList=e.commentList.concat(o.data.data):t.showToast({title:o.data.message,icon:"none"})}})},postDiscuss:function(){""==this.postContent?t.showToast({title:"请输入发表内容",icon:"none"}):"0"==this.isShow?this.getPost():"1"==this.isShow&&this.postReply()},getPost:function(){var e=this;t.request({url:"".concat(a.default.requestUrl,"/posts/send-comment"),method:"POST",header:{authorization:n.globalData.token},data:{post_id:this.options.id,content:this.postContent},success:function(o){t.hideLoading(),o=a.default.null2str(o),console.log(o),"200"==o.data.status_code?(t.showToast({title:o.data.message,icon:"none"}),e.postContent=" "):t.showToast({title:"发表失败",icon:"none"})}})},reply:function(t){console.log(t),this.comment_id=t.currentTarget.dataset.id,this.isShow=t.currentTarget.dataset.num,this.focus=!0},postReply:function(){var e=this;t.request({url:"".concat(a.default.requestUrl,"/posts/send-reply"),method:"POST",header:{authorization:n.globalData.token},data:{comment_id:this.comment_id,content:this.postContent},success:function(o){t.hideLoading(),o=a.default.null2str(o),console.log(o),"200"==o.data.status_code?(t.showToast({title:o.data.message,icon:"none"}),e.postContent=" ",e.isShow="0"):t.showToast({title:"发表失败",icon:"none"})}})},commentLandlord:function(t){console.log(t),this.just_landlord=t,this.commentList=[],this.page="1",this.getComment()},clickZan:function(e){this.isHide="1",t.request({url:"".concat(a.default.requestUrl,"/posts/like"),method:"GET",header:{authorization:n.globalData.token},data:{post_id:this.articleDetail.id},success:function(e){t.hideLoading(),e=a.default.null2str(e),console.log(e),"200"==e.data.status_code?t.showToast({title:"点赞成功",icon:"none"}):t.showToast({title:"点赞失败",icon:"none"})}})},onReachBottom:function(){this.page++,this.getComment()}}};e.default=i}).call(this,o("543d")["default"])}},[["b5f4","common/runtime","common/vendor"]]]);