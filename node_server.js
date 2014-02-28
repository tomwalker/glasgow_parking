var http = require('http');
var express = require("express");

var app = express();

var body = '';

var options = {
    host: 'dashboard.glasgow.gov.uk',
    port: 80,
    path: '/api/live/parking.php?type=json'
};

http.get(options, function(res) {
    // console.log("Got response: " + res.statusCode);

    // for (x in res)
    // {
    // 	console.log(x + ": " + res[x]);
    // };


    res.on('data', function(chunk) {
	body += chunk;
    });
    
    res.on("end", function() {
	console.log("BODY: " + body);
    });
    
}).on('error', function(e) {
    console.log("Got error: " + e.message);
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/api', function (req, res) {
  res.send(body);
});

app.listen(4242);

// var app = http.createServer(function(req,res){
//     res.setHeader('Content-Type', 'application/json');
//     // res.end(JSON.stringify(body));
//     res.end(body);
// });
// app.listen(4242);
