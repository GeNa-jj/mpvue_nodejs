const express = require('express')
const http = require('http')
const https = require('https')
const querystring = require('querystring')
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
			response.send(dataStr);
		});
		// response.send(data)
	})
})

// 根据类别查询书籍
app.get('/by-categories', function(request, response) {
	// 将参数进行拼接
	var str = ''
	str = querystring.stringify(request.query)
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
	    response.send(dataStr);
	  });
	  // response.send(data)
	})
})

// 根据id查看书籍章节列表
app.get('/mix-atoc', function (request, response) {
  // 将参数进行拼接
  var str = ''
	str = querystring.stringify(request.query.id)
	console.log(request.query.id)
  // 请求返回数据
  http.get('http://api.zhuishushenqi.com/mix-atoc/' + request.query.id, function (res) {
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
      response.send(dataStr);
    });
    // response.send(data)
  })
})

// 取章节内容
app.get('/chapter/:link', function (request, response) {
  // 请求返回数据
  https.get('https://chapter2.zhuishushenqi.com/chapter/' + encodeURIComponent(request.params.link), function (res) {
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
      response.send(dataStr);
    });
    // response.send(data)
  })
})

// 获取整个榜单
app.get('/ranking/gender', function (request, response) {
  // 请求返回数据
  http.get('http://api.zhuishushenqi.com/ranking/gender', function (res) {
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
      response.send(dataStr);
    });
    // response.send(data)
  })
})

// 获取排行榜列表
app.get('/ranking/:id', function (request, response) {
  // 请求返回数据
  https.get('https://api.zhuishushenqi.com/ranking/' + request.params.id, function (res) {
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
      response.send(dataStr);
    });
    // response.send(data)
  })
})

// 模糊查询
app.get('/fuzzy-search', function (request, response) {
	var str = ''
	str = querystring.stringify(request.query)
  // 请求返回数据
  https.get('https://api.zhuishushenqi.com/book/fuzzy-search?' + str, function (res) {
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
      response.send(dataStr);
    });
    // response.send(data)
  })
})

// 获取图片
app.get('/agent/:cover', function (request, response) {
  // 请求返回数据
  // http.get('http://statics.zhuishushenqi.com/agent/' + encodeURIComponent(request.params.cover), function (res) {
  //   // console.log(res)
  //   var buffers = [];
  //   res.on('data', function (chunk) {
  //     buffers.push(chunk);
  //   });

  //   res.on('end', function (chunk) {
  //     var wholeData = Buffer.concat(buffers);
  //     var dataStr = wholeData.toString('base64');
  //     console.log('content' + wholeData);
  //     data = wholeData;
  //     response.send(dataStr);
  //   });
  // })
  response.send('http://statics.zhuishushenqi.com/agent/' + encodeURIComponent(request.params.cover))
})

module.exports = {
	start(_port){
		app.listen(_port||8080,()=>{
			console.log(`running on http://localhost:${_port || 8080}`)
		});
	}
}