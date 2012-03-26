var express = require('express');

var app = express.createServer();
var io = require('socket.io').listen(app);

var PORT = 8080;

app.listen(PORT, function() {
	console.log("Listening on port " + PORT)
});

app.configure(function() {
	app.set('view options', {
		layout: false
	});
	
	app.use(express.static(__dirname + '/static'));
});

io.configure(function() {
	io.disable('log');
});

app.get('/', function(request, response) {
	response.render('main.jade');
});

require('./io')(io);