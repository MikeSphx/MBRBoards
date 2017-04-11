var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

Genre = require(__dirname + '/models/genre.js');

var dbCredentials = require(__dirname + '/resources/my_database.js')

// Connect to Mongoose
mongoose.connect(dbCredentials.mLabUrl);
var db = mongoose.connection;

app.get('/', function(request, response) {
	response.send('Please use /api/books or /api/genres');
});

app.get('/api/genres', function(request, response) {
	Genre.getGenres(function(error, genres) {
		if (error) throw error;
		response.json(genres);
	});
});

app.listen(3000);
console.log('Running on port 3000...')