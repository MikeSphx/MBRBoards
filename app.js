var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());

//Genre = require(__dirname + '/models/genre.js');
//Book = require(__dirname + '/models/book.js');
mbrUser = require(__dirname + '/models/mbr_user.js');

var dbCredentials = require(__dirname + '/resources/my_database.js')

// Connect to Mongoose
mongoose.connect(dbCredentials.mLabUrl);
var db = mongoose.connection;

var path = require('path');

app.get('/', function (req, res) {
	console.log('hello');
	res.redirect('/home');
})

app.use('/', express.static(path.join(__dirname, 'public')));



//app.get('/', function(request, response) {
	//response.sendFile(path.join(__dirname, '/public/index.html'));
	//response.send('Please use /api/books or /api/genres');
//});
//app.use(express.static(__dirname + 'public'));

/*
app.get('/', function(request, response) {
	response.send('Please use /api/books or /api/genres');
});
*/

//app.use('/', routes);

// app.get('/api/genres', function(request, response) {
// 	Genre.getGenres(function(error, genres) {
// 		if (error) throw error;
// 		response.json(genres);
// 	});
// });

// app.get('/api/books', function(request, response) {
// 	Book.getBooks(function(error, books) {
// 		if (error) throw error;
// 		response.json(books);
// 	});
// });

app.get('/api/mbr_users', function(request, response) {
	mbrUser.getMbrUsers(function(error, mbr_users) {
		if (error) throw error;
		response.json(mbr_users);
	});
});

// Get a user by MM id
app.get('/api/mbr_users/id', function(request, response) {
	var id = parseInt(request.query.id);
	mbrUser.getMbrUserById(id, function(error, mbr_users) {
		if (error) throw error;
		response.json(mbr_users);
	});
});

app.get('/api/mbr_users/alphabetical', function(request, response) {
	var limit = parseInt(request.query.limit);
	var page = parseInt(request.query.page);
	mbrUser.getAlphabeticalMbrUsers(page, limit, function(error, mbr_users) {
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

// app.get('/api/mbr_users/:_id', function(request, response) {
// 	mbrUser.getMbrUserById(request.params._id, function(error, mbr_user) {
// 		if (error) throw error;
// 		response.json(mbr_user);
// 	});
// });

app.get('/api/mbr_users/leaderboard', function(request, response) {
	var search = request.query.search;
	var sort = (typeof request.query.sort == 'undefined') ? 'base_ap' : request.query.sort;
	var page = (typeof request.query.page == 'undefined' || request.query.page < 1) ? 1 : request.query.page;
	
	if (typeof search != 'undefined') {
		console.log('search query');
		// mbrUser.getMbrLeaderboardSearchPage(search, sort, page, function(error, mbrUsers) {
		// 	if (error) throw error;
		// 	response.json(mbrUsers);
		// });
	} else {
		mbrUser.getMbrLeaderboardPage(sort, page, function(error, mbrUsers) {
			if (error) throw error;
			response.json(mbrUsers);
		});
	}
});

app.get('/api/mbr_users/by_name', function(request, response) {
	var name = request.query.name;
		mbrUser.getMbrUserByName(name, function(error, mbr_users) {
		if (error) throw error;
		response.json(mbr_users);
	});
});

app.get('*', function(req, res) {
	res.sendFile("public/index.html", {root: '.'});
});

app.listen(3000);
console.log('Running on port 3000...')