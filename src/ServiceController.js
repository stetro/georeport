var mongoose = require('mongoose');
var Service = require('../src/models/Service');

/*
GET		/services 		index
POST	/services 		create
GET		/services/:id 	show
PUT		/services/:id 	update

DELETE 	/services/:id 	destroy
*/

module.exports = function(server, options) {
	server.get(options.accesspoint + 'services', function(req, res) {
		Service.find(function(err, services) {
			if (err) {
				res.json([]);
			} else {
				for (s in services) {
					services[s].service_code = services[s]._id;
				}
				res.json(services);
			}
		});
	});

	server.post(options.accesspoint + 'services', function(req, res) {
		var service = new Service(req.body);
		service.save(function(err) {
			if (err) {
				res.send(400, err);
			} else {
				service.service_code = service._id;
				res.json(service);
			}
		});
	});

	server.get(options.accesspoint + 'services/:id', function(req, res) {
		Service.findOne({
			_id: req.params.id
		}, function(err, service) {
			if (err || service === null) {
				res.send(400, {
					message: "Not found!"
				});
			} else {
				service.attributes = [];
				service.service_code = service._id;
				res.json(service)
			}
		});
	});

	server.put(options.accesspoint + 'services/:id', function(req, res) {
		var service = req.body;
		Service.findOneAndUpdate({
			_id: req.params.id
		}, service, {}, function(err, service) {
			if (err) {
				res.send(500, err);
			} else if (service === null) {
				res.send(400, "Service not found.");
			} else {
				service.service_code = service._id;
				res.json(service);
			}
		});
	});

	server.delete(options.accesspoint + 'services/:id', function(req, res) {
		Service.findOneAndRemove({
			_id: req.params.id
		}, {}, function(err, service) {
			if (err) {
				res.send(400, err);
			} else {
				res.json(service);
			}
		});
	});
}