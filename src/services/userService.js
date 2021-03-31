const User = require('../models/userModel');
const commonService = require('./commonService');
const emailService = require('./emailService');

//get all users
exports.getAllUsers = function (req, res) {
    User.find({}, { _id: 1, phoneNumber: 1, userEmail: 1, userName: 1, verificationStatus: 1 }, function (err, user) {
        if (user) {
            res.json({
                message: "Got user Successfully!",
                data: user
            });
        } else {
            res.status(404).json({
                message: 'User Not Found'
            });
        }
    });
};

//For creating new user
exports.addUser = function (req, res) {
    const token = req.headers['swapsoultoken'];
    if (!token) {
        return res.status(400).json({
            message: 'Bad Request'
        });
    }
    const resp = commonService.decryptToken(token);

    const verificationOtp = commonService.createOtp(6);
    const verificationOtpTimestamp = new Date().toUTCString();

    const user = new User();
    user.userEmail = commonService.isFieldValid(req.body.userEmail) ? req.body.userEmail : commonService.throwError('Invalid Email');
    user.userName = commonService.isFieldValid(req.body.userName) ? req.body.userName : commonService.throwError('Invalid Username');
    user.userPassword = resp.hash;
    user.phoneNumber = commonService.isFieldValid(req.body.phoneNumber) ? req.body.phoneNumber : commonService.throwError('Invalid PhoneNumber');
    user.signInMethod = 'email';
    user.verificationOtp = verificationOtp;
    user.verificationOtpTimestamp = verificationOtpTimestamp;
    user.verificationStatus = false;
    user.signUpDate = verificationOtpTimestamp;
    user.modifiedDate = verificationOtpTimestamp;

    //Save and check error
    user.save(function (err) {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                res.status(409).json({
                    message: 'User already exists'
                });
            } else {
                res.status(501).json({
                    message: 'Something went wrong. Please contact admin of this site.'
                });
            }
        } else {
            emailService.sendMail(user.userEmail, 'Swapsoul - Verification Pending', 'userVerificationOTP.html', {
                name: user.userName,
                verificationOtp,
                verificationOtpTimestamp
            }, [], (err) => {
                if (err) {
                    res.status(204).json({
                        message: "User created and email sending failed",
                        data: {
                            _id: user._id,
                            userName: user.userName,
                            userEmail: user.userEmail,
                            phoneNumber: user.phoneNumber
                        }
                    });
                } else {
                    res.json({
                        message: "User created and email sent",
                        data: {
                            _id: user._id,
                            userName: user.userName,
                            userEmail: user.userEmail,
                            phoneNumber: user.phoneNumber
                        }
                    });
                }
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
    }, { _id: 1, phoneNumber: 1, userEmail: 1, userName: 1, verificationStatus: 1}, function (err, user) {
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
    }, { _id: 1, phoneNumber: 1, userEmail: 1, userName: 1 }, function (err, user) {
        if (user) {
            console.log(user);
            user.userEmail = commonService.isFieldValid(req.body.userEmail) ? req.body.userEmail : user.userEmail;
            user.userName = commonService.isFieldValid(req.body.userName) ? req.body.userName : user.userName;
            user.phoneNumber = commonService.isFieldValid(req.body.phoneNumber) ? req.body.phoneNumber : user.phoneNumber;
            user.modifiedDate = new Date().toUTCString();
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
};

exports.resetPasswordSendMail = (req, res) => {
    if (commonService.isFieldValid(req.params.usernameOrEmail)) {
        User.findOne({
            $or: [
                { userName: req.params.usernameOrEmail },
                { userEmail: req.params.usernameOrEmail }
            ]
        }, { _id: 1, userName: 1, userEmail: 1, passwordOtp: 1, passwordOtpTimestamp: 1 }, (err, user) => {
            if (err) {
                res.status(404).json({
                    message: 'User Not Found'
                });
            } else {
                const passwordOtp = commonService.createOtp(6);
                const passwordOtpTimestamp = new Date().toUTCString();
                user.passwordOtp = passwordOtp;
                user.passwordOtpTimestamp = passwordOtpTimestamp;
                user.modifiedDate = new Date().toUTCString();
                user.save((err) => {
                    if (err) {
                        res.status(501).json({
                            message: 'Unable to update user details'
                        });
                    } else {
                        emailService.sendMail(user.userEmail, "Swapsoul - Password Reset", 'forgotPassword.html', {
                            name: user.userName,
                            passwordOtp,
                            passwordOtpTimestamp
                        }, [], (err) => {
                            if (err) {
                                res.status(204).json({
                                    message: 'Password OTP updated for user, email sending failed'
                                });
                            } else {
                                res.json({
                                    message: "Password OTP email sent successfully"
                                });
                            }
                        });
                    }
                });
            }
        });
    } else {
        return res.status(400).json({
            message: 'Bad Request'
        });
    }
};

exports.resetPassword = (req, res) => {
    if (commonService.isFieldValid(req.body.usernameOrEmail) && req.body.passwordOtp) {
        User.findOne({
            $or: [
                { userName: req.body.usernameOrEmail },
                { userEmail: req.body.usernameOrEmail }
            ]
        }, { _id: 1, userName: 1, userEmail: 1, passwordOtp: 1, passwordOtpTimestamp: 1 }, (err, user) => {
            if (err) {
                res.status(404).json({
                    message: 'User Not Found'
                });
            } else {
                const hashResponse = commonService.decryptToken(req.headers['swapsoultoken']);
                const currentDate = new Date();
                const dateFromDb = new Date(user.passwordOtpTimestamp);
                const after10min = dateFromDb.setMinutes(dateFromDb.getMinutes() + 10);
                if (user.passwordOtp === req.body.passwordOtp && after10min > currentDate) {
                    user.userPassword = hashResponse.hash;
                    user.modifiedDate = new Date().toUTCString();
                    user.save((err) => {
                        if (err) {
                            res.status(501).json({
                                message: 'Unable to update user details'
                            });
                        } else {
                            emailService.sendMail(user.userEmail, "Swapsoul - Password Update", 'passwordUpdate.html', {
                                name: user.userName,
                                passwordOtpTimestamp: new Date().toUTCString()
                            }, [], (err) => {
                                if (err) {
                                    res.status(204).json();
                                } else {
                                    res.json({
                                        message: "Password update sent successfully"
                                    });
                                }
                            });
                        }
                    });
                } else {
                    res.status(401).json({
                        message: "Incorrect Password OTP"
                    });
                }
            }
        });
    } else {
        return res.status(400).json({
            message: 'Bad Request'
        });
    }
};

exports.userVerificationInitEmail = (req, res) => {
    if (commonService.isFieldValid(req.params.usernameOrEmail)) {
        User.findOne({
            $or: [
                { userName: req.params.usernameOrEmail },
                { userEmail: req.params.usernameOrEmail }
            ]
        }, { _id: 1, userName: 1, userEmail: 1 }, (err, user) => {
            if (err) {
                res.status(404).json({
                    message: 'User Not Found'
                });
            } else {
                const verificationOtp = commonService.createOtp(6);
                const verificationOtpTimestamp = new Date().toUTCString();
                user.verificationOtp = verificationOtp;
                user.verificationOtpTimestamp = verificationOtpTimestamp;
                user.modifiedDate = new Date().toUTCString();
                user.save((err) => {
                    if (err) {
                        res.status(501).json({
                            message: 'Unable to update user details'
                        });
                    } else {
                        emailService.sendMail(user.userEmail, 'Swapsoul - Verification Pending', 'userVerificationOTP.html', {
                            name: user.userName,
                            verificationOtp,
                            verificationOtpTimestamp
                        }, [], (err) => {
                            if (err) {
                                res.status(204).json({
                                    message: "Verification email sending failed",
                                    data: user
                                });
                            } else {
                                res.json({
                                    message: "Verification email sent",
                                    data: user
                                });
                            }
                        });
                    }
                });
            }
        });
    } else {
        return res.status(400).json({
            message: 'Bad Request'
        });
    }
};

exports.userVerificationUpdate = (req, res) => {
    if (commonService.isFieldValid(req.body.usernameOrEmail) && req.body.verificationOtp) {
        User.findOne({
            $or: [
                { userName: req.body.usernameOrEmail },
                { userEmail: req.body.usernameOrEmail }
            ]
        }, { _id: 1, userName: 1, userEmail: 1, verificationOtp: 1, verificationOtpTimestamp: 1}, (err, user) => {
            if (err) {
                res.status(404).json({
                    message: 'User Not Found'
                });
            } else {
                const currentDate = new Date();
                const dateFromDb = new Date(user.verificationOtpTimestamp);
                const after10min = dateFromDb.setMinutes(dateFromDb.getMinutes() + 10);
                if (user.verificationOtp === req.body.verificationOtp && after10min > currentDate) {
                    user.verificationStatus = true;
                    user.modifiedDate = new Date().toUTCString();
                    user.save((err) => {
                        if (err) {
                            res.status(501).json({
                                message: 'Unable to update user details'
                            });
                        } else {
                            emailService.sendMail(user.userEmail, "Swapsoul - Account Verified", 'userVerificationUpdate.html', {
                                name: user.userName,
                                verificationOtpTimestamp: new Date().toUTCString()
                            }, [], (err) => {
                                if (err) {
                                    res.status(204).json({
                                        message: 'Account verified and email sending failed'
                                    });
                                } else {
                                    res.json({
                                        message: "Account verified and email sent successfully"
                                    });
                                }
                            });
                        }
                    });
                } else {
                    res.status(401).json({
                        message: "Incorrect Verification OTP"
                    });
                }
            }
        });
    } else {
        return res.status(400).json({
            message: 'Bad Request'
        });
    }
};
