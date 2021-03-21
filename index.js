//index.js
const express = require('express')
const app = express();
var port = process.env.PORT || 4000;

//import body parser
const bodyParser = require('body-parser');
//configure bodyparser to hande the post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Welcome message
app.get('/', (req, res) => res.send('Welcome to Express'));
// Launch app to the specified port
app.listen(port, function() {
    console.log("Running Rest API on Port "+ port);
})
//Import routes
const apiRoutes = require("./router")
//Use API routes in the App111
app.use('/api', apiRoutes)

//import mongoose
const mongoose = require('mongoose');
const cors = require('cors');

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET , PUT , POST , DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, x-requested-with");
    next(); // Important
})



//connect to mongoose
const dbPath = 'mongodb://swapsoul:swap%21123@cluster0-shard-00-00.bz4pl.mongodb.net:27017,cluster0-shard-00-01.bz4pl.mongodb.net:27017,cluster0-shard-00-02.bz4pl.mongodb.net:27017/test?replicaSet=atlas-ydidtn-shard-0&ssl=true&authSource=admin';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(dbPath, options);
mongo.then(() => {
    console.log('connected');
}).catch(error => {
    console.log(error, 'error');
});