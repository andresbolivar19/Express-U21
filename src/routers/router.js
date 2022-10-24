// Guarda toda la libreria de express.*
// const express = require('express');

// Guarda solo express.Router
const { Router } = require('express');
// const { welcome } = require('../controllers/postController');
const postController = require('../controllers/postController');
const swaggerUI = require('swagger-ui-express')
const swaggerDocs = require('./swagger.json')

const authController = require ('../controllers/authController');


let router = Router();

// La creacion de las rutas similares a como se hizo en Java en los controladores
// Si le llega una peticion get, haga:
// router.get('/', (req, res) => {
//     //res.send('Hola mundo!');
//     postController.welcome( req, res );
// });

// Simplifica el proceso anterior
router.get('/welcome', postController.welcome );

router.post('/post/save', authController.verifyToken, postController.savePost );

// Busca según un query que se configure
// El signo "?" es para que sea opcional
//router.post('/post/list/:search?', postController.listPosts );
router.get('/post/list/:search?', postController.listPosts );

router.get('/post/:id', postController.findPost );
router.put('/post/:id', postController.updatePost );
router.delete('/post/:id', postController.deletePost );

router.use('/api-docs', swaggerUI.serve);
router.get('/api-docs', swaggerUI.setup(swaggerDocs));

// Authentication
router.post('/auth/login', authController.login );
// Se agrega authController.verifyToken para que verifique token antes de entrar a la ruta
router.post('/auth/test', authController.verifyToken, authController.test );

module.exports = router;
