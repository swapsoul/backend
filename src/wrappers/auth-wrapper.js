const commonService = require('../services/commonService');
const User = require('../models/userModel');

exports.verifyToken = (req, res, next) => {
    User.findOne({
        $or: [
            { userName: req.body.usernameOrEmail },
            { userEmail: req.body.usernameOrEmail }
        ]
    }, (err, user) => {
        if (user) {
            if (req.headers['swapsoultoken']) {
                let response = commonService.decryptToken(req.headers['swapsoultoken']);
                console.log(response);
                if ((user.userName === response.usernameOrEmail || user.userEmail === response.usernameOrEmail) && user.userPassword === response.hash) {
                    console.log('Authorized ' + req.body.usernameOrEmail);
                    req.user = user;
                    next();
                } else {
                    console.log('Unauthorized ' + req.body.usernameOrEmail);
                    res.status(401).json({
                        message: 'Unauthorized'
                    });
                }
            } else {
                console.log('Unauthorized ' + req.body.usernameOrEmail);
                res.status(400).json({
                    message: 'Bad Request'
                });
            }
        } else {
            res.status(404).json({
                message: 'User Not Found'
            });
        }
    });
};

exports.verifyTokenForRequestWithoutPayload = (req, res, next) => {
    if (req.headers['swapsoultoken']) {
        let response = commonService.decryptToken(req.headers['swapsoultoken']);
        console.log(response);
        User.findOne({
            $or: [
                { userName: response.usernameOrEmail },
                { userEmail: response.usernameOrEmail }
            ]
        }, (err, user) => {
            const isValidUser = req.params.usernameOrEmail ? user ?
                user.userName === req.params.usernameOrEmail || user.userEmail === req.params.usernameOrEmail : false : true;
            if (err || !user) {
                res.status(404).json({
                    message: 'User Not Found'
                });
            } else if (user.userPassword === response.hash && isValidUser) {
                req.user = user;
                next();
            } else {
                console.log('Unauthorized ' + user.userName);
                res.status(401).json({
                    message: 'Unauthorized'
                });
            }
        });
    } else {
        console.log('Bad Request');
        res.status(400).json({
            message: 'Bad Request'
        });
    }
}
