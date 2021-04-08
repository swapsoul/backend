const mongoose = require("mongoose");
//schema
const cartProductSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "users",
		},
		productId: {
			type: String,
			required: true,
		},
		product: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "products",
		},

		productSize: {
			type: String,
			required: true,
		},
		productColor: {
			type: String,
			required: true,
		},
		productQuantity: {
			type: Number,
			required: true,
		},
	},
	{ collection: "cartProducts" }
);

const CartProduct = (module.exports = mongoose.model("cartProducts", cartProductSchema));
module.exports.get = function (callback, limit) {
	CartProduct.find(callback).limit(limit);
};
