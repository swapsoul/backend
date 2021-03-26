//productController.js
const productRouter = require('express').Router({ mergeParams: true });
const productService = require('../services/productService');

productRouter.route('/')
    .get(productService.getAllProduct)
    .post(productService.addProduct);
productRouter.route('/:productID')
    .get(productService.getProductByProductId)
    .patch(productService.updateProductByProductId)
    .put(productService.updateProductByProductId)
    .delete(productService.deleteProductByProductId);

module.exports = productRouter;
