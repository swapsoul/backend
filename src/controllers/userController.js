//UserController.js
//Import User Model
User = require('../models/userModel');
const commonService = require('../services/commonService')
//For index
exports.index = function (req, res) {
    User.find(function (err, user) {
        // if (err)
        //     res.json({
        //         status: "error",
        //         message: err
        //     });
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
exports.add = function (req, res) {
    const token = req.headers['swapsoultoken'];
    if (token === undefined) {
        return res.status(400).json({
            message: 'Bad Request'
        });
    }
    const resp = commonService.decryptToken(token);
    const user = new User();
    user.userEmail = req.body.userEmail ? req.body.userEmail : user.userEmail;
    user.userName = req.body.userName;
    user.userPassword = resp.hash
    user.phoneNumber = req.body.phoneNumber;

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
                status: "New user Added!",
                message: "New user Added!",
                data: user
            });
        }
    });
};
// View User
exports.view = function (req, res) {
    User.findOne({ 'userEmail': req.params.userEmail }, function (err, user) {
        // if (err)
        //     res.send(err);
        if (user) {
            res.json({
                message: 'User Details',
                data: user.toJSON()
            });
        } else {
            res.status(404).json({
                message: 'User Not Found'
            })
        }
    });
};
// Update User
exports.update = function (req, res) {
    User.findById(req.params.userEmail, function (err, user) {
        if (err)
            res.send(err);
        user.userEmail = req.body.userEmail ? req.body.userEmail : user.userEmail;
        user.userName = req.body.userName;
        user.userPassword = req.body.userPassword;
        user.phoneNumber = req.body.phoneNumber;
        //save and check errors
        user.save(function (err) {
            if (err)
                res.json(err)
            res.json({
                message: "User Updated Successfully",
                data: user
            });
        });
    });
};
// Delete User
exports.delete = function (req, res) {
    User.deleteOne({
        _id: req.params.userEmail 
    }, function (err, contact) {
        if (err)
            res.send(err)
        res.json({
            status: "success",
            message: 'User Deleted'
        })
    })
}
