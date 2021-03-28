//import mongoose
const mongoose = require('mongoose');

//connect to mongoose
const dbPath = 'mongodb://swapsoul:swap%21123@cluster0-shard-00-00.bz4pl.mongodb.net:27017,cluster0-shard-00-01.bz4pl.mongodb.net:27017,cluster0-shard-00-02.bz4pl.mongodb.net:27017/test?replicaSet=atlas-ydidtn-shard-0&ssl=true&authSource=admin';
const options = { useNewUrlParser: true, useUnifiedTopology: true };
const mongo = mongoose.connect(dbPath, options);

// Connect to MongoDB
mongo.then(() => {
    console.log('connected');
}).catch((error) => {
    console.log(error, 'error');
    process.exit(1);
});

exports.mongo = mongo;
