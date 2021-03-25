//router.js
//initialize express router
let router = require('express').Router();
const authRouter = require('./authController');
const userRouter = require('./userController');

//set default API response
router.use('/auth', authRouter);
router.use('/user', userRouter);

router.get('/', function(req, res) {
    res.json({
        status: 'API Works',
        message: 'Welcome to Swapsoul Rest API'
    });
});
const mongoose = require('mongoose');
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

const connection = mongoose.connection;
router.route("/sample").post(function (req, res) {
    const pinCode = parseInt(req.body.pincode);
    console.log("querying db for pincode",pinCode);
    connection.db.collection("b2c_delivery_pincodes", function (err, pincodes) {
        pincodes.find({ pin: pinCode }).toArray(function (err, data) {
            console.log(data)
            if (data.length !== 0) {
                console.log("Delivery is available");
                res.json({
                    status: "success",
                    message: "Delivery is available",
                });
            } else {
                res.json({
                    status: "error",
                    message: err,
                });
                console.log("Error is occurred");
            }
        });
    });
});

//Import User Controller
// var userController = require('./userController');
// // User routes
// router.route('/user')
//    .get(userController.index)
//    .post(userController.add);
// router.route('/user/:userEmail')
//    .get(userController.view)
//    .patch(userController.update)
//    .put(userController.update)
//    .delete(userController.delete);

//Export API routes
module.exports = router;