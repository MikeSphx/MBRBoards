var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

// MBR User Schema
var mbrUserSchema = mongoose.Schema({
	mm_id:{
		type: Number,
		required: true
	},
	name:{
		type: String,
		required: true
	},
	faction:{
		type: String
	},
	ap:{
		type: Number
	},
	base_ap:{
		type: Number
	},
	meso:{
		type: Number
	},
	pic_link:{
		type: String
	},
	ss_link:{
		type: String
	},
	profile_link:{
		type: String
	},
	record: {
		wins: {
			type: Number
		},
		losses: {
			type: Number
		},
		ties: {
			type: Number
		}
	},
	medals:{
		rivalry:{
			type: Number
		},
		quest:{
			type: Number
		},
		faction:{
			type: Number
		},
		patriotic:{
			type: Number
		},
		social:{
			type: Number
		},
		elite:{
			type: Number
		}
	},
	stats:{
		spl:{
			type: Number
		},
		atk:{
			type: Number
		},
		def:{
			type: Number
		},
		luk:{
			type: Number
		},
		wis:{
			type: Number
		},
		stm:{
			type: Number
		}
	}
});
mbrUserSchema.plugin(mongoosePaginate);

var mbrUser = module.exports = mongoose.model('mbr-user', mbrUserSchema);

// Get MBR Users
module.exports.getMbrUsers = function(callback, limit) {
	mbrUser.find(callback).limit(limit);
}

// Get Top MBR Users
module.exports.getTopMbrUsers = function(callback, limit) {
	mbrUser.find(callback).sort({"base_ap": -1}).limit(3);
}

// Get paginated/sorted MBR Users
module.exports.getMbrLeaderboardPage = function(sortInput, pageInput, callback) {
	// TODO Move logic out of here and into app.js
	var query = {};
	var sortJson = {};
	if (sortInput == 'win') {
		sortJson = {'record.win': -1};
	} else if (sortInput == 'meso') {
		sortJson = {'meso': -1};
	} else {
		sortJson = {'base_ap': -1};
	}
	var options = {
		sort: sortJson,
		page: pageInput,
		limit: 10
	}
	mbrUser.paginate({}, options, callback);
}

// Get search results MBR Users
module.exports.getMbrLeaderboardSearchPage = function(query, sort, page, callback) {

}

// Get MBR User
module.exports.getMbrUserById = function(id, callback) {
	mbrUser.findOne({'mm_id':id}, callback);
}

module.exports.addMbrUser = function(mbrUser, callback) {
	mbrUser.create(mbrUser, callback);
}