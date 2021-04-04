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
		productName: {
			type: String,
			required: true,
		},
		productImgURL: {
			type: String,
			required: true,
		},
		productColor: {
			type: String,
			required: true,
		},
		productDiscount: {
			type: Number,
			required: true,
		},
		productRetailPrice: {
			type: Number,
			required: true,
		},
		productSalePrice: {
			type: Number,
			required: true,
		},
		productSize: {
			type: String,
			required: true,
		},
		productURL: {
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
