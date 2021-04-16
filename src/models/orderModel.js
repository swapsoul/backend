const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "users",
		},
		userEmail: {
			type: String,
			required: true,
		},
		userName: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: Number,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		pincode: {
			type: Number,
			required: true,
		},
		paymentId: { type: String, required: true },
		orderStatus: {
			type: String,
			required: true,
		},
		cart: [
			{
				productId: String,
				user: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: "users",
				},
				product: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: "products",
				},
				productColor: String,
				productSize: String,
				productQuantity: Number,
			},
		],
	},
	{ collection: "orders" }
);

const Order = (module.exports = mongoose.model("orders", orderSchema));
module.exports.get = function (callback, limit) {
	Order.find(callback).limit(limit);
};
