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


 //Import User Controller   
var userController = require('./userController');
// User routes
router.route('/user')
    .get(userController.index)
    .post(userController.add);
router.route('/user/:userEmail')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);

//Export API routes
module.exports = router;