const dotenv = require('dotenv');
dotenv.config();
var express = require('express')
const mysql = require('mysql');
var app = express()

const db = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	port: process.env.DATABASE_PORT,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PWD,
	database: process.env.DATABASE_DBNAME
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
  console.log(`App listening at http://${host}:${port}`)
})

