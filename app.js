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


// Config, what types of header allow
app.use( ( req, res, next ) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, XRequested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Allow', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

// La invocacion debe ser despues de la configuracion o si no no se envia los Header
app.use( router );

// Application export
module.exports = app;
