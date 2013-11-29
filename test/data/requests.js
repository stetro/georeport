var Request = require('../../src/models/Request');
var mongoose = require('mongoose');
module.exports = {
	array: [{
		"service_code": "5280fbbdf41c7b1a1c000001",
		"description": "EMPTY",
		"lat": "61.501069",
		"lng": "23.755145",
		"media_url": "http://city.gov.s3.amazonaws.com/requests/media/638344.jpg ",
		"status":"open",
		"account_id": "123",
		"device_id": "123234235",
		"__v": 0,
		"timestamp": "2013-10-12T13:28:19.993Z"
	}, {
		"service_code": "5280fbbdf41c7b1a1c000001",
		"description": "EMPTY2",
		"lat": "61.499615",
		"lng": "23.759415",
		"media_url": "http://city.gov.s3.amazonaws.com/requests/media/638344.jpg ",
		"status":"open",
		"account_id": "123",
		"device_id": "123234235",
		"__v": 0,
		"timestamp": "2013-11-12T13:28:19.993Z"
	}, {
		"service_code": "5280fbbdf41c7b1a1c000001",
		"description": "EMPTY3",
		"lat": "37.762221815",
		"lng": "-122.4651145",
		"media_url": "http://city.gov.s3.amazonaws.com/requests/media/638344.jpg ",
		"status":"closed",
		"account_id": "123",
		"device_id": "123234235",
		"__v": 0,
		"timestamp": "2013-11-12T13:28:19.993Z"
	}],
	sample_request: {
		"service_code": "5280fbbdf41c7b1a1c000001",
		"description": "EMPTY4",
		"lat": "37.762221815",
		"lng": "-122.4651145",
		"media_url": "http://city.gov.s3.amazonaws.com/requests/media/638344.jpg ",
		"account_id": "123",
		"device_id": "123234235",
		"__v": 0,
		"timestamp": "2013-11-12T13:28:19.993Z"
	}
};