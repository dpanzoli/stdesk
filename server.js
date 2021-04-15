const dotenv = require('dotenv');
dotenv.config();
var express = require('express');
const mysql = require('mysql');
var app = express();

const db = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	port: process.env.DATABASE_PORT,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PWD,
	database: process.env.DATABASE_DBNAME
});

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: 465,
	secure: true, // upgrade later with STARTTLS
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PWD
	}
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

app.get('/notify', function(req, res) {

	transporter.sendMail({
		from: 'Département ST <david.panzoli@univ-jfc.fr>',
		to: 'david.panzoli@univ-jfc.fr',
		subject: 'Message du département ST',
		text: 'Corps du message'
	}, function(error, info){
		if (error) {
			console.log(error);
			res.sendStatus(500);
		} else {
			res.sendStatus(200);
		}
	}); 
});

var server = app.listen(process.env.PORT || 3000, function() {
	var host = server.address().address
	var port = server.address().port
	console.log(`App listening at http://${host}:${port}`)
/*
	transporter.verify(function(error, success) {
		if (error) {
			console.log(error);
		} else {
			console.log("Server is ready to take our messages");
		}
	});
*/
	

});



