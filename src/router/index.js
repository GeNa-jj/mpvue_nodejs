const express = require('express')
const http = require('http')
const app = express()

app.get('/', function(request, response){
	response.send('Root Page');
})

app.get('/getUsers', function(request, response){
	var params = {
		username: request.query.username,
		age: request.query.age
	}
	response.send(params);
})
// 小说分类
app.get('/statistics', function(request, response) {
	http.get('http://api.zhuishushenqi.com/cats/lv2/statistics', function(res) {
		// console.log(res)
		var buffers = [];
		res.on('data', function (chunk) {
		  buffers.push(chunk);
		});

		res.on('end', function (chunk) {
			var wholeData = Buffer.concat(buffers);
			var dataStr = wholeData.toString('utf8');
			console.log('content' + wholeData);
			data = wholeData;
			response.send(buffers.toString());
		});
		// response.send(data)
	})
})

// 根据类别查询书籍
app.get('/by-categories', function(request, response) {
	// 将参数进行拼接
	var str = ''
	for (var i in request.query) {
    str += (i + '=' + request.query[i] + '&')
	}
	// var data = request.query
	str = str.slice(0, str.length - 1)
	// 请求返回数据
	http.get('http://api.zhuishushenqi.com/book/by-categories?' + str, function (res) {
	  // console.log(res)
	  var buffers = [];
	  res.on('data', function (chunk) {
	    buffers.push(chunk);
	  });

	  res.on('end', function (chunk) {
	    var wholeData = Buffer.concat(buffers);
	    var dataStr = wholeData.toString('utf8');
	    console.log('content' + wholeData);
			data = wholeData;
	    response.send(buffers);
	  });
	  // response.send(data)
	})
})

module.exports = {
	start(_port){
		app.listen(_port||8080,()=>{
			console.log(`running on http://localhost:${_port || 8080}`)
		});
	}
}