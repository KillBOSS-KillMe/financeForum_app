// const requestUrl = 'http://www.finance.cc/api';
// const imgUrl = 'http://www.finance.cc/uploads/';

const requestUrl = 'http://47.105.95.48/api';
const imgUrl = 'http://47.105.95.48/uploads/';

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
	isArray
}
