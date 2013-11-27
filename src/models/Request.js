var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Service = require('../models/Service');

var RequestSchema = new Schema({
    service_request_id: {
        type: String,
        required: true,
        unique: true,
        default: Date.now
    },
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
    }
});

module.exports = mongoose.model('Request', RequestSchema);