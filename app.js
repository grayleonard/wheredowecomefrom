var express = require('express');
var app = express();
var traceroute = require('traceroute');

app.get('/', function(req, res) {
	traceroute.trace(req.connection.remoteAddress, function(err, hops) {
		if(!err) res.send(hops);
	}); //res.send('Hello World');
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
	console.log("Listening on port " + port + " :-)");
});

