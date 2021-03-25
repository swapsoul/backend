//UserController.js

const userRouter = require('express').Router({ mergeParams: true })
const userService = require('../services/userService');
const authWrapper = require('../wrappers/auth-wrapper');

userRouter.route('/').get(userService.getAllUsers)
    .post(userService.addUser)
    .put(authWrapper.verifyToken, userService.updateUser);

userRouter.route('/:usernameOrEmail').get(authWrapper.verifyTokenForRequestWithoutPayload, userService.getUserByUsernameOrEmail)
    .delete(authWrapper.verifyTokenForRequestWithoutPayload, userService.deleteUserByUsernameOrEmail);

module.exports = userRouter;
