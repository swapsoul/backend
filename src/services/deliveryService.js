const Delivery = require('../models/deliveryModel');

exports.getAllPincode = (req, res) => {
    Delivery.find((err, document) => {
        if (err) {
            res.status(501).json({
                message: 'Error while fetching pincodes'
            });
        } else {
            res.json({
                message: 'Pincodes fetched successfully',
                data: document
            })
        }
    });
};

exports.getDeliveryStatus = (req, res) => {
    Delivery.find({ pin: req.params.pincode },(err, document) => {
        if (err) {
            res.status(501).json({
                message: 'Error while fetching pincodes'
            });
        } else {
            if (document.length > 0) {
                res.json({
                    message: 'Delivery is available',
                    data: document
                });
            } else {
                res.status(427).json({
                    message: 'Delivery is not available'
                })
            }
        }
    });
};
