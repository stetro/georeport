var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ServiceSchema = new Schema({
    service_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    metadata: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        required: true
    },
    keywords: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    }
});

var service_code = ServiceSchema.virtual('service_code');

service_code.get(function() {
    return this._id.toHexString();
});

ServiceSchema.set('toObject', {
    virtuals: true
});

ServiceSchema.set('toJSON', {
    virtuals: true
});


module.exports = mongoose.model('Service', ServiceSchema);