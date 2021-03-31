const mongoose = require('mongoose');
//schema
const userSchema = mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    },
    phoneNumber: Number,
    passwordOtp: String,
    passwordOtpTimestamp: String,
    verificationStatus: {
        type: Boolean,
        required: true
    },
    verificationOtp: String,
    verificationOtpTimestamp: String,
    signInMethod: String,
    signUpDate: String,
    modifiedDate: String
}, { collection: 'users' });

const User = module.exports = mongoose.model('users', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
};

