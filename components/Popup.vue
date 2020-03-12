<!--
  * Popup 弹框抽屉
  * ============================================================================
  * 版权所有 2020-2024 www.pfuni.cn，并保留所有权利。
  * 网站地址: http://www.pfuni.cn；
  * ----------------------------------------------------------------------------
  * 这不是一个自由软件！您只能在不用于商业目的的前提下对程序代码进行修改和
  * 使用；不允许对程序代码以任何形式任何目的的再发布。
  * 侵权必究，请遵守版权约定！
  * ============================================================================
  *version 1.0.0
  *author : PanFu panfu163@126.com
  *last update date : 2020-01-01 00:00
-->
<template>
	<view>
	    <view v-show="mask" class="popup-mask" :class="{'show':mask}"  @click="hide"></view>	
	   <!--上-->
		<view v-if="position=='top'" class="popup-content-top" :class="{'show-top':visible}">
			<view>{{message}}</view>
			<slot></slot>
		</view>
			<!--中-->	
		<view v-if="position=='middle'" class="popup-content-middle" :class="{'show-middle':visible}">
			<view>{{message}}</view>
			<slot></slot>
		</view>
		<!--下-->	
		<view v-if="position=='bottom'" class="popup-content-bottom" :class="{'show-bottom':visible}">
			<view>{{message}}</view>
			<slot></slot>
		</view>
			<!--左-->	
		<view v-if="position=='left'" class="popup-content-left" :class="{'show-left':visible}">
			<view>{{message}}</view>
			<slot></slot>
		</view>
			<!--右-->	
		<view v-if="position=='right'" class="popup-content-right" :class="{'show-right':visible}">
			<view>{{message}}</view>
			<slot></slot>
		</view>
	</view>
</template>

<script>
export default {
	name:'Popups',
	 props: {
		  position:{
				type: String,
				default:'' //top，middle，bottom，right，left
		  },
		},
		data() {
			return {
			   mask:false,	
			   visible:false,
			   message:'',
			   duration:2000,
			   icon:''
			}
		},
		onLoad(e) {
			console.log(e+"=============")
		},
		created(e) {
	    	console.log(e+"=============")
	    },
		methods: {
	        hide() { //显示头部
			  this.visible=false;
			  this.mask=false
	        },
			show(options){
		     this.message = typeof options === 'string' ? options : options.message;
		     this.duration=options.duration || this.duration;
			 this.icon=options.icon;
			 this.visible=true;
			 this.mask=true;
			}
		},
		 computed: {
			
        }
	}
</script>

<style lang="scss" scoped="scoped">
.popup-mask{
	background: rgba(0, 0, 0, 0.6);
	position:fixed;
	width:100%;
	height:100%;
	left:0;
	top:0;
	bottom:0;
	right:0;
	z-index:999;
	visibility:hide;
	opacity:0;
	&.show{
		visibility: visible;
		opacity: 1;
		}
}		
.popup-content-top{
	position: fixed;
	top:0;
	left:0;
	width:100%;
	height:90%;
	transition: all 0.3s ease;
	z-index:1000;
	background:#fff;
	transform:translateY(-100%);
    &.show-top{ 
	   transform:translateY(0%);
	}	
}	
.popup-content-middle{
	position: fixed;
	top:50%;
	left:50%;
	z-index:1000;
	background:#fff;
	width:90%;
	height:80%;
	display:none;
    &.show-middle{
	  transform:translate(-50%,-50%) ;
	  display: block;
	}
}	 
.popup-content-bottom{
	position:fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height:90%;
	transition: all 0.3s ease;
	transform: translateY(100%);
	z-index:1000;
	background:#fff;		   
    &.show-bottom{ 
	   transform:translateY(0); 
	 } 
}	  
.popup-content-left{
	position:fixed;
	top: 0;
	left: 0;
	width:80%;
	height:100%;
	transition: all 0.3s ease;
	z-index:1000;
	background:#fff;
	transform: translateX(-100%);	   
    &.show-left{ 
	   transform:translateX(0);
	}
}	   
.popup-content-right{
	position:fixed;
	bottom: 0;
	right: 0;
	width:80%;
	height:100%;
	transition: all 0.3s ease;
	transform: translateX(100%);
	z-index:1000;
	background:#fff;			
    &.show-right{
	   transform:translateX(0);
	 }
}
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

