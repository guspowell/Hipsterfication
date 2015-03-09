var express = require('express');
var app = express();
var http = require('http');
var server = require('http').createServer(app);
var trendingIndex = require('./data/trendingIndex.json');

app.set('view engine', 'ejs');
app.use('/stylesheets', express.static(__dirname + '/public/stylesheets'));
app.use('/javascripts', express.static(__dirname + '/public/javascripts'));

app.get('/', function(request,response) {
	response.render('homepage')
})

app.get('/index', function(request,response) {
	response.render('index')
})

app.get('/trendingIndex', function(request, response) {
	response.send(trendingIndex)
})

server.listen(process.env.PORT || 3000, function() {
	console.log('Server listening on port 3000')
});

module.exports = server;
