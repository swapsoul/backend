const mongoose = require('mongoose');
//schema
const productSchema = mongoose.Schema({
    productID: {
        type: String,
        required: true
    },
    productName: String,
    productDescription: String,
    productImgURL: String,
    productColors: Array,
    productDiscount: Number,
    productRating: Number,
    productRatingCount: Number,
    productRetailPrice: Number,
    productSalePrice: Number,
    productSaleTagLine: String,
    productSizes: Array,
    productURL: String,
    productAddDate: String
}, {collection: 'products'}); // Give specific collection name, otherwise plural name will be used
// Export Product Model
const Product = module.exports = mongoose.model('products', productSchema);
module.exports.get = function (callback, limit) {
    Product.find(callback).limit(limit);
}
