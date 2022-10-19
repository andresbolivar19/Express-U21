const express = require('express');
const bodyParser = require('body-parser');
// Llama el archivo ./routers/router.js
const router = require('./routers/router');

// Creation of Application
let app = express();

// Config of application
// Add middleware
app.use( express.json() );
app.use( express.urlencoded( { extended: true}) );
// Invoca
app.use( router );

// Config, what types of header allow
app.use( ( req, res, next ) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, XRequested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Allow', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

// Application export
module.exports = app;
