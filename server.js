const dotenv = require('dotenv');
dotenv.config();

/**
* Database 
*/
const mysql = require('mysql2');

const pool = mysql.createPool({
	host: process.env.DATABASE_HOST,
	port: process.env.DATABASE_PORT,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PWD,
	database: process.env.DATABASE_DBNAME,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
});

// Developpement local : accès au serveur SGBD grâce à un tunnel sécurisé
// scalingo --app stdesk db-tunnel SCALINGO_MYSQL_URL

/**
* Emailing
*/ 
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: 465,
	secure: true,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PWD
	}
});

/**
* Routes
*/
var express = require('express');
var app = express();

app.get('/', function(req, res) {

	if (req.query.idUser) {
		pool.execute('select * from Users where id = ?', 
		[req.query.idUser],
		function(err, results, fields) {
			if (err) { 
				console.log(err); res.sendStatus(500);
			} else {
				res.json(results);
			}
		});
	} else  {
		pool.execute('select * from Users', 
		function(err, results, fields) {
			res.json(results);
		});
	}
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



