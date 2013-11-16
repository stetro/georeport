var request = require('request');
var assert = require('assert');
var mongoose = require('mongoose');
var georeport = require('../src/georeport');
var Service = require('../src/models/Service');
var services = require('../test/data/services.js');
var __ = require('lodash');

// Connecting to a local test database or creating it on the fly
mongoose.connect('mongodb://localhost/georeport_test');

var options = {
    port: 3000
};

var server = new georeport(options).run();

describe('Service REST interface', function() {

    beforeEach(function(done) {

        var total = services.array.length;
        var array = __.cloneDeep(services.array)
        var result = [];
        var saveAll = function() {
            var doc = array.pop();
            doc = new Service(doc);
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
                url: 'http://localhost:' + options.port + '/services',
                json: true
            }, function(error, res, body) {
                if (!error && res.statusCode == 200) {
                    assert.equal(body.length, 3);
                    done();
                } else {
                    throw {
                        message: 'Error! GET call was not successfull ' + res.statusCode
                    };
                }
            });
        });
    });

    describe('POST /services', function() {
        it('should add a new service to the database', function(done) {
            request.post({
                form: services.sample_service,
                url: 'http://localhost:' + options.port + '/services',
                json: true
            }, function(error, res) {
                if (!error && res.statusCode == 200) {
                    request.get({
                        url: 'http://localhost:' + options.port + '/services',
                        json: true
                    }, function(error, res, body) {
                        if (!error && res.statusCode == 200) {
                            assert.notEqual(body, undefined);
                            assert.equal(body.length, 4);
                            done();
                        } else {
                            throw {
                                message: 'Error! GET call was not successfull ' + res.statusCode
                            };
                        }
                    });
                } else {
                    throw {
                        message: 'Error! POST call was not successfull ' + res.statusCode
                    };
                }
            })
        });
    });

    describe('GET /services/:id', function() {
        it('should give one specific service as object', function(done) {
            Service.findOne({}, function(err, s) {
                if (err) throw err;
                request.get({
                    url: 'http://localhost:' + options.port + '/services/' + s._id,
                    json: true
                }, function(error, res, body) {
                    if (!error && res.statusCode == 200) {
                        assert.notEqual(body, undefined);
                        done();
                    } else {
                        throw {
                            message: 'Error! GET call was not successfull ' + res.statusCode
                        };
                    }
                });
            })
        });
    });


    describe('PUT /services/:id', function() {
        it('should update one specific service object by calling', function(done) {
            Service.findOne({}, function(err, oldService) {
                if (err) throw err;
                request.put({
                    url: 'http://localhost:' + options.port + '/services/' + oldService._id,
                    json: true,
                    body: {
                        description: "Test"
                    }
                }, function(error, res, body) {
                    if (!error && res.statusCode == 200) {
                        assert.notEqual(body, undefined);
                        request.get({
                            url: 'http://localhost:' + options.port + '/services/' + oldService._id,
                            json: true
                        }, function(error, res, body) {
                            if (!error && res.statusCode == 200) {
                                assert.notEqual(body, undefined);
                                assert.equal(body.description, "Test")
                                done();
                            } else {
                                throw {
                                    message: 'Error! GET call was not successfull ' + res.statusCode
                                };
                            }
                        });
                    } else {
                        throw {
                            message: 'Error! PUT call was not successfull ' + res.statusCode
                        };
                    }
                });
            });
        });
    });

    describe('DELETE /services/:id', function() {
        it('should delete one specific service object by calling', function(done) {
            Service.findOne({}, function(err, service) {
                if (err) throw err;
                request.del({
                    url: 'http://localhost:' + options.port + '/services/' + service._id,
                    json: true,
                    body: {
                        description: "Test"
                    }
                }, function(error, res, body) {
                    if (!error && res.statusCode == 200) {
                        assert.notEqual(body, undefined);
                        request.get({
                            url: 'http://localhost:' + options.port + '/services',
                            json: true
                        }, function(error, res, body) {
                            if (!error && res.statusCode == 200) {
                                assert.equal(body.length, 2);
                                done();
                            } else {
                                throw {
                                    message: 'Error! GET call was not successfull ' + res.statusCode
                                };
                            }
                        });
                    } else {
                        throw {
                            message: 'Error! DELETE call was not successfull ' + res.statusCode
                        };
                    }
                });
            });
        });
    });
});