var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());

Genre = require(__dirname + '/models/genre.js');
Book = require(__dirname + '/models/book.js');
mbrUser = require(__dirname + '/models/mbr_user.js');

var dbCredentials = require(__dirname + '/resources/my_database.js')

// Connect to Mongoose
mongoose.connect(dbCredentials.mLabUrl);
var db = mongoose.connection;

var path = require('path');
app.use('/', express.static(path.join(__dirname, 'public')));

/*
app.get('/', function(request, response) {
	response.send('Please use /api/books or /api/genres');
});
*/

app.get('/api/genres', function(request, response) {
	Genre.getGenres(function(error, genres) {
		if (error) throw error;
		response.json(genres);
	});
});

app.get('/api/books', function(request, response) {
	Book.getBooks(function(error, books) {
		if (error) throw error;
		response.json(books);
	});
});

app.get('/api/mbr_users', function(request, response) {
	mbrUser.getMbrUsers(function(error, mbr_users) {
		if (error) throw error;
		response.json(mbr_users);
	});
});

app.post('/api/mbr_users', function(request, response) {
	var newMbrUser = request.body;
	mbrUser.addMbrUser(newMbrUser, function(error, newMbrUser) {
		if (error) throw error;
		response.json(newMbrUser);
	});
});

app.get('/api/mbr_users/top', function(request, response) {
	mbrUser.getTopMbrUsers(function(error, mbr_users) {
		if (error) throw error;
		response.json(mbr_users);
	});
});

app.get('/api/mbr_users/:_id', function(request, response) {
	mbrUser.getMbrUserById(request.params._id, function(error, mbr_user) {
		if (error) throw error;
		response.json(mbr_user);
	});
});

app.listen(3000);
console.log('Running on port 3000...')