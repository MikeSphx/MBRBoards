var mongoose = require('mongoose');

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

var mbrUser = module.exports = mongoose.model('mbr_user', mbrUserSchema);

// Get MBR Users
module.exports.getMbrUsers = function(callback, limit) {
	mbrUser.find(callback).limit(limit);
}

// Get Top MBR Users
module.exports.getTopMbrUsers = function(callback, limit) {
	mbrUser.find(callback).sort({"base_ap": -1}).limit(limit);
}

// Get MBR User
module.exports.getMbrUserById = function(id, callback) {
	mbrUser.findOne({'mm_id':id}, callback);
}

module.exports.addMbrUser = function(mbrUser, callback) {
	mbrUser.create(mbrUser, callback);
}