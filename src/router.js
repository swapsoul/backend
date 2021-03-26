//router.js
//initialize express router
let router = require('express').Router();
const authRouter = require('./controllers/authController');
const userRouter = require('./controllers/userController');
const productRouter = require('./controllers/productController');
const deliveryRouter = require('./controllers/deliveryController');

router.get('/', function(req, res) {
    res.json({
        status: 'API Works',
        message: 'Welcome to Swapsoul Rest API'
    });
});

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/delivery', deliveryRouter);

//Export API routes
module.exports = router;
