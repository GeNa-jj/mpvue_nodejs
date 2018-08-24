const express = require('express')
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

module.exports = {
	start(_port){

		app.listen(_port||8080,()=>{
			console.log(`running on http://localhost:${_port || 8080}`)
		});
	}
}