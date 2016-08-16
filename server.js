var express = require('express');
var app = express();
var queryString = require('querystring');
var https = require('https');

var host;
var subKey = '55ce1008e1094a11bf1480a3e648f087';
var dataString = JSON.stringify(data);
var headers = {};

if (method === 'GET') {
    endpoint += '?' + queryString.stringify(data);
} else {
    headers = {
        'Content-Type': 'application/json',
        'Content-Length': dataString.length
    };
}


app.get('/', function(req, res) {
    
})


app.listen(process.env.PORT || 8080, function () {
  console.log('Server has been started');
});