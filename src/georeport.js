var express = require('express');
var __ = require('lodash');


var GeoReport = module.exports = function(options) {


    if (__.isObject(options)) {
        __.extend(this, options);
    } else {
        this.port = 3000;
    }
    this.server = express();
    this.server.use(express.bodyParser());
    this.server.get('/services', function(req, res) {
        res.json([1]);
    });

    this.listen = function() {
        this.server.listen(this.port);
        console.log("Server is running ... localhost:8080");
    };
};
if (require.main === module) {
    var server = new GeoReport({
        port: 3000
    });
    server.listen();
}