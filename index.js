//index.js
const express = require('express')
const app = express();
const cors = require('cors');

const env = process.env.NODE_ENV || 'Development';
const port = process.env.PORT || 4000;

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
//import body parser
const bodyParser = require('body-parser');
//configure bodyparser to hande the post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

if (env === 'Development') {
    // only use in development
    console.log(env);
    app.use((req, res, next)=> {
        // console.log(req, res);
        console.log(req.headers['swapsoultoken'], req.headers.host, req.body);
        next();
    });
}

// Welcome message
app.get('/', (req, res) => res.send('Welcome to Express'));
// Launch app to the specified port
app.listen(port, function() {
    console.log("Running Rest API on Port "+ port);
})
//Import routes
const apiRoutes = require("./src/controllers/router")
//Use API routes in the App
app.use('/api', apiRoutes)

// catch all endpoint which do not match
app.use((req, res, next) => {
    res.status(404).send({
        status: 404,
        error: 'Not found'
    });
});

//error handling
app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).json({error: err.toString()});
});

//import mongoose
const mongoose = require('mongoose');
//connect to mongoose
const dbPath = 'mongodb://swapsoul:swap%21123@cluster0-shard-00-00.bz4pl.mongodb.net:27017,cluster0-shard-00-01.bz4pl.mongodb.net:27017,cluster0-shard-00-02.bz4pl.mongodb.net:27017/test?replicaSet=atlas-ydidtn-shard-0&ssl=true&authSource=admin';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(dbPath, options);
mongo.then(() => {
    console.log('connected');
}).catch(error => {
    console.log(error, 'error');
    process.exit(1);
});
