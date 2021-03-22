const commonService = require('../services/commonService');
const User = require('../models/userModel');

exports.verifyToken = (req, res, next) => {
    User.findOne({
        $or: [
            { username: req.body.usernameOrEmail },
            { email: req.body.usernameOrEmail }
        ]
    }, (err, user) => {
        if (user) {
            if (req.headers['swapsoultoken']) {
                let response = commonService.decryptToken(req.headers['swapsoultoken']);
                console.log(response);
                if ((user.username === response.usernameOrEmail || user.email === response.usernameOrEmail) && user.password === response.hash) {
                    console.log('Authorized ' + req.body.usernameOrEmail);
                    next();
                } else {
                    console.log('Unauthorized ' + req.body.usernameOrEmail);
                    res.status(401).json({
                        message: 'Unauthorized'
                    });
                }
            } else {
                console.log('Unauthorized ' + req.body.usernameOrEmail);
                res.status(401).json({
                    message: 'Unauthorized'
                });
            }
        } else {
            res.status(404).json({
                message: 'User Not Found'
            })
        }
    });
}
