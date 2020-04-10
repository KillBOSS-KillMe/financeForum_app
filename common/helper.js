
const requestUrl = 'https://jinrong.beaconway.cn/api';
const imgUrl = 'https://jinrong.beaconway.cn/uploads/';
// 修改图片路径时候同时修改components中的qiyue-category图片路径

// const requestUrl = 'http://192.168.1.168/api';
// const imgUrl = 'http://192.168.1.168/uploads/';

// 时间戳转时间
const transformTime = new Date() || function() {
	if (timestamp) {
		var time = new Date(timestamp);
		var y = time.getFullYear(); //getFullYear方法以四位数字返回年份
		var M = time.getMonth() + 1; // getMonth方法从 Date 对象返回月份 (0 ~ 11)，返回结果需要手动加一
		var d = time.getDate(); // getDate方法从 Date 对象返回一个月中的某一天 (1 ~ 31)
		var h = time.getHours(); // getHours方法返回 Date 对象的小时 (0 ~ 23)
		var m = time.getMinutes(); // getMinutes方法返回 Date 对象的分钟 (0 ~ 59)
		var s = time.getSeconds(); // getSeconds方法返回 Date 对象的秒数 (0 ~ 59)
		return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
	} else {
		return '';
	}
}

// 解析链接中的参数
const getQueryString = function (url, name) {
  console.log("url = " + url)
  console.log("name = " + name)
  var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i')
  var r = url.substr(1).match(reg)
  if (r != null) {
    console.log("r = " + r)
    console.log("r[2] = " + r[2])
    return r[2]
  }
  return null;
}

// 数据对象 null => ''
const null2str = function(res) {
	for (let x in res) {
		if (res[x] === null) { // 如果是null 把直接内容转为 ''
			res[x] = ''
		} else {
			if (Array.isArray(res[x])) { // 是数组遍历数组 递归继续处理
				res[x] = res[x].map(z => {
					return this.null2str(z)
				})
			}
			if (typeof(res[x]) === 'object') { // 是json 递归继续处理
				res[x] = this.null2str(res[x])
			}
		}
	}
	return res
}

// 获取当前时间
const now = Date.now || function() {
	return new Date().getTime();
};

// 获取数据类型
const isArray = Array.isArray || function(obj) {
	return obj instanceof Array;
};

export default {
	requestUrl,
	imgUrl,
	transformTime,
	null2str,
	now,
	isArray,
	getQueryString
}
