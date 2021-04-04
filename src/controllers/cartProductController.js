const cartProductRouter = require("express").Router({ mergeParams: true });
const cartProductService = require("../services/cartProductService");
const authWrapper = require("../wrappers/auth-wrapper");

cartProductRouter
	.route("/")
	.post(authWrapper.verifyToken, cartProductService.getCart)
	.put(authWrapper.verifyToken, cartProductService.addByProductId)
	.patch(authWrapper.verifyToken, cartProductService.updateQuantity)
// .delete(authWrapper.verifyToken,cartProductService.deleteByProductId);

module.exports = cartProductRouter;
