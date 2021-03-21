//UserController.js
//Import User Model
User = require('../models/userModel');
//For index
exports.index = function (req, res) {
    User.get(function (err, user) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "success",
            message: "Got user Successfully!",
            data: user
        });
    });
};
//For creating new user
exports.add = function (req, res) {
    var user = new User();
    user.userEmail = req.body.userEmail ? req.body.userEmail : user.userEmail;
    user.userPassword = req.body.userPassword;
    user.phoneNumber = req.body.phoneNumber;

    //Save and check error
    user.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: "New user Added!",
            data: user
        });
    });
};
// View User
exports.view = function (req, res) {
    User.findOne({'userEmail': req.params.userEmail}, function (err, user) {
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
