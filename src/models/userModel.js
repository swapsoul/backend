//productModel.js
var mongoose = require('mongoose');
//schema
var userSchema = mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    userPassword: String,
    phoneNumber: Number
}, {collection: 'users'});

var User = module.exports = mongoose.model('users', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}
