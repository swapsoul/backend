//router.js
//initialize express router
let router = require('express').Router();
const authRouter = require('./authController');
const userRouter = require('./userController');
const productRouter = require('./productController');
const deliveryRouter = require('./deliveryController');

router.get('/', function(req, res) {
    res.json({
        status: 'API Works',
        message: 'Welcome to Swapsoul Rest API'
    });
});

//set default API response
router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/delivery', deliveryRouter);

//Export API routes
module.exports = router;
