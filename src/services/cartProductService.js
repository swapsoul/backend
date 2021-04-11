const cartProduct = require('../models/cartProductModel');

function cartPopulator(cart) {
    let totalQty = 0,
        totalRetailPrice = 0,
        totalSalePrice = 0,
        totalDiscount = 0;
    let cartArray = [];
    for (let item of cart) {
        totalQty += item.productQuantity;
        totalRetailPrice += item.product.productRetailPrice * item.productQuantity;
        totalSalePrice += item.product.productSalePrice * item.productQuantity;
        totalDiscount += item.product.productDiscount * item.productQuantity;
        try {
            delete item.__v;
        } catch (error) {
            console.log(error);
        }
        cartArray.push(item);
    }
    return { totalQty, totalRetailPrice, totalSalePrice, totalDiscount, cartArray };
}

exports.addByProductId = async (req, res) => {
    try {
        const cart = await cartProduct.find({ user: req.user._id, productId: req.body.productId });

        if (cart.length) {
            console.log('item present');
            if (cart[0].productColor != req.body.productColor || cart[0].productSize != req.body.productSize) {
                console.log('proceed to create');
            } else {
                res.status(200).json({
                    message: 'Product already in cart',
                });
                return;
            }
        } else {
            console.log('proceed to create');
        }
        // return;
    } catch (error) {
        console.log('-------' + error + '--------');
        res.status(501).json({
            message: 'Error in adding product to cart',
        });
        return;
    }

    let cProduct = new cartProduct({
        user: req.user._id,
        productId: req.body.productId,
        product: req.body.product,
        productColor: req.body.productColor,
        productSize: req.body.productSize,
        productQuantity: req.body.productQuantity,
    });

    cProduct.save((err) => {
        if (err) {
            if (err.toString().toLowerCase().includes('invalid'))
                res.status(501).json({
                    message: 'Quantity needs to be positive',
                });
            else
                res.status(501).json({
                    message: 'Error in adding product to cart',
                });
        } else {
            res.status(201).json({
                message: 'Product Added to cart!',
                data: cProduct,
            });
        }
    });
};

exports.getCart = async (req, res) => {
    try {
        const cart = await cartProduct.find({ user: req.user._id }).populate('product');
        res.send(cartPopulator(cart));
    } catch (error) {
        console.log(error);
        res.status(501).json({
            message: 'Failed to fetch cart!',
            data: [],
        });
    }
};

exports.updateQuantityByProductId = async (req, res) => {
    try {
        await cartProduct.findByIdAndUpdate({
            _id: req.body._id,
            user: req.user._id
        }, { productQuantity: req.body.productQuantity }, { new: true }, async (err, document) => {
            if (document) {
                // const cart = await cartProduct.find({ user: req.user._id }).populate('product');
                res.send({
                    message: 'Quantity updated.'
                });
            } else {
                res.status(404).json({
                    message: 'Cart item not found.',
                });
            }
        });
    } catch (error) {
        console.log(error);
        if (error.toString().toLowerCase().includes('invalid'))
            res.status(501).json({
                message: 'Quantity needs to be positive',
            });
        else
            res.status(501).json({
                message: 'Failed to update quantity',
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
            message: 'Failed to delete product from cart',
            data: [],
        });
    }
};
