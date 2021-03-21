const commonService = require('../services/commonService');

exports.verifyToken = (req, res, next) => {
    if (req.headers['swapsoultoken']) {
        let response = commonService.decryptToken(req.headers['swapsoultoken']);
        console.log(response);
        if (req.body.usernameOrEmail === response.usernameOrEmail && commonService.createsha512hash('12345') === response.hash) {
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
}
