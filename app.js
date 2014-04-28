var express = require('express');
var app = express();

var traceroute = require('traceroute');

var geoip = require('geoip');

var City = geoip.City;
var city = new City('GeoLiteCity.dat');

app.set("trust proxy", "true");
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {

});

app.get('/getcoords', function(req, res) {
	var pos_array = [];
	console.log(req.ip);
	traceroute.trace(req.ip, function(err, hops) {
		hops.forEach(function(e) {
			if(e != false) {
				console.log(e);
				Object.keys(e).forEach(function(key) {
					console.log(key);
					city.lookup(key, function(err, data) {
						pos_array.push(data);
					});
					var value = e[key];
					console.log(value);
				});
			}
		});
		city.lookup(req.ip, function(err, data) {
			pos_array.push(data);
			res.send(pos_array);
		});
		//if(!err) res.send(pos_array);
	}); //res.send('Hello World');
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Listening on port " + port + " :-)");
});

