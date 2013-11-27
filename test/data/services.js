var Service = require('../../src/models/Service');
var mongoose = require('mongoose');
module.exports = {
	array: [{
		"service_code": "5280fbbdf41c7b1a1c000001",
		"service_name": "Moose on the road",
		"description": "There is a moose on the road and could effect safety of road users.", 
		"type": "realtime",
		"keywords": "moose, road, warning",
		"group": "road",
		"__v": 0,
		"metadata": true
	},{
		"service_code": "5280fbbdf41c7b1a1c000001",
		"service_name": "Pothole in the road",
		"description": "There is a pothole in the road and could effect safety of road users.", 
		"type": "realtime",
		"keywords": "pothole, road, warning",
		"group": "road",
		"__v": 0,
		"metadata": true
	}, {
		"service_code": "5280fbbdf41c7b1a1c000003",
		"service_name": "Cans left out 24x7",
		"description": "Garbage or recycling cans that have been left out for more than 24 hours after collection. Violators will be cited.",
		"type": "realtime",
		"keywords": "lorem, ipsum, dolor",
		"group": "sanitation",
		"__v": 0,
		"metadata": true
	}],
	sample_service: {
		"service_code": "5280fbbdf41c7b1a1c000001",
		"service_name": "Cans left out 24x7",
		"description": "Garbage or recycling cans that have been left out for more than 24 hours after collection. Violators will be cited.",
		"type": "realtime",
		"keywords": "lorem, ipsum, dolor",
		"group": "sanitation",
		"__v": 0,
		"metadata": true
	}
};