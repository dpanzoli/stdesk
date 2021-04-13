var express = require('express')
const mysql = require('mysql');
var app = express()

const db = mysql.createConnection({
	host: "localhost",
	user: "nom_utilisateur",
	password: "mot_de_passe_utilisateur"
});

app.get('/', function(req, res) {
  res.write(process.env.SCALINGO_MYSQL_URL)
  res.write(process.env.DATABASE_USER)
  res.write(process.env.DATABASE_PWD)
  res.end()
})

var server = app.listen(process.env.PORT || 3000, function() {
  var host = server.address().address
  var port = server.address().port
  console.log('App listening at http://%s:%s', host, port)
})

