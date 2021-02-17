//router.js
//initialize express router
let router = require('express').Router();
//set default API response
router.get('/', function(req, res) {
    res.json({
        status: 'API Works',
        message: 'Welcome to Swapsoul Rest API'
    });
});

//Import Product Controller
var productController = require('./productController');
// Product routes
router.route('/product')
    .get(productController.index)
    .post(productController.add);
router.route('/product/:productID')
    .get(productController.view)
    .patch(productController.update)
    .put(productController.update)
    .delete(productController.delete);

//Export API routes
module.exports = router;