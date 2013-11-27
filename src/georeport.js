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
        db_connect_url: 'mongodb://localhost/georeport',
        static_dir: __dirname + '/'
    };

    if (__.isObject(options)) {
        __.extend(defaults, options);
    }

    self.app = express();
    self.app.use(express.bodyParser());

    mongoose.connect(defaults.db_connect_url);

    ServiceController(self.app, defaults)
    RequestController(self.app, defaults)

    self.app.use(express.static(defaults.static_dir));

    self.run = function() {
        self.server = require('http').createServer(self.app);
        self.server.listen(defaults.port);
        console.log('Server is running ... localhost:' + defaults.port);
    };

    self.close = function(done) {
        self.server.close(function() {
            done();
        });
        console.log('Server is shutting down ...');
    };
};

if (require.main === module) {
    var server = new GeoReport({
        port: 3000,
        db_connect_url: 'mongodb://localhost/georeport',
        static_dir: __dirname + '/../../reportamoose/phone/app/'
    });
    server.run();
}