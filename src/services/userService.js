User = require('../models/userModel');
const commonService = require('./commonService');

//get all users
exports.getAllUsers = function (req, res) {
    User.find({}, {_id: 1, phoneNumber: 1, userEmail: 1, userName: 1}, function (err, user) {
        if (user) {
            res.json({
                status: "success",
                message: "Got user Successfully!",
                data: user
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'User Not Found'
            })
        }
    });
};

//For creating new user
exports.addUser = function (req, res) {
    const token = req.headers['swapsoultoken'];
    if (token === undefined) {
        return res.status(400).json({
            message: 'Bad Request'
        });
    }
    const resp = commonService.decryptToken(token);
    const user = new User();
    user.userEmail = commonService.isFieldValid(req.body.userEmail) ? req.body.userEmail : commonService.throwError('Invalid Email');
    user.userName = commonService.isFieldValid(req.body.userName) ? req.body.userName : commonService.throwError('Invalid Username');
    user.userPassword = resp.hash
    user.phoneNumber = commonService.isFieldValid(req.body.phoneNumber) ? req.body.phoneNumber : commonService.throwError('Invalid PhoneNumber');

    //Save and check error
    user.save(function (err) {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                res.status(409).json({
                    message: 'User already exists'
                })
            } else {
                res.status(501).json({
                    message: 'Something went wrong. Please contact admin of this site.'
                });
            }
        } else {
            res.json({
                status: "success",
                message: "New user Added!",
                data: user
            });
        }
    });
};

// Get User by Email or Username
exports.getUserByUsernameOrEmail = function (req, res) {
    User.findOne({
        $or: [
            { userName: req.params.usernameOrEmail },
            { userEmail: req.params.usernameOrEmail }
        ]
    }, {_id: 1, phoneNumber: 1, userEmail: 1, userName: 1},function (err, user) {
        if (err) {
            res.status(404).json({
                message: 'User Not Found'
            });
        } else if (user) {
            res.json({
                message: 'User Details',
                data: user.toJSON()
            });
        } else {
            res.status(401).json({
                message: 'Unauthorized'
            })
        }
    });
};

// Update User
exports.updateUser = function (req, res) {
    User.findOne({
        $or: [
            { userName: req.body.usernameOrEmail },
            { userEmail: req.body.usernameOrEmail }
        ]
    }, {_id: 1, phoneNumber: 1, userEmail: 1, userName: 1}, function (err, user) {
        if (user) {
            console.log(user);
            user.userEmail = commonService.isFieldValid(req.body.userEmail) ? req.body.userEmail : user.userEmail;
            user.userName = commonService.isFieldValid(req.body.userName) ? req.body.userName : user.userName;
            user.phoneNumber = commonService.isFieldValid(req.body.phoneNumber) ? req.body.phoneNumber : user.phoneNumber;
            user.save(function (err) {
                if (err) {
                    res.status(501).json({
                        message: 'Unable to update user details'
                    });
                } else {
                    res.json({
                        message: "User Updated Successfully",
                        data: user
                    });
                }
            });
        } else {
            res.status(404).json({
                message: 'User Not Found'
            })
        }
    });
};

// Delete User
exports.deleteUserByUsernameOrEmail = function (req, res) {
    User.deleteOne({
        $or: [
            { userName: req.params.usernameOrEmail },
            { userEmail: req.params.usernameOrEmail }
        ]
    }, function (err) {
        if (err) {
            res.status(404).json({
                message: 'User Not Found'
            });
        } else {
            res.json({
                message: 'User Deleted'
            });
        }
    });
}
