const cartProductRouter = require("express").Router({ mergeParams: true });
const cartProductService = require("../services/cartProductService");
const authWrapper = require("../wrappers/auth-wrapper");

cartProductRouter
	.route("/")
	.get(authWrapper.verifyTokenForRequestWithoutPayload, cartProductService.getCart)
	.put(authWrapper.verifyToken, cartProductService.addByProductId)
	.patch(authWrapper.verifyTokenForRequestWithoutPayload, cartProductService.updateQuantityByProductId)
	.delete(authWrapper.verifyTokenForRequestWithoutPayload, cartProductService.deleteByProductId);

module.exports = cartProductRouter;
