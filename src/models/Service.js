var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ServiceSchema = new Schema({
	service_code: {
		type: String,
		required: true
	},
	service_name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	metadata: {
		type: Boolean,
		default: false
	},
	type: {
		type: String,
		required: true
	},
	keywords: {
		type: String,
		required: true
	},
	group: {
		type: String,
		required: true
	},
});

module.exports = mongoose.model('Service', ServiceSchema);