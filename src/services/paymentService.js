var request = require('request');

exports.capturePayment = (req, res) => {
    request({
        method: 'POST',
        url: `https://${process.env.rzp_key}:${process.env.rzp_secret}@api.razorpay.com/v1/payments/${req.body.paymentId}/capture`,
        form: {
            amount: req.body.amount,
            currency: req.body.currency
        }
    }, function (error, response, body) {
        console.log('Status:', response.statusCode);
        console.log('Headers:', JSON.stringify(response.headers));
        console.log('Response:', body);
        res.status(response.statusCode).json({
            data: JSON.parse(body)
        });
    });
}
