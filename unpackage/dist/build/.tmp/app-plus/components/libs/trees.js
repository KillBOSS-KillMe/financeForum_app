(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/libs/trees"],{"026b":function(t,e,r){"use strict";var o=function(t){t.options.wxsCallMethods||(t.options.wxsCallMethods=[])};e["a"]=o},"0773":function(t,e,r){"use strict";var o,n=function(){var t=this,e=t.$createElement;t._self._c},i=[];r.d(e,"b",function(){return n}),r.d(e,"c",function(){return i}),r.d(e,"a",function(){return o})},2298:function(t,e,r){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=function(){return Promise.resolve().then(r.bind(null,"caa4"))},n={components:{trees:o},name:"trees",data:function(){return{controls:{},imgLoad:!1}},props:{nodes:Array,lazyLoad:Boolean,loadVideo:Boolean},mounted:function(){this._top=this.$parent;while("parser"!=this._top.$options.name){if(this._top._top){this._top=this._top._top;break}this._top=this._top.$parent}},beforeDestroy:function(){this._observer&&this._observer.disconnect()},methods:{play:function(t){if(this._top.videoContexts.length>1&&this._top.autopause)for(var e=this._top.videoContexts.length;e--;)this._top.videoContexts[e].id!=t.currentTarget.id&&this._top.videoContexts[e].pause()},imgtap:function(e){var r=e.currentTarget.dataset.attrs;if(!r.ignore){var o=!0;if(this._top.$emit("imgtap",{id:e.currentTarget.id,src:r.src,ignore:function(){return o=!1}}),o){var n=this._top.imgList,i=n[r.i]?parseInt(r.i):(n=[r.src],0);t.previewImage({current:i,urls:n})}}},imglongtap:function(t){var e=t.currentTarget.dataset.attrs;e.ignore||this._top.$emit("imglongtap",{id:t.currentTarget.id,src:e.src})},linkpress:function(e){var r=!0,o=e.currentTarget.dataset.attrs;o.ignore=function(){return r=!1},this._top.$emit("linkpress",o),r&&o.href&&("#"==o.href[0]?this._top.useAnchor&&this._top.navigateTo({id:o.href.substring(1)}):0==o.href.indexOf("http")||0==o.href.indexOf("//")?o.href.includes(".doc")||o.href.includes(".xls")||o.href.includes(".ppt")||o.href.includes(".pdf")?(t.showLoading({title:"文件下载中"}),t.downloadFile({url:o.href,success:function(t){wx.openDocument({filePath:t.tempFilePath})},complete:t.hideLoading})):t.setClipboardData({data:o.href,success:function(){t.showToast({title:"链接已复制"})}}):t.navigateTo({url:o.href}))},error:function(e){var r,o=e.currentTarget;if("video"==o.dataset.from||"audio"==o.dataset.from){var n=this.controls[o.id]?this.controls[o.id].index+1:1;n<o.dataset.source.length&&this.$set(this.controls[o.id],"index",n),"video"==o.dataset.from&&(r=t.createVideoContext(o.id,this))}this._top&&this._top.$emit("error",{source:o.dataset.from,target:o,errMsg:e.detail.errMsg,errCode:e.detail.errCode,context:r})},_loadVideo:function(t){this.$set(this.controls,t.currentTarget.id,{play:!0,index:0})}}};e.default=n}).call(this,r("6e42")["default"])},"5d6e":function(t,e,r){"use strict";var o=r("d5fd"),n=r.n(o);n.a},"9e4c":function(t,e,r){"use strict";r.r(e);var o=r("2298"),n=r.n(o);for(var i in o)"default"!==i&&function(t){r.d(e,t,function(){return o[t]})}(i);e["default"]=n.a},caa4:function(t,e,r){"use strict";r.r(e);var o=r("0773"),n=r("9e4c");for(var i in n)"default"!==i&&function(t){r.d(e,t,function(){return n[t]})}(i);r("5d6e");var s,a=r("f0c5"),c=r("026b"),u=Object(a["a"])(n["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],s);"function"===typeof c["a"]&&Object(c["a"])(u),e["default"]=u.exports},d5fd:function(t,e,r){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/libs/trees-create-component',
    {
        'components/libs/trees-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("caa4"))
        })
    },
    [['components/libs/trees-create-component']]
]);
