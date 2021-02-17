//productController.js
//Import Product Model
Product = require('./productModel');
//For index
exports.index = function (req, res) {
    Product.get(function (err, product) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "success",
            message: "Got Product Successfully!",
            data: product       
        });
    });
};
//For creating new product
exports.add = function (req, res) {
    var product = new Product();
    product.productID = req.body.productID? req.body.productID : product.productID;
    product.productName = req.body.productName;
    product.price = req.body.price;
    product.imgURL = req.body.imgURL;

   
//Save and check error
product.save(function (err) {
        if (err)
            res.json(err);
res.json({
            message: "New Product Added!",
            data: product
        });
    });
};
// View Product
exports.view = function (req, res) {
    Product.findById(req.params.productID, function (err, product) {
        if (err)
            res.send(err);
        res.json({
            message: 'Product Details',
            data: product
        });
    });
};
// Update Product
exports.update = function (req, res) {
    Product.findById(req.params.productID, function (err, product) {
        if (err)
            res.send(err);
            product.productName = req.body.productName;
            product.price = req.body.price;
            product.imgURL = req.body.imgURL;
//save and check errors
    product.save(function (err) {
            if (err)
                res.json(err)
            res.json({
                message: "Product Updated Successfully",
                data: product
            });
        });
    });
};
// Delete Product
exports.delete = function (req, res) {
    Product.deleteOne({
        _id: req.params.productID
    }, function (err, contact) {
        if (err)
            res.send(err)
        res.json({
            status: "success",
            message: 'Product Deleted'
        })
    })
}