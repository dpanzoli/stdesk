var express = require('express')
const mysql = require('mysql');
var app = express()

const db = mysql.createConnection({
	host: "71ebf0d0-597c-4bbe-8bf8-5be0f49429cb.stdesk-4200.mysql.dbs.scalingo.com",
	port: 34974,
	user: "stdesk_4200",
	password: "Mhia_NgdX-rJlSoQzqry",
	database: "stdesk_4200"
});

app.get('/', function(req, res) {

	db.connect(function(err) {
		if (err) throw err;
		console.log("Connecté à la base de données MySQL!");
		db.query("SELECT * FROM Users;", function (err, result) {
			if (err) throw err;
			res.send(result);
		});
	});
});

var server = app.listen(process.env.PORT || 3000, function() {
  var host = server.address().address
  var port = server.address().port
  console.log('App listening at http://%s:%s', host, port)
})

