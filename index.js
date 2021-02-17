//index.js
let express = require('express')
let app = express();
var port = process.env.PORT || 4000;

//import body parser
let bodyParser = require('body-parser');
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
let apiRoutes = require("./router")
//Use API routes in the App
app.use('/api', apiRoutes)

//import mongoose
let mongoose = require('mongoose');

//connect to mongoose
const dbPath = 'mongodb://swapsoul:swap%21123@cluster0-shard-00-00.bz4pl.mongodb.net:27017,cluster0-shard-00-01.bz4pl.mongodb.net:27017,cluster0-shard-00-02.bz4pl.mongodb.net:27017/test?replicaSet=atlas-ydidtn-shard-0&ssl=true&authSource=admin';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(dbPath, options);
mongo.then(() => {
    console.log('connected');
}, error => {
    console.log(error, 'error');
})