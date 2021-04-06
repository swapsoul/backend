const orderRouter = require('express').Router({ mergeParams: true})
const orderService = require("../services/orderService");
const authWrapper = require("../wrappers/auth-wrapper");

orderRouter.route('/')
.post(authWrapper.verifyToken, orderService.getOrdersByUserId)
.put(authWrapper.verifyToken, orderService.createOrder)
.patch(authWrapper.verifyToken, orderService.modifyOrderStatus)

orderRouter.route('/all').post( orderService.getAllOrders);

module.exports = orderRouter;
