var mongoose = require('mongoose');
var Request = require('../src/models/Request');

/*
GET		/requests 		index
POST	/requests 		create
GET		/requests/:id 	show
PUT		/requests/:id 	update
DELETE 	/requests/:id 	destroy
*/

module.exports = function(server, options) {
	server.get(options.accesspoint + 'requests', function(req, res) {
		Request.find(function(err, requests) {
			if (err) {
				res.json([]);
			} else {
				for (s in requests) {
					requests[s].service_request_id = requests[s]._id;
				}
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
				request.service_request_id = request._id;
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
				request.service_request_id = request._id;
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
				request.request_code = request._id;
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