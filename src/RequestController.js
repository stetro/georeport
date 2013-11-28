var mongoose = require('mongoose');
var Request = require('../src/models/Request');
var Service = require('../src/models/Service');

/*
GET		/requests 		index
POST	/requests 		create
GET		/requests/:id 	show
PUT		/requests/:id 	update
DELETE 	/requests/:id 	destroy
*/

var iso8601Regex = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;

module.exports = function(server, options) {

	server.get(options.accesspoint + 'requests', function(req, res) {
		var query = {};
		if (req.query.start_date !== undefined && req.query.start_date.match(iso8601Regex)) {
			if (req.query.end_date !== undefined && req.query.end_date.match(iso8601Regex)) {
				query.timestamp = {
					"$gte": req.query.start_date,
					"$lt": req.query.end_date
				};

			} else {
				query.timestamp = {
					"$gte": req.query.start_date
				};
			}

		}
		if (req.query.start_lat !== undefined && req.query.start_lng !== undefined && req.query.end_lat !== undefined && req.query.end_lng !== undefined) {
			query.lat = {
				"$gte": req.query.end_lat,
				"$lt": req.query.start_lat
			};
			query.lng = {
				"$gte": req.query.start_lng,
				"$lt": req.query.end_lng
			};
		}
		Request.find(query, function(err, requests) {
			if (err) {
				res.json([]);
			} else {
				res.json(requests);
			}
		});
	});

	server.post(options.accesspoint + 'requests', function(req, res) {
		var request = new Request(req.body);
		request.save(function(err) {
			if (err) {
				res.send(400, err);
			} else {
				res.json(request);
			}
		});
	});

	server.get(options.accesspoint + 'requests/:id', function(req, res) {
		Request.findOne({
			_id: req.params.id
		}, function(err, request) {
			if (err || request === null) {
				res.send(400, {
					message: "Not found!"
				});
			} else {
				request.attributes = [];
				res.json(request)
			}
		});
	});

	server.put(options.accesspoint + 'requests/:id', function(req, res) {
		var request = req.body;
		Request.findOneAndUpdate({
			_id: req.params.id
		}, request, {}, function(err, request) {
			if (err) {
				res.send(500, err);
			} else if (request === null) {
				res.send(400, "Request not found.");
			} else {
				res.json(request);
			}
		});
	});

	server.delete(options.accesspoint + 'requests/:id', function(req, res) {
		Request.findOneAndRemove({
			_id: req.params.id
		}, {}, function(err, request) {
			if (err) {
				res.send(400, err);
			} else {
				res.json(request);
			}
		});
	});
}