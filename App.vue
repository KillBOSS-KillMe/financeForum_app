// customData = {} // 自定义数据 // customFunction () {} // 自定义方法 // onLoad () {} // 在Page和Component共用的生命周期函数 // onShow () {} // 只在Page中存在的页面生命周期函数 //
config = {}; // 只在Page实例中存在的配置数据，对应于原生的page.json文件 // data = {}; // 页面所需数据均需在这里声明，可用于模板数据绑定 // components = {}; //
声明页面中所引用的组件，或声明组件中所引用的子组件 // mixins = []; // 声明页面所引用的Mixin实例 // computed = {}; // 声明计算属性（详见后文介绍） // watch = {}; //
声明数据watcher（详见后文介绍） // methods = {}; // 声明页面wxml中标签的事件处理函数。注意，此处只用于声明页面wxml中标签的bind、catch事件，自定义方法需以自定义方法的方式声明 //
普通自定义方法在methods对象外声明，与methods平级 // events = {}; // 声明组件之间的事件处理函数 //props {传值} 在WePY中属于 父子组件之间 传值的一种机制 // 页面跳转，传参写法 //
this.$redirect('./page2', {a: 1, b: 2}) // this.$redirect({ // url: './pages?a=1&b=2' // }); // this.$navigate(url) // 阴影边框 // box-shadow: #f1fefb 1rpx 1rpx 10rpx 5rpx; //
flexflexflexflexflexflexflexflex // display: flex; // align-items: center; // justify-content: space-between; // 竖向 // display: flex; // align-items: center; // justify-content:
space-between; // flex-direction: column; // 换行 // display: flex; // align-items: center; // justify-content: space-between; // flex-direction: row; // flex-wrap: wrap;
//换行隐藏 //overflow : hidden; //text-overflow: ellipsis; //display: -webkit-box; //-webkit-line-clamp: 2; //-webkit-box-orient: vertical; // 居右 // flex-direction:row; //
justify-content:flex-end // vertical-align:middle; // 自动换行 // word-break:break-all; // 单行文本溢出 // overflow:hidden; // text-overflow:ellipsis; // white-space:nowrap; //
多行文本溢出
<!-- -webkit-line-clamp: 2;
display: -webkit-box;
-webkit-box-orient: vertical;
overflow: hidden;
text-overflow: ellipsis; -->
<script>
import helper from './common/helper.js';
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	globalData: {
		token: ''
	},
	onLoad() {
		// this.getToken()
	},
	methods: {
		// 获取Token
		getToken() {
			uni.login({
				success: res => {
					if (res.code) {
						console.log(res.code);
						uni.request({
							url: `${helper.requestUrl}/refresh`,
							method: 'POST',
							header: {
								authorization: this.$options.globalData.token
							},
							// data: {
							// 	code: res.code
							// },
							success: data => {
								data = helper.null2str(data);
								console.log(data)
								if (data.statusCode == '200') {
									let token = `${data.data.token}`;
									this.$options.globalData.token = token;
									console.log(this.$options.globalData.token)
								}
							}
						});
					}
				}
			});
		}
	}
};
</script>

<style>
.line {
	width: 750rpx;
	height: 6rpx;
	background: #2390dc;
}

text {
	display: block;
}
.null {
	text-align: center;
	font-size: 24rpx;
	color: #999999;
}
uni-tabbar .uni-tabbar__icon {
	width: 43rpx !important;
	height: 43rpx !important;
}
.nullList {
	width: 750rpx;
	height: 300rpx;
	font-size: 50rpx;
	font-weight: 600;
	color: #eee;
	display: flex;
	align-items: center;
	justify-content: center;
}
@font-face {
	font-family: 'iconfont';
	src: url('//at.alicdn.com/t/font_1566333_oixhqyb0r7j.eot?t=1577688373377'); /* IE9 */
	src: url('//at.alicdn.com/t/font_1566333_oixhqyb0r7j.eot?t=1577688373377#iefix') format('embedded-opentype'),
		/* IE6-IE8 */
			url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAABewAAsAAAAAKGQAABdhAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCGJAq+HLABATYCJANcCzAABCAFhG0HglMbUiAF3BiuYeMA8NroFdn/1YHtPA0FCRIKDIwA2DVEOEH2zKcwH595/7IgdHnSQ+iEbsAEC4bC3mZo64qKLuu+iEnFwbwfSgnPo91/J7mZedRfgCitGkC17v3KFbMAZoC22R13HF3OoRjR0EZiI7Ixt7YAM/9fF6WrYGOlM3oRwfblsvgfi/rvAPAf5nVv4Od2UChSy0J3CPnm/536XtkOHMmxC7qSoWVDiUAQKCT8KHkE6c6RNpY21pUMCdscfA2XICUQDBC/tjm1rkWfmz3qmuhRn0/65ySyrSSV6qGu+Z8zbTvCdmPXDFGYvUk39/8v5Sf/4Lc9yBGn5dwoHSAJM3tzc0mPkmFyxJ26zpGaHMsZPy8nDKmBTRtl8nYHYDLVh/1mPmORLDmHUUww82/XNRQQpDhVUW3bd+0LFgPhFPaaOmnCKLA2PybErvBnuz7PNKI24eDXq/U1YCP99OoNtZUfNI5AutVzfLuxSKx60UVaPYGhspQ18gRg8wIQoCpgQPsW/0ZMXJXyQT+54QYAZSmppstYZR0bs2nLsw5WaD1sjBXbNDvYjrAT7F576EUXz4PDaqYmrdE7TTk1IijK3qzlp1a2Vt2xZjohgkucIAYfmhBh/MRIkySLQ4AEiihCSvmFlwHlgj3DAKqsFs6BBR8bEAELb4ALFk2JnwgFlCAIHRx8hAGKD4QJigbhgRICcQAlDCIExQ/iAQ65JBoc8UkMONIgYlCyICmgOCCpoARA0kBJgBSAokBmgxIFWQiKgFjAkW9yAIgFXiQjn0ytPBuoDiyBYBkID4fMOkpI0DijFmmhIBq5YQXe3/eQDZutYnXTsl3RlSFzu6BW4zrOOvuPyWRBZAkQgB1lOpZVvykLpd2bUxwnFrWJWFjNjULL0U4sYp9YmkRlGae2XM6ybf4n02+yIVekMLnkXddUJXI3625E2qlr0PBLe6NkhlLmPoCXcr4cZhcXx/MEASzr+FNrVswfJ9L3F/YyOkMML4wCocMDX8EWTyQgGOnrCbRsSAxVG0YwaRDDD/0YIdPxbkpABCZr8XaRUkkM+bU4Zmrg+HLL8sVSOOjUmUeZDk7pATahlyDsH1e/tDDT5HSdMQxWto7XITkvUliT225ZPPR9JtYs5qQM6RAU3CWpWIEtufX5Wvfoy9nVUq4fk5ez0KZkiIOJ13Gs7cU659CzGQBXMkKWmCrWdK5J1OgShABwNhu/YvVfMuavOes3/B+0QkC87rMSVa+KmgzrkKA4JVWkGzQZCWSt0uzSGQetgE5jrzud9xepudAbhI1j3nalrorXwm7MNRQoqMD+2oQkzWuQRWnMXuJoxFKL1CehxCMyg0sUp7bVSZW/y9xX58vULrGblk1a82MxKtYeR5WQF6LHwfRTOh2W44utHiniSa6/hJz1Cp1CB4hkcPy2PicahdEWklHmIYJX27C6ErV2sY2qNnNiO81JJKkELkvbUhSl4gxqBbUoKi1CK6zQ7xVaSFamaY1+KqcmIVfRmKsqWKtQ12l70SzpS6rjoq+m1yDCXE20V9Rb2WfibVW5vCriOTlDOn9u+PnMlmdrRl7Man/53l1zXre1/44xt0N/28WvR/brEaEYtTMYJjZib7yLS0o2GfKelKRyarGSVkg6I0ShoDWHaXHMNPEuswz0AQ4UwptbHy61qoWAgpwB3o4ErxFGzOG4n4tjKM1YyDQpilR0JmATjJ3PDxpy3sPTtywMl6hvn7TWpy/RaDw4bOxlGE6VXQlZXttJeZUqx1O5rqUGBJJkKyg1hsVtKbxChCTLeEqlFCw0jLxUIV2z3RWM0tS+8tIX7FBwYyfcshyvwlMTvtjFcCOrjHsRTVg8HcBrCGNGIYHgRu2HMiOStKYRlSZFELRcX6OEY/VSiFm8HJN7gwab1AmA4FFIsmXNBRSFjIy9jid6PADBaJaQ6XQ/bzIVy7mkyx4guCmRrqc0xa421ufExQ35KzMLWy5/6GReff0TvoStrSgt31DW8PEUKYcVifnRkiILCoVMk7vIVdelULFd1er8rKHrpU415yNKinwX45SO8GseC5cBIcNJlCp2aTU5GyUZhVQpTvWGZ51IplnK5cMlySteWyQzbCsdYj77ybscEMO5jBrcKV0d0UFgKxAyw5vGr32Bs768jYefqofO841np8wNWHOZRcAhKO9gOCBsRAPOvIs3TehLGLxrY4eBpxpPLGh70aSlYZXrYyFBTlFT8p2lvZqjSix83WmQLffXwNuujsW7Ha/iY5c0kuvDCmpOVrqrT1c5Ii2ZoXJcUgREELImqoxTYRNKcEWMgwyLd9p1va7nqttKdP0cIJhmmdNuEP+79R1NrKtVWodnmwaxedjYmI6FWWNmr61FX+JYkNHXjNlGzE2ORTlzVp+t3Vr+s1ict9ZfstjU3UBiYEHmnifS6Y10eKP3F2YHg8nJcPJOOH1xcf6hP97li3f7Yg8W5T4NpW7XSE2WRkJJYtTaPCoud3a/29rMZXqLVGr4veSdIIIp83x6kj5AGgoklAHUCyUq9emi3ANfrNsf6/LHHy7OXwyn7/BQpVIToWSQk4NoOHgQoiRciyBMRu/PzLkIepf2DgotC5Z4lAjpaekhSWVsTSCRUDXJDWO3pclNmyg1RYVGJijLbN+seSrlW9bXh4l+TUOkAoRW71IvikJva292fG0wmYRw4/iwPBreHNbSdHj0Ur5/Nh2P0/7l/TOj3LfKp8YoX1ufHNtIaJ1GaFMqRVEpKaAkAgcCW29oLNMyg4xESHKJotLLZ2k12t/eT9PapfXrtbcuvTmdptMsgbJeiBAkHhim1wGABA8ZAUCA3qgQyQRIZUKDakcimYQUolI4LpGBRCqV81GxGQ4gTeViot+vDc0kX0yM58O0JhuqNJ6nVckgTPYgGU2n04wS8QhyiRMjgteLEkFyqRCNghGRQxiNJuVwWIuOMlMpp+N+OWhL0+npG6YGE0FyK8VYKmRDqVNVLTIlE9lCWVGRKmWk4KrI4hJhXBhJR0pE+CQQMriUohCx2ElEqhGPZpfQ1FKGT3ojGTzlQ4TsaalNNX5JnBjbj7xKhuS1yXmMe+1E/Sos+y3KRKmIFvlFXeQYyyqtYWrx9600gkWI1JmQolKrKswQryG4MkibnoMbQg7PmqIGaZTJYY7VXOsp0ACAwSKZXl1OGOwndExVyBVhmOun+smTILuXHDLntVk1SWNGh97cAoe97JGSSrV/fZINkSRSNUoi5NeOFR7urRYGlg6yMR4KazUIxgpbq/t9lYcKSqU1KWSDSd4Ip/MQGSFFVHHJk7B1OPIiLlPbfJSaSKcnq5AXFcsXo8aN5AgJaCu8yj8Jau1+Oo6JMhA6WsieJFBDcXQGTTB4giEBuw4OLxapWKUCsx2wHzxG3Q1REqfoM2G0FWp0niCSLMSoFyOaq2rBTklitXzFiwQyclm66lNFOn6NteHAovNRk4R8za+JlEplOY5UwcSYRxFgdFy+tPuNxiba+fM8/En5buq/hbqn/WxAvOjEom0DP5/2lel76OZtDnkdz4f+nicrNy5rcx4o2bOy/DNvnf9fSPCPx1j3bNj6nfszC4qm93xu3aMP1vv/+Pm2fcWHPRd6j07jQQrZ6y1ufXGJaXu/cJV94gdvz90wfc6qHZ0VFS7PhTKXXrfvE/eFn3dsI2zvb2/au6bsq3uPeL5MDszxnvDNcfJ3QVzlQfv/1zf62in7wJ9/fxEecswS+4B90PAQdOSLK153gKhvtTcKtoxEbPcn7ciuWFEEpTGbYkemNRQA69+h3Wtmr3GF8cfEcvxHeNi9Z9a2+WJWWC6wxT886N49ZdwJVuXqK1NWWxAnhJm6XGZBESekBa5oQeanq2etcY/yGNttLMB/+M19HY/wBRYQ2k/ecRQUOJq9E4Di245CBny/26u/55g9p+B7AoADXJgzx/HGc1gLxh/x+lyufvqPpsM/jDMDH0xzfFAg8lb1T98DwHsXfF4c37Wr4zHIAVqwp0BqeH9jaZgNb/315Ddpq6d+c3LDJDjWTGTpc/3OTUrVBqTUb0SbiYHyboAg+CborR8c5HqA1/mdN7fJs63VA0sBtaWUCpOVIlRVTDXKWUWGFejXc/1aW5Wkh8gDevaMmOUHKa3EHqPYtnYOGH1XqiCoOqYKClZaKtL+AoAmRTHHuMAejU6BRpf5lyIKWDMLUHDGmYsiIeBIhPAh5wNh0xEAmhrlYuHw2Gcp4IoytAINwCh3jLkgEgUczf7DGMAkbqq5LAXzcgGpwJRLQQlLlvw3vAmP3zS8E8pAyGa6b5L7akxDQ1xDs6vfON9UcMECEDZl+VNBppGCyDGNtsKgyEKwoQF0ttAB4NdEkA3TKEd4wIOYgUof349E7z/K3y9e7L64dF7du1ixEvL53hRguAb5B8WK37c+uh+N3Kdcb62ZP3+g0qiBTzafJYN0vjZ6aIIG+KLBLzSKJc3pWh1zt65as2prGKt9ykkMGNxVo1KtRRoYWeacanXaCHhfnc7dft0q1VJ9HNJtmWiaqsWRRNFERMnuW7d2C4CA7GaykZj71u2ENkaQgxqRDWQaebWp6BGrOpg+Dzju+Ocf0+zxgHAy+m5muH942PBbyQ8NYF1ykN/WTJqMl1+4IB9wlNoapWEdzzkPZc6rs/Ah5/m9nzQCZdh7thkRGHAUE39dIiiz3Z6YuG0rM/1ft244flyj+YENUAvbWl88r9UVuZHwOG3+IWJAn+eR9Xth4SNL78wZZR1abyFC/V59MNGyfmoH+/eiUk8s3O/V79nPIi04HPe+7o+CvNof84RowqIN6P3oRXi08FSuG5VwnXmdcBT/gPkADzwzwGvKF5VZ7p0lc/J6EiTQFWfdVKQTYj1KKiMdvYXsXLu2HeGXnuzvxeDXw+f7HMrZPxo/4vQ75+MIJZjpRWbCO64LeFihlzf6xz0dWdJiukZB1eHS/Lbq/IeeRRp5+8OwTFH1kLmWd9tJEgKuX5JehJhOIeUIRv4nSwJsvDjlWHT2HyM8EFeKZSn+YPpMN7llOBA4VWWdrE2ttU7M3UcoIewF/vz36+6/tgDbQEAcar98Jk3MO/z46mPWPVrM/82MFIhAAHWPdz7ctPm34lP6U7P9hlC24/CKxomDTBc39qAExg+ZHDrwCttxZxzfShPQyHwycknzI4tuEeiba4XwVzpJ7hVyvQcPiD9087q7d27kO/HqVmzbZLVuWmHuEjjxN66ydPOEwOI+ChqJCFAW0bAU4JSVRqmjWU8BFD+tlUIC+JTE6t734TnzHCi0EUCM0ChPdTqZ+NJyYiltsmPsv+46hXRhigsjdGyQYkyXlNlf7eioyned27O2j7J5PvGfjCSeS9EN9nAfAY3v21lu/cGjCZufD2o3TnQdwwWZKkiU4cXDFNIeIkCchH6UTtCRg2cEk3WUYMcgCvB/YCBBVd+UsLLpHQ8koIwbNhibRYUS8SiiAWtqwAJQYwENaAHOFqABBPcUdrPK7QjbYejXnFzyRVGcY9YB/dVeHkCaJrzj2AnTxHfsd4Ti+p32N1ev9gmYaAIbtx+sJzVij6zg1pWWGtjL94e92ApZrVCzWwPgM5loX32u2u10bXPzNZperwJaQoqKQlqAm72VlV08Gq9r1g7OPtbKPWo1BswR59Fcb3VTLv3uCZr2Neyj5gtKD35N056waelNarW32awOW6il22YK+I78E3dzWf3I9fa2mr1rtDIoIGRv9SgeP1a9NyQAkmlrvvL6Wcamjt6UV3YqImtrZC4nqenSFSsG6dpp5qiY03Tt4KYLEbrx9draXstrGendPLP3wp6FjFpJAtO+PzP97Pf/zQ+xNwi7i2WQMGSyeozPH62eDBFCsuIa79vLqO0mTmViV/FcF1b1M3IBxtQR9rRvrWnOFdpbrvGcp4dRI6L72Wc2dbirfUor+HbagzaOQjS/p8i0J4hO8bUDf35dwrp9IcH8gPaAYzzn5a5fSadwqVJoTjYkprDu/tu0zz07VlnF26THZIuqd/9ygf7O88T/0wkVLmcmw1v7eFWeQYs8TA30f73u/LvGFJEVp6zE3QevpX/7bVdH/h7Pa2cDFrgt+PFtAabb9WJkW99ng1hZGzVLE2Jh0fa6Z/rkd/LtVHu755ZdpszdF4RJ/z6rbrwOjsPtJZENClAxPdHLFSejkgVKgZCAwiApofyN6ohOy0UFoGgqcOuFux3m7kIRYMTwJXhRXYxBGWuoIdPjcyPUG/mhyRgEQpAolWCjOrLDckm+k/egxwMsO7PMkKg349aaNXOHT9B6bhm0Sdv6/5w4/+13Ezc4HUFQmJl8H2e2aQa3c/zN0e2F4cZb4Rz5OT0GhXlv/kTPut8yFiRtP/LX+QoM6RDhCRwxkLoGiVt0/q+rSwqbb7rbnqKIpj+Y18g52iEoLAzSEwvr/YgTWq52gjf+MjyewPXjMDYzyTrtJYpwE4qQ0MH1RXW7ydJVIafFYL6xYhhuT5IY3SjSEnKSCyRiuDNEGhtIFj0WDn5HoARTCPFLKCKIkQnkYEdRHO7toDBXV+AVyLjra2qY8oyZY1XBVuj950c5js3Gq/NE0jRKDpqqkWc4wzXMADbdPnZ6RkyKR1wKJRtNTglWqZyFUpRHVCI5A03Jik6myepDCqZCtM6SXAmdnvLlyBYwg/KAfDSgDdHS4Xo4lBGcpzmNmzOG/ro9cElALpCLAKluqW+d1OA5n0wgEw3k+GZfvuQTtPTtnWWFAeOj512z9CtxyW+IRGxys/7qyM+jFl3Asjdv62UT/zQcO3U6jYiLIhUdGyJtOxgc8L24dOLpU8cO28ES8vFVbI6AJojrp6Cz64UcwlnNHnA8QRk+dG+F0htmUGukp497zfY6ra4BREYQKvJfOTX9wJJDhZZDTrMCJ0b+aGmeSvZtwSc5UlOLeqh38iClEcr6ToDS9PseqZPI8CMo7wgVp7BVOUMnQEjIjMGjq1r+MFv0gU7wMohm+3dLhfgGtFqCN4Ba/541SByh4UsvaxnOn21s1wWABttOobvr+BusotgnokfnrvLwgs0S3Jw6pfGYBnUnBA4NgxESiHFoW+Ln6FfcGmHQ+Av9NYaFMdZMD2e4rInlOqwpiJsZx0vUS90cz5XGCcUl52LGCsXO4sKx+60pCX6O/vEpQbp83xl++ToWafEuAd4+OSNDKNMqH8UQXGWQacelRskiZruck9GMTW5KQ8ZikKHMXZkjbrmnRLglQtMyWny0oq8SJmOpnJW5CdUCyxpItWzT/9Oo2CkjPfAi8Ivs/C0wj2SXtGL+lS7xM6/1HUlHeuWKTP4h1xJ9YjPGjIjFfMsI/9vV3fG/VI9CecXzTVw6VX40pETBzzbBxHooMM3PHgRy5uh6WGNna/upA8q8iGb+zpSW58xyqosaCN6ugp9t5Uke5Ccrw+365ZiVYSs1PoqtFPyUtZrJVVc6hKi70sVPi5VBqtDh+SFSzAZCmQBQmeXKSkWcEys1US5j8Zt8HRtMvr/SIcs71mW2kpVB+iuGwRDl1WE4kgfQCQqVPRXmTCbz0+hv7y+wUuugevS2/iBEZFLL2eIa/QSCIEMn3uwqJaNM4Is6KxpQ16yugUvI08wRuZ7mc7PTneV8aYzkAXR6rV2o7Lk95kzm/mnk+vhfYKXWIeS4p+3/IER8dLWcLTisnzxxHTcv8nizq6QKRj3EwBcz66wJUN9CrK7+zZWQp5mLIV5Pc/V8hpefpZ91GQ486HwnJBmhhwUDhIgQI0GKDDkKlCAwBAqDo0KNJlpoo4NuI3lpuif1IksU7rbVmOz1JCwXzUky1Lxayg8pOpZMk3056UUHTyIODNADnRqTJ5N1YkVTjcNlLjossZZBAHo5INt3gs+AqvFLY2SxAiP9RCL/L+GBv7Dkh4CSTLORMIian/j0hNFVImmN6GSc0B0BT+y0lED8+k54P7tsIN2VY26aCjxvZQvNuZOpVJOXqT6zIxSa7GjvawAAAA==')
			format('woff2'),
		url('//at.alicdn.com/t/font_1566333_oixhqyb0r7j.woff?t=1577688373377') format('woff'), url('//at.alicdn.com/t/font_1566333_oixhqyb0r7j.ttf?t=1577688373377') format('truetype'),
		/* chrome, firefox, opera, Safari, Android, iOS 4.2+ */ url('//at.alicdn.com/t/font_1566333_oixhqyb0r7j.svg?t=1577688373377#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
	font-family: 'iconfont' !important;
	font-size: 16px;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.iconzanzan:before {
	content: '\e65a';
}

.iconsousuo:before {
	content: '\e614';
}

.iconicon7:before {
	content: '\e667';
}

.iconbuoumaotubiao20:before {
	content: '\e612';
}

.iconxinshoubangzhu:before {
	content: '\e64c';
}

.iconshezhi:before {
	content: '\e604';
}

.iconfenxiang:before {
	content: '\e613';
}

.iconyonghuguanli:before {
	content: '\e620';
}

.iconlishijilu:before {
	content: '\e64d';
}

.iconrenzheng:before {
	content: '\e60f';
}

.iconhuiyuan:before {
	content: '\e619';
}

.iconzaixiankefu:before {
	content: '\e61c';
}

.iconico_zuo:before {
	content: '\e601';
}

.iconhuiyuan1:before {
	content: '\e65f';
}

.iconhongbaoguanli:before {
	content: '\e628';
}

.iconsaoyisao:before {
	content: '\e605';
}

.iconhuiyuan2:before {
	content: '\e64e';
}

.iconrenshu:before {
	content: '\e63c';
}

.icontihuoguanli:before {
	content: '\e6a4';
}

.icontihuoguanli1:before {
	content: '\e6a9';
}

.iconshujuhuizong:before {
	content: '\e63b';
}

.iconchangyongtubiao-xianxingdaochu-zhuanqu-:before {
	content: '\e74b';
}

.iconshengdanhuahuan:before {
	content: '\e63f';
}
</style>
