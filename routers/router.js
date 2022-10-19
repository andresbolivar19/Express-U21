// Guarda toda la libreria de express.*
// const express = require('express');

// Guarda solo express.Router
const { Router } = require('express');
// const { welcome } = require('../controllers/postController');
const postController = require('../controllers/postController');


let router = Router();

// La creacion de las rutas similares a como se hizo en Java en los controladores
// Si le llega una peticion get, haga:
router.get('/', (req, res) => {
    //res.send('Hola mundo!');
    postController.welcome( req, res );
});

module.exports = router;
