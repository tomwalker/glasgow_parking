var http = require('http');
var express = require("express");

var app = express();

var body = '';

var options = {
    host: 'dashboard.glasgow.gov.uk',
    port: 80,
    path: '/api/live/parking.php?type=json'
};

function pull() {
    http.get(options, function(res) {
    // console.log('started pull');
    var previous = body;
    body = '';
    
    res.on('data', function(chunk) {
	if (chunk != '{"error":"RATE_LIMIT"}'){
	    body += chunk;
	} else {
	    body = previous;
	    // console.log('using cache');
	}
    });
    
    res.on("end", function() {
	// console.log("BODY: " + body);
    });
    
}).on('error', function(e) {
    console.log("Got error: " + e.message);
});
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});


app.get('/api', function (req, res) {
    pull();
    res.send(body);
});

var port = Number(process.env.PORT || 4242);

app.listen(port);