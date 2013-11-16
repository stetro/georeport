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
}