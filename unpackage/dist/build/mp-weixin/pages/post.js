(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/post"],{"62e2":function(t,e,o){"use strict";(function(t){o("99a1"),o("921b");n(o("66fd"));var e=n(o("9c45"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,o("543d")["createPage"])},6428:function(t,e,o){"use strict";o.r(e);var n=o("dc11"),i=o.n(n);for(var a in n)"default"!==a&&function(t){o.d(e,t,function(){return n[t]})}(a);e["default"]=i.a},"7fbc":function(t,e,o){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},i=[];o.d(e,"a",function(){return n}),o.d(e,"b",function(){return i})},"9c45":function(t,e,o){"use strict";o.r(e);var n=o("7fbc"),i=o("6428");for(var a in i)"default"!==a&&function(t){o.d(e,t,function(){return i[t]})}(a);o("da5c");var c=o("2877"),r=Object(c["a"])(i["default"],n["a"],n["b"],!1,null,null,null);e["default"]=r.exports},d972:function(t,e,o){},da5c:function(t,e,o){"use strict";var n=o("d972"),i=o.n(n);i.a},dc11:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i(o("4e16"));function i(t){return t&&t.__esModule?t:{default:t}}var a=getApp(),c=t.getRecorderManager(),r=t.createInnerAudioContext();r.autoplay=!0;var s={data:function(){return{formNode:{title:"",content:"",board_id:"",topic_id:""},readOnly:!1,formats:{}}},onLoad:function(e){var o=this;console.log(e),this.formNode.board_id=e.id,this.name=e.name,t.loadFontFace({family:"Pacifico",source:'url("https://sungd.github.io/Pacifico.ttf")'}),c.onStop(function(t){console.log("recorder stop"+JSON.stringify(t)),o.voicePath=t.tempFilePath,o.upVoice()})},methods:{submit:function(){this.editorCtx.getContents({success:function(t){console.log("insert divider success"),console.log(t),console.log(t.html)}})},startRecord:function(){console.log("开始录音"),t.showToast({title:"录音中...",duration:99999999,icon:"loading"}),c.start()},endRecord:function(){console.log("录音结束"),t.hideToast(),t.showToast({title:"结束录音",duration:2e3,icon:"success"}),c.stop()},playVoice:function(){console.log("播放录音"),this.voicePath&&(r.src=this.voicePath,r.play())},upVoice:function(){t.uploadFile({url:"".concat(n.default.requestUrl,"/posts/uploads"),filePath:this.voicePath,name:"file",header:{authorization:a.globalData.token},success:function(t){console.log(t)}})},readOnlyChange:function(){this.readOnly=!this.readOnly},onEditorReady:function(){var e=this;t.createSelectorQuery().select("#editor").context(function(t){e.editorCtx=t.context}).exec()},undo:function(){this.editorCtx.undo()},redo:function(){this.editorCtx.redo()},format:function(t){var e=t.target.dataset,o=e.name,n=e.value;o&&this.editorCtx.format(o,n)},onStatusChange:function(t){var e=t.detail;this.formats=e},insertDivider:function(){this.editorCtx.insertDivider({success:function(){}})},clear:function(){this.editorCtx.clear({success:function(t){}})},removeFormat:function(){this.editorCtx.removeFormat()},insertDate:function(){var t=new Date,e="".concat(t.getFullYear(),"/").concat(t.getMonth()+1,"/").concat(t.getDate());this.editorCtx.insertText({text:e})},insertImage:function(){var e=this;t.chooseImage({count:1,success:function(o){t.showToast({title:"图片上传中",icon:"loading"}),Promise.all(o.tempFiles.map(function(e){return new Promise(function(o,i){t.uploadFile({url:"".concat(n.default.requestUrl,"/posts/uploads"),filePath:e.path,name:"file",header:{authorization:a.globalData.token},success:function(t){o({path:JSON.parse(t.data).data})}})})})).then(function(o){t.hideToast(),e.editorCtx.insertImage({src:o[0].path.path,alt:"图像",success:function(){}})}).catch(function(t){return console.log(t)})}})}}};e.default=s}).call(this,o("543d")["default"])}},[["62e2","common/runtime","common/vendor"]]]);