const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var db;

dbLink = 'mongodb://mikesphx-admin:pillsNPotionsLiftMeUp@ds161049.mlab.com:61049/mbrboards-demo-db'

MongoClient.connect(dbLink, function(err, database) {
	// start the server
	if (err) return console.log(err);
	db = database;
	app.listen(3000, function() {
		console.log('listening on 3000');
	})
})

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
})

app.get('/test', function(req, res){
	res.sendFile(__dirname + '/test.html');
})

app.post('/quotes', function(req, res) {
	db.collection('quotes').save(req.body, function(err, result) {
		if (err) return console.log(err);

		console.log('saved to database');
		res.redirect('/test')
	})
})
