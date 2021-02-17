//productModel.js
var mongoose = require('mongoose');
//schema
var productSchema = mongoose.Schema({
    productID: {
        type: String,
        required: true
    },
    productName: String,
    price: Number,
    imgURL: String
});
// Export Product Model
var Product = module.exports = mongoose.model('product', productSchema);
module.exports.get = function (callback, limit) {
    Product.find(callback).limit(limit);
}