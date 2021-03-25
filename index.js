//index.js
const express = require('express');
const app = express();

const cors = require('cors');

const env = process.env.NODE_ENV || 'development';
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

app.use((req, res, next) => {
    console.log(env);

    // only use in development
    // console.log(req, res);
    if (env === 'development') {
        console.log(req.headers['swapsoultoken'], req.headers.host, req.body);
    } else {
        console.log("Host:", req.headers.host);
        console.log("Payload: ", req.body);
    }
    next();
});

// Welcome message
app.get('/', (req, res) => res.send('Welcome to Express'));
// Launch app to the specified port
app.listen(port, function () {
    console.log("Running Rest API on Port " + port);
})
//Import routes
const apiRoutes = require("./src/controllers/router")
//Use API routes in the App
app.use('/api', apiRoutes)

// catch all endpoint which do not match
app.use((req, res, _) => {
    res.status(404).send({
        status: 404,
        error: 'Not found'
    });
});

//error handling
app.use((err, req, res, _) => {
    console.log(err);
    let status = 501;
    if (err.toString().toLowerCase().includes('invalid')) {
        status = 400;
    }
    return res.status(status).json({ error: err.toString() });
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET , PUT , POST , DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, x-requested-with");
    next(); // Important
})


//import mongoose
const mongoose = require('mongoose');
//connect to mongoose
const dbPath = 'mongodb://swapsoul:swap%21123@cluster0-shard-00-00.bz4pl.mongodb.net:27017,cluster0-shard-00-01.bz4pl.mongodb.net:27017,cluster0-shard-00-02.bz4pl.mongodb.net:27017/test?replicaSet=atlas-ydidtn-shard-0&ssl=true&authSource=admin';
const options = { useNewUrlParser: true, useUnifiedTopology: true }
const mongo = mongoose.connect(dbPath, options);

process.on('uncaughtException', (error) => {
    console.log('Something terrible happened: ', error);
    // process.exit(1); // uncomment if you exit application
})

process.on('unhandledRejection', (error, promise) => {
    console.log(' Oh Lord! We forgot to handle a promise rejection here: ', promise);
    console.log(' The error was: ', error);
});

// process.on('exit', code => {
//     // Only synchronous calls
//     console.log(`Process exited with code: ${code}`)
// })

mongo.then(() => {
    console.log('connected');
}).catch(error => {
    console.log(error, 'error');
    process.exit(1);
});
