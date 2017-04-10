const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const MongoClient = require('mongodb').MongoClient
const myDB = require(__dirname + '/resources/my_database.js')

var db

MongoClient.connect(myDB.mLabUrl, function (err, database) {
	if (err) return console.log(err)
  		db = database
  	app.listen(3000, function() {
		console.log('listening on 3000')
	})
})

app.use(bodyParser.urlencoded({extended: true}))


app.get('/', function (request, response) {
	response.sendFile(__dirname + '/index.html')
})

app.post('/quotes', function (request, response) {
	db.collection('test-collection').save(request.body, function(error, result) {
		if (error) return console.log(error)

		console.log('Saved to DB!')
		response.redirect('/')
	})
})