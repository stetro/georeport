var express = require('express');
var ServiceController = require('./ServiceController');
var RequestController = require('./RequestController');
var __ = require('lodash');
var mongoose = require('mongoose');


var GeoReport = module.exports = function(options) {
    var self = this;

    var defaults = {
        port: 3000,
        accesspoint: '/',
        db_connect_url: 'mongodb://localhost/georeport'
    };

    if (__.isObject(options)) {
        __.extend(defaults, options);
    }

    self.server = express();
    self.server.use(express.bodyParser());
    
    mongoose.connect(defaults.db_connect_url);
    
    ServiceController(self.server, defaults)
    RequestController(self.server, defaults)

    self.run = function() {
        self.server.listen(defaults.port);
        console.log('Server is running ... localhost:' + defaults.port);
    };
};

if (require.main === module) {
    var server = new GeoReport({
        port: 3000,
        db_connect_url: 'mongodb://localhost/georeport'
    });
    server.run();
}