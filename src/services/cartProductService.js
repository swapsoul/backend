const cartProduct = require("../models/cartProductModel");

function cartPopulator(cart) {
    let totalQty=0,totalRetailPrice=0,totalSalePrice=0,totalDiscount=0;
    let cartArray = [];
    for(let item of cart) {
        totalQty+=item.productQuantity;
        totalRetailPrice+=item.productRetailPrice*item.productQuantity;
        totalSalePrice+=item.productSalePrice*item.productQuantity;
        totalDiscount+=item.productDiscount*item.productQuantity;
        delete item.__v;
        cartArray.push(item);
    }
    return {totalQty,totalRetailPrice,totalSalePrice,totalDiscount,cartArray};
}

exports.addByProductId = (req, res) => {
	let cProduct = new cartProduct({
		user: req.user._id,
		productId: req.body.productId,
		productName: req.body.productName,
		productImgURL: req.body.productImgURL,
		productColor: req.body.productColor,
		productDiscount: req.body.productDiscount,
		productRetailPrice: req.body.productRetailPrice,
		productSalePrice: req.body.productSalePrice,
		productSize: req.body.productSize,
		productURL: req.body.productURL,
		productQuantity: req.body.productQuantity,
	});

	cProduct.save((err) => {
		if (err) {
			console.log(err);
			res.status(501).json({
				message: "Error in adding product to cart",
			});
		} else {
			res.status(201).json({
				message: "Product Added to cart!",
				data: cProduct,
			});
		}
	});
};

exports.getCart = async (req, res) => {
	try {
		const cart = await cartProduct.find({ user: req.user._id });
		res.send(cartPopulator(cart));
	} catch (error) {
		console.log(error);
		res.status(501).json({
			message: "Failed to fetch cart!",
			data: [],
		});
	}
};

exports.updateQuantityByProductId = async (req, res) => {
	try {
		await cartProduct.findByIdAndUpdate({ _id: req.body._id }, { productQuantity: req.body.productQuantity });
		const cart = await cartProduct.find({ user: req.user._id });
		res.send(cartPopulator(cart));
	} catch (error) {
		console.log(error);
		res.status(501).json({
			message: "Failed to update quantity",
			data: [],
		});
	}
};

exports.deleteByProductId = async (req, res) => {
	try {
		await cartProduct.findByIdAndDelete({ _id: req.body._id });
		const cart = await cartProduct.find({ user: req.user._id });
		res.send(cartPopulator(cart));
	} catch (error) {
		console.log(error);
		res.status(501).json({
			message: "Failed to delete product from cart",
			data: [],
		});
	}
};
