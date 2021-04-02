const Product = require('../models/productModel');
const commonService = require('./commonService');

function assignProductForAdd(productDataFromPayload) {
    const product = new Product();
    product.productId = productDataFromPayload.productId ? productDataFromPayload.productId : product.productId;
    product.productName = commonService.isFieldValid(productDataFromPayload.productName) ? productDataFromPayload.productName : commonService.throwError('Invalid Product Name');
    product.productSalePrice = commonService.isFieldValid(productDataFromPayload.productSalePrice) ? productDataFromPayload.productSalePrice : commonService.throwError('Invalid Product Sale Price');
    product.productImgURL = commonService.isFieldValid(productDataFromPayload.productImgURL) ? productDataFromPayload.productImgURL : commonService.throwError('Invalid Product Img URL');
    product.productDescription = commonService.isFieldValid(productDataFromPayload.productDescription) ? productDataFromPayload.productDescription : commonService.throwError('Invalid Product Description');
    product.productColors = commonService.isFieldValid(productDataFromPayload.productColors) ? productDataFromPayload.productColors : commonService.throwError('Invalid Product Colors');
    product.productDiscount = commonService.isFieldValid(productDataFromPayload.productDiscount) ? productDataFromPayload.productDiscount : commonService.throwError('Invalid Product Discount');
    product.productRating = commonService.isFieldValid(productDataFromPayload.productRating) ? productDataFromPayload.productRating : commonService.throwError('Invalid Product Rating');
    product.productRatingCount = commonService.isFieldValid(productDataFromPayload.productRatingCount) ? productDataFromPayload.productRatingCount : commonService.throwError('Invalid Product Rating Count');
    product.productRetailPrice = commonService.isFieldValid(productDataFromPayload.productRetailPrice) ? productDataFromPayload.productRetailPrice : commonService.throwError('Invalid Product Retail Price');
    product.productSaleTagLine = commonService.isFieldValid(productDataFromPayload.productSaleTagLine) ? productDataFromPayload.productSaleTagLine : commonService.throwError('Invalid Product Sale Tag Line');
    product.productSizes = commonService.isFieldValid(productDataFromPayload.productSizes) ? productDataFromPayload.productSizes : commonService.throwError('Invalid Product Sizes');
    product.productURL = commonService.isFieldValid(productDataFromPayload.productURL) ? productDataFromPayload.productURL : commonService.throwError('Invalid Product URL');
    product.productAddDate = new Date().toUTCString();
    product.modifiedDate = product.productAddDate;
    return product;
}

function assignProductForUpdate(product, productDataFromPayload) {
    product.productId = productDataFromPayload.productId ? productDataFromPayload.productId : product.productId;
    product.productName = commonService.isFieldValid(productDataFromPayload.productName) ? productDataFromPayload.productName : product.productName;
    product.productSalePrice = commonService.isFieldValid(productDataFromPayload.productSalePrice) ? productDataFromPayload.productSalePrice : product.productSalePrice;
    product.productImgURL = commonService.isFieldValid(productDataFromPayload.productImgURL) ? productDataFromPayload.productImgURL : product.productImgURL;
    product.productDescription = commonService.isFieldValid(productDataFromPayload.productDescription) ? productDataFromPayload.productDescription : product.productDescription;
    product.productColors = commonService.isFieldValid(productDataFromPayload.productColors) ? productDataFromPayload.productColors : product.productColors;
    product.productDiscount = commonService.isFieldValid(productDataFromPayload.productDiscount) ? productDataFromPayload.productDiscount : product.productDiscount;
    product.productRating = commonService.isFieldValid(productDataFromPayload.productRating) ? productDataFromPayload.productRating : product.productRating;
    product.productRatingCount = commonService.isFieldValid(productDataFromPayload.productRatingCount) ? productDataFromPayload.productRatingCount : product.productRatingCount;
    product.productRetailPrice = commonService.isFieldValid(productDataFromPayload.productRetailPrice) ? productDataFromPayload.productRetailPrice : product.productRetailPrice;
    product.productSaleTagLine = commonService.isFieldValid(productDataFromPayload.productSaleTagLine) ? productDataFromPayload.productSaleTagLine : product.productSaleTagLine;
    product.productSizes = commonService.isFieldValid(productDataFromPayload.productSizes) ? productDataFromPayload.productSizes : product.productSizes;
    product.productURL = commonService.isFieldValid(productDataFromPayload.productURL) ? productDataFromPayload.productURL : product.productURL;
    product.modifiedDate = new Date().toUTCString();
    return product;
}

exports.getAllProduct = (req, res) => {
    Product.get(function (err, product) {
        if (err) {
            res.status(501).json({
                message: "Error in fetching products"
            });
        } else {
            res.json({
                message: "Got Product Successfully!",
                data: product
            });
        }
    });
};
exports.addProduct = (req, res) => {
    const product = assignProductForAdd(req.body);
    product.save(function (err) {
        if (err) {
            res.status(501).json({
                message: "Error in adding product"
            });
        } else {
            res.json({
                message: "New Product Added!",
                data: product
            });
        }
    });
};
exports.getProductByProductId = (req, res) => {
    Product.find({ productId: req.params.productId }, (err, product) => {
        if (err) {
            res.status(501).json({
                message: "Error in fetching product"
            });
        } else {
            res.json({
                message: 'Product Details',
                data: product
            });
        }
    });
};
exports.updateProductByProductId = (req, res) => {
    Product.find({ productId: parseInt(req.params.productId) }, (err, product) => {
        if (err) {
            res.status(501).json({
                message: "Error in fetching product"
            });
        } else {
            const updatedProduct = assignProductForUpdate(product, req.body);
            updatedProduct.save((err) => {
                if (err)
                    res.status(501).json({
                        message: "Error in saving product"
                    });
                res.json({
                    message: "Product updated successfully",
                    data: product
                });
            })
        }
    });
};
exports.deleteProductByProductId = (req, res) => {
    Product.deleteOne({ productId: req.params.productId }, (err) => {
        if (err) {
            res.status(501).json({
                message: "Error in deleting product"
            });
        } else {
            res.json({
                message: 'Product Deleted'
            })
        }
    })
};

