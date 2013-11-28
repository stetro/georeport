var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Service = require('../models/Service');


function checkServiceCodeOfServices(val, done) {
    Service.find({
        _id: val
    }, function(error, items) {
        done(!error);
    });
};

var RequestSchema = new Schema({
    service_code: {
        type: String,
        required: true
    },
    lat: {
        type: String,
        required: true
    },
    lng: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    device_id: {
        type: String,
        required: false
    },
    account_id: {
        type: String,
        required: false
    },
    first_name: {
        type: String,
        required: false
    },
    last_name: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    media_url: {
        type: String,
        required: false
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "open",
        required: true
    }
});

RequestSchema.path('service_code').validate(checkServiceCodeOfServices, 'service_code invalide');

var service_request_id = RequestSchema.virtual('service_request_id');

service_request_id.get(function() {
    return this._id.toHexString();
});

RequestSchema.set('toObject', {
    virtuals: true
});

RequestSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Request', RequestSchema);