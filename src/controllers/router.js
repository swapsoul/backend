//router.js
//initialize express router
let router = require('express').Router();
let authRouter = require('../controllers/authController');
//set default API response
router.use('/auth', authRouter);

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
