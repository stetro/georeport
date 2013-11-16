var request = require('request');
var assert = require('assert');
var mongoose = require('mongoose');
var Service = require('../src/models/Service');
var services = require('../test/data/services.js');

// Connecting to a local test database or creating it on the fly
mongoose.connect('mongodb://localhost/georeport_test');

describe('Service REST interface', function() {

    beforeEach(function(done) {

        var total = services.length;
        var result = [];
        var saveAll = function() {
            var doc = services.pop();

            doc.save(function(err, saved) {
                if (err) throw err;
                if (--total) saveAll();
                else done();
            })
        };
        Service.find().remove({}, function() {
            saveAll();
        });

    });

    describe('GET /services', function() {
        it('should give a list of available services as array', function(done) {
            request.get({
                url: 'http://localhost:3000/services',
                json: true
            }, function(error, response, body) {
                console.log(body)
                if (!error && response.statusCode == 200) {
                    assert.equal(body.length, 1);
                    done();
                } else {
                    throw error;
                }
            });
        });
    });
});