var request = require('request');
var assert = require('assert');
var mongoose = require('mongoose');
var georeport = require('../src/georeport');
var Request = require('../src/models/Request');
var requests = require('../test/data/requests.js');
var Service = require('../src/models/Service');
var services = require('../test/data/services.js');
var __ = require('lodash');


var options = {
    port: 3000,
    db_connect_url: 'mongodb://localhost/georeport_test'
}, server;

describe('Request REST interface', function() {
    before(function() {
        server = new georeport(options);
        server.run();
    });

    after(function(done) {
        Request.remove(function(err) {
            Service.remove(function(err) {
                mongoose.connection.close();
                server.close(done);
            });
        });
    });

    beforeEach(function(done) {
        function saveServices() {
            var total = services.array.length;
            var array = __.cloneDeep(services.array)
            var result = [];
            var saveAll = function() {
                var doc = array.pop();
                doc = new Service(doc);
                doc.save(function(err, saved) {
                    if (err) throw err;
                    if (--total) saveAll();
                    else saveRequests();
                })
            };
            Service.find().remove({}, function() {
                saveAll();
            });
        }

        function saveRequests() {
            var total = requests.array.length;
            var array = __.cloneDeep(requests.array)
            var result = [];
            var saveAll = function() {
                var doc = array.pop();
                doc = new Request(doc);
                doc.save(function(err, saved) {
                    if (err) throw err;
                    if (--total) saveAll();
                    else done();
                })
            };
            Request.find().remove({}, function() {
                saveAll();
            });
        };
        saveServices();
    });

    describe('GET /requests', function() {
        it('should give a list of available requests as array', function(done) {
            request.get({
                url: 'http://localhost:' + options.port + '/requests',
                json: true
            }, function(error, res, body) {
                if (!error && res.statusCode == 200) {
                    assert.equal(body.length, requests.array.length);
                    done();
                } else {
                    throw {
                        message: 'Error! GET call was not successfull ' + res.statusCode
                    };
                }
            });
        });
        it('should give a list of requests as array at a given time area', function(done) {
            request.get({
                url: 'http://localhost:' + options.port + '/requests',
                json: true,
                qs: {
                    start_date: "2013-10-12T12:28:19.993Z",
                    end_date: "2013-10-12T14:28:19.993Z"
                }
            }, function(error, res, body) {
                if (!error && res.statusCode == 200) {
                    assert.equal(body.length, 1);
                    done();
                } else {
                    throw {
                        message: 'Error! GET call was not successfull ' + res.statusCode
                    };
                }
            });
        });
        it('should give a list of requests as array at a given location area', function(done) {
            request.get({
                url: 'http://localhost:' + options.port + '/requests',
                json: true,
                qs: {
                    start_lat: 61.501755,
                    start_lng: 23.752828,
                    end_lat: 61.496164,
                    end_lng: 23.766689
                }
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
        });
        it('should give a list of requests as array with a specific status', function(done) {
            request.get({
                url: 'http://localhost:' + options.port + '/requests',
                json: true,
                qs: {
                    status: 'open'
                }
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
        });
    });

    describe('POST /requests', function() {
        it('should add a new request to the database', function(done) {
            request.post({
                form: requests.sample_request,
                url: 'http://localhost:' + options.port + '/requests',
                json: true
            }, function(error, res) {
                if (!error && res.statusCode == 200) {
                    request.get({
                        url: 'http://localhost:' + options.port + '/requests',
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
            });
        });
        it('should deny a invalid service_code', function(done) {
            var sample_request = __.cloneDeep(requests.sample_request)
            sample_request.service_code = "0x00";
            request.post({
                form: sample_request,
                url: 'http://localhost:' + options.port + '/requests',
                json: true
            }, function(error, res) {
                if (!error && res.statusCode == 200) {
                    throw {
                        message: 'Error! POST call with invalid service_code not denied '
                    };
                } else {
                    assert.ok(true);
                    done();
                }
            });
        });
    });

    describe('GET /requests/:id', function() {
        it('should give one specific request as object', function(done) {
            Request.findOne({}, function(err, s) {
                if (err) throw err;
                request.get({
                    url: 'http://localhost:' + options.port + '/requests/' + s._id,
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


    describe('PUT /requests/:id', function() {
        it('should update one specific request object by calling', function(done) {
            Request.findOne({}, function(err, oldRequest) {
                if (err) throw err;
                request.put({
                    url: 'http://localhost:' + options.port + '/requests/' + oldRequest._id,
                    json: true,
                    body: {
                        description: "TestRequestDescriptionChange"
                    }
                }, function(error, res, body) {
                    if (!error && res.statusCode == 200) {
                        assert.notEqual(body, undefined);
                        request.get({
                            url: 'http://localhost:' + options.port + '/requests/' + oldRequest._id,
                            json: true
                        }, function(error, res, body) {
                            if (!error && res.statusCode == 200) {
                                assert.notEqual(body, undefined);
                                assert.equal(body.description, "TestRequestDescriptionChange")
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

    describe('DELETE /requests/:id', function() {
        it('should delete one specific request object by calling', function(done) {
            Request.findOne({}, function(err, toDeleteRequest) {
                if (err) throw err;
                request.del({
                    url: 'http://localhost:' + options.port + '/requests/' + toDeleteRequest._id,
                    json: true
                }, function(error, res, body) {
                    if (!error && res.statusCode == 200) {
                        assert.notEqual(body, undefined);
                        request.get({
                            url: 'http://localhost:' + options.port + '/requests',
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