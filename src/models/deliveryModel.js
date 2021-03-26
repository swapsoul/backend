const mongoose = require('mongoose');
//schema
const deliverySchema = mongoose.Schema({
    COD: String,
    Repl: String,
    city: String,
    destinationPincodeStatus: String,
    pin: Number,
    prepaid: String,
    reversePickup: String,
    state: String
}, {collection: 'b2c_delivery_pincodes'}); // Give specific collection name, otherwise plural name will be used
// Export Product Model
const Delivery = module.exports = mongoose.model('b2c_delivery_pincodes', deliverySchema);
module.exports.get = function (callback, limit) {
    Delivery.find(callback).limit(limit);
}
