//index.js
const express = require('express');
const app = express();
const cors = require('cors');

// Establish database connection
const _ = require('./src/services/dbService');

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 4000;

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

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
app.get('/', (req, res) => res.send('Welcome to Swapsoul'));

// Launch app to the specified port
app.listen(port, function () {
    console.log("Running Rest API on Port " + port);
});

//Import routes
const apiRoutes = require("./src/controllers/router");
//Use API routes in the App
app.use('/api', apiRoutes);

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

process.on('uncaughtException', (error) => {
    console.log('Something terrible happened: ', error);
    return 'Error Occurred';
    // process.exit(1); // uncomment if you exit application
})

process.on('unhandledRejection', (error, promise) => {
    console.log(' Oh Lord! We forgot to handle a promise rejection here: ', promise);
    console.log(' The error was: ', error);
    return 'Error Occurred';
});

// process.on('exit', code => {
//     // Only synchronous calls
//     console.log(`Process exited with code: ${code}`)
// })
