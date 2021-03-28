const userRouter = require('express').Router({ mergeParams: true });
const userService = require('../services/userService');
const authWrapper = require('../wrappers/auth-wrapper');

userRouter.route('/').get(userService.getAllUsers)
    .post(userService.addUser)
    .put(authWrapper.verifyToken, userService.updateUser);

userRouter.route('/:usernameOrEmail').get(authWrapper.verifyTokenForRequestWithoutPayload, userService.getUserByUsernameOrEmail)
    .delete(authWrapper.verifyTokenForRequestWithoutPayload, userService.deleteUserByUsernameOrEmail);

userRouter.route('/resetpassword/:usernameOrEmail').get(userService.resetPasswordSendMail);
userRouter.route('/resetpassword').put(userService.resetPassword);
userRouter.route('/verification/:usernameOrEmail').get(authWrapper.verifyTokenForRequestWithoutPayload, userService.userVerificationInitEmail);
userRouter.route('/verification').put(authWrapper.verifyToken, userService.userVerificationUpdate);

module.exports = userRouter;
