const deliveryRouter = require('express').Router({ mergeParams: true });
const deliveryService = require('../services/deliveryService');


deliveryRouter.route('/').get(deliveryService.getAllPincode);
deliveryRouter.route('/pin/:pincode').get(deliveryService.getDeliveryStatus);

module.exports = deliveryRouter;
