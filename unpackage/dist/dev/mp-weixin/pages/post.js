(global.webpackJsonp=global.webpackJsonp||[]).push([["pages/post"],{100:
/*!****************************************************************************!*\
  !*** D:/workspan/financeForum_app/pages/post.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! no static exports found */function(t,e,o){"use strict";o.r(e);var n=o(/*! -!../../../soft/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../soft/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../soft/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../soft/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../soft/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../soft/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./post.vue?vue&type=script&lang=js& */101),i=o.n(n);for(var a in n)"default"!==a&&function(t){o.d(e,t,function(){return n[t]})}(a);e.default=i.a},101:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/workspan/financeForum_app/pages/post.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n,i=(n=o(/*! ../common/helper.js */12))&&n.__esModule?n:{default:n};var a=getApp(),s=t.getRecorderManager(),r=t.createInnerAudioContext();r.autoplay=!0;var c={data:function(){return{formNode:{title:"",content:"",board_id:"",topic_id:""},readOnly:!1,formats:{},title:"",voicePath:"",htmlCon:"",options:null}},onLoad:function(e){var o=this;console.log(e),this.formNode.board_id=e.id,this.options=e,t.loadFontFace({family:"Pacifico",source:'url("https://sungd.github.io/Pacifico.ttf")'}),s.onStop(function(t){console.log("recorder stop"+JSON.stringify(t)),o.voicePath=t.tempFilePath,o.upVoice()})},methods:{submit:function(){var t=this;this.editorCtx.getContents({success:function(e){console.log(e.html),t.htmlCon=e.html,t.upData()}})},upData:function(){return""==this.title?(t.showToast({title:"请输入标题"}),!1):""==this.htmlCon?(t.showToast({title:"请编辑帖子内容"}),!1):(t.showLoading({title:"发布中...",duration:1e6}),void t.request({url:"".concat(i.default.requestUrl,"/posts/send"),method:"POST",header:{authorization:a.globalData.token},data:{board_id:this.options.id,topic_id:"",title:this.title,content:this.htmlCon,voice:this.voicePath},success:function(e){t.hideLoading(),200==(e=i.default.null2str(e)).data.status_code?(t.showToast({title:e.data.message}),t.navigateBack()):t.showToast({title:e.data.message})}}))},getTitle:function(t){this.title=t.detail.value},startRecord:function(){console.log("开始录音"),t.showToast({title:"录音中...",duration:99999999,icon:"loading"}),s.start()},endRecord:function(){console.log("录音结束"),t.hideToast(),t.showToast({title:"结束录音",duration:2e3,icon:"success"}),s.stop()},playVoice:function(){console.log("播放录音"),this.voicePath&&(r.src=this.voicePath,r.play())},upVoice:function(){var e=this;console.log("========================================="),console.log(this.voicePath),t.showLoading({title:"语音上传中...",duration:1e6}),t.uploadFile({url:"".concat(i.default.requestUrl,"/posts/uploads"),filePath:this.voicePath,name:"file",header:{authorization:a.globalData.token},success:function(o){t.hideLoading(),o=i.default.null2str(o),200==(o=JSON.parse(o.data)).status_code?e.voicePath=o.data.path:t.showToast({title:"上传失败，请重新录音"})}})},readOnlyChange:function(){this.readOnly=!this.readOnly},onEditorReady:function(){var e=this;t.createSelectorQuery().select("#editor").context(function(t){e.editorCtx=t.context}).exec()},undo:function(){this.editorCtx.undo()},redo:function(){this.editorCtx.redo()},format:function(t){var e=t.target.dataset,o=e.name,n=e.value;o&&this.editorCtx.format(o,n)},onStatusChange:function(t){var e=t.detail;this.formats=e},insertDivider:function(){this.editorCtx.insertDivider({success:function(){}})},clear:function(){this.editorCtx.clear({success:function(t){}})},removeFormat:function(){this.editorCtx.removeFormat()},insertDate:function(){var t=new Date,e="".concat(t.getFullYear(),"/").concat(t.getMonth()+1,"/").concat(t.getDate());this.editorCtx.insertText({text:e})},insertImage:function(){var e=this;t.chooseImage({count:1,success:function(o){t.showToast({title:"图片上传中",icon:"loading"}),Promise.all(o.tempFiles.map(function(e){return new Promise(function(o,n){t.uploadFile({url:"".concat(i.default.requestUrl,"/posts/uploads"),filePath:e.path,name:"file",header:{authorization:a.globalData.token},success:function(t){o({path:JSON.parse(t.data).data})}})})})).then(function(o){t.hideToast(),e.editorCtx.insertImage({src:o[0].path.path,alt:"图像",success:function(){}})}).catch(function(t){return console.log(t)})}})}}};e.default=c}).call(this,o(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1).default)},102:
/*!************************************************************************************!*\
  !*** D:/workspan/financeForum_app/pages/post.vue?vue&type=style&index=0&lang=css& ***!
  \************************************************************************************/
/*! no static exports found */function(t,e,o){"use strict";o.r(e);var n=o(/*! -!../../../soft/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../soft/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!../../../soft/HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--6-oneOf-1-2!../../../soft/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../soft/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../soft/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../soft/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../soft/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./post.vue?vue&type=style&index=0&lang=css& */103),i=o.n(n);for(var a in n)"default"!==a&&function(t){o.d(e,t,function(){return n[t]})}(a);e.default=i.a},103:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/workspan/financeForum_app/pages/post.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(t,e,o){},96:
/*!********************************************************************!*\
  !*** D:/workspan/financeForum_app/main.js?{"page":"pages%2Fpost"} ***!
  \********************************************************************/
/*! no static exports found */function(t,e,o){"use strict";(function(t){o(/*! uni-pages */4),o(/*! @dcloudio/uni-stat */5);e(o(/*! vue */2));function e(t){return t&&t.__esModule?t:{default:t}}t(e(o(/*! ./pages/post.vue */97)).default)}).call(this,o(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1).createPage)},97:
/*!***************************************************!*\
  !*** D:/workspan/financeForum_app/pages/post.vue ***!
  \***************************************************/
/*! no static exports found */function(t,e,o){"use strict";o.r(e);var n=o(/*! ./post.vue?vue&type=template&id=473ec66b& */98),i=o(/*! ./post.vue?vue&type=script&lang=js& */100);for(var a in i)"default"!==a&&function(t){o.d(e,t,function(){return i[t]})}(a);o(/*! ./post.vue?vue&type=style&index=0&lang=css& */102);var s=o(/*! ../../../soft/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/runtime/componentNormalizer.js */15),r=Object(s.default)(i.default,n.render,n.staticRenderFns,!1,null,null,null);r.options.__file="workspan/financeForum_app/pages/post.vue",e.default=r.exports},98:
/*!**********************************************************************************!*\
  !*** D:/workspan/financeForum_app/pages/post.vue?vue&type=template&id=473ec66b& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */function(t,e,o){"use strict";o.r(e);var n=o(/*! -!../../../soft/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/templateLoader.js??vue-loader-options!../../../soft/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../soft/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../soft/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../soft/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../soft/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./post.vue?vue&type=template&id=473ec66b& */99);o.d(e,"render",function(){return n.render}),o.d(e,"staticRenderFns",function(){return n.staticRenderFns})},99:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/workspan/financeForum_app/pages/post.vue?vue&type=template&id=473ec66b& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */function(t,e,o){"use strict";o.r(e),o.d(e,"render",function(){return n}),o.d(e,"staticRenderFns",function(){return i});var n=function(){var t=this.$createElement;this._self._c},i=[];n._withStripped=!0}},[[96,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/pages/post.js.map