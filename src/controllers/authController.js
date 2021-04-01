const authRouter = require('express').Router({ mergeParams: true });
const authService = require('../services/authService');
const authWrapper = require('../wrappers/auth-wrapper');

authRouter.route('/').get(authService.welcome);
authRouter.route('/login').post(authWrapper.verifyToken, authService.login);

module.exports = authRouter;
