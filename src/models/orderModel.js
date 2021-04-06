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
		cart: {
			type: Object,
			required: true,
		},
	},
	{ collection: "orders" }
);

const Order = module.exports = mongoose.model("orders", orderSchema);
module.exports.get = function (callback, limit) {
	Order.find(callback).limit(limit);
};
