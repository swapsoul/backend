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

// pincode route
const connection = mongoose.connection;
router.route("/pincode").post(function (req, res) {
  const pinCode = req.body.pin;

  connection.db.collection("pinCodeCollection", function (err, pincodes) {
    pincodes.find({ number: pinCode }).toArray(function (err, data) {
      if (!data) {
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
        console.log("Error is occurreds");
      }
    });
  });
});

//Export API routes
module.exports = router;
