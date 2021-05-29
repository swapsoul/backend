var request = require('request');
var ObjectId = require('mongodb').ObjectID;
    
exports.capturePayment = async (req, res) => {
    const MongoClient = require('mongodb').MongoClient;
    var db_url = "mongodb://swapsoul:swap%21123@cluster0-shard-00-00.bz4pl.mongodb.net:27017,cluster0-shard-00-01.bz4pl.mongodb.net:27017,cluster0-shard-00-02.bz4pl.mongodb.net:27017/test?replicaSet=atlas-ydidtn-shard-0&ssl=true&authSource=admin";
    const client = await MongoClient.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true });
    request({
        method: 'POST',
        url: `https://${process.env.rzp_key}:${process.env.rzp_secret}@api.razorpay.com/v1/payments/${req.body.paymentId}/capture`,
        form: {
            amount: req.body.amount,
            currency: req.body.currency
        }
    }, function (error, response, body) {
        // console.log('Status:', response.statusCode);
        // console.log('Headers:', JSON.stringify(response.headers));
        // console.log('Response:', body);
        if (!error) {
            let Orders = client.db('test').collection('orders');
            let Cart = client.db('test').collection('cartProducts');
            Orders.updateOne({
                userEmail: req.body.userEmail,
                paymentID: req.body.paymentId
            }, {
                $set: {
                    captureData: JSON.parse(body),
                    userCart: req.body.userCart,
                    userOrders: req.body.userOrders
                }
            }, { upsert: true });
            let cartUserID = req.user._id;
            Cart.deleteMany({ "user": cartUserID });
        }
        res.status(response.statusCode).json({
            data: JSON.parse(body)
        });
    });
}
