const Order = require("../models/orderModel");
const Cart = require("../models/cartProductModel");

function orderPopulator(order) {
	let totalQty = 0,
		totalRetailPrice = 0,
		totalSalePrice = 0,
		totalDiscount = 0;
	let orderArray = [];
	for (let item of order.cart) {
		totalQty += item.productQuantity;
		totalRetailPrice += item.product.productRetailPrice * item.productQuantity;
		totalSalePrice += item.product.productSalePrice * item.productQuantity;
		totalDiscount += item.product.productDiscount * item.productQuantity;
		try {
			delete item.__v;
		} catch (error) {
			console.log(error);
		}
		orderArray.push(item);
	}

	order.totalQty = totalQty;
	order.totalRetailPrice = totalRetailPrice;
	order.totalSalePrice = totalSalePrice;
	order.totalDiscount = totalDiscount;
	return order;
}

exports.createOrder = async (req, res) => {
	try {
		let order = new Order({
			user: req.user._id,
			userEmail: req.user.userEmail,
			phoneNumber: req.user.phoneNumber,
			userName: req.body.userName,
			address: req.body.address,
			pincode: req.body.pincode,
			paymentId: req.body.paymentId,
			orderStatus: "Order in Process",
			cart: req.body.cart,
		});
		console.log(order);

		let writeOrder = await order.save();
		await Cart.deleteMany({ user: req.user._id });
		res.status(201).json({
			message: "Order placed",
			data: writeOrder,
		});
	} catch (error) {
		console.log(error);
		res.status(501).json({
			message: "Failed to place order, please contact us for refund",
		});
	}
};

exports.createInstantOrder = async (req, res) => {
	try {
		let order = new Order({
			user: req.user._id,
			userEmail: req.user.userEmail,
			phoneNumber: req.user.phoneNumber,
			userName: req.body.userName,
			address: req.body.address,
			pincode: req.body.pincode,
			paymentId: req.body.paymentId,
			orderStatus: "Order in Process",
			cart: req.body.cart,
		});
		console.log(order);

		let writeOrder = await order.save();
		res.status(201).json({
			message: "Order placed",
			data: writeOrder,
		});
	} catch (error) {
		console.log(error);
		res.status(501).json({
			message: "Failed to place order, please contact us for refund",
		});
	}
};

exports.modifyOrderStatus = async (req, res) => {
	try {
		await Order.findByIdAndUpdate({ _id: req.body._id }, { orderStatus: req.body.orderStatus });
		let orderStatus = await Order.find({ _id: req.body._id });
		res.send(orderStatus);
	} catch (error) {
		console.log(error);
		res.status(501).json({
			message: "Failed to update order status",
		});
	}
};

exports.getOrdersByUserId = async (req, res) => {
	try {
		let orders = await Order.find({ user: req.user._id }).populate({
			path: "cart",
			populate: { path: "product" },
		});
		let modifiedOrder = [];
		for (let order of orders) {
			let clone = JSON.parse(JSON.stringify(order));
			clone["orderId"] = order._id;
			modifiedOrder.push(clone);
		}
		try {
			orderPopulator(modifiedOrder[0]);
		} catch (error) {
			console.log(error);
		}
		console.log(modifiedOrder);
		res.send(modifiedOrder);
	} catch (error) {
		console.log(error);
		res.status(501).json({
			message: "Failed to fetch orders",
		});
	}
};

exports.getAllOrders = async (req, res) => {
	try {
		let orders = await Order.find({})
			.sort({ userEmail: 1 })
			.populate({
				path: "cart",
				populate: { path: "product" },
			});
		let modifiedOrder = [];
		for (let order of orders) {
			let clone = JSON.parse(JSON.stringify(order));
			clone["orderId"] = order._id;
			modifiedOrder.push(clone);
		}
		try {
			orderPopulator(modifiedOrder[0]);
		} catch (error) {
			console.log(error);
		}
		res.send(modifiedOrder);
	} catch (error) {
		console.log(error);
		res.status(501).json({
			message: "Failed to fetch all the orders",
		});
	}
};
