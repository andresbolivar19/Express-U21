// Guarda toda la libreria de express.*
// const express = require('express');

// Guarda solo express.Router
const { Router } = require('express');
// const { welcome } = require('../controllers/postController');
const postController = require('../controllers/postController');
const swaggerUI = require('swagger-ui-express')
const swaggerDocs = require('./swagger.json')

const authController = require ('../controllers/authController');
const userController = require ('../controllers/userController');
const petController = require('../controllers/petController');
const storeController = require('../controllers/storeController');

let router = Router();

// La creacion de las rutas similares a como se hizo en Java en los controladores
// Si le llega una peticion get, haga:
// router.get('/', (req, res) => {
//     //res.send('Hola mundo!');
//     postController.welcome( req, res );
// });

// Simplifica el proceso anterior
//router.get('/welcome', postController.welcome );



// Busca según un query que se configure
// El signo "?" es para que sea opcional
//router.post('/post/list/:search?', postController.listPosts );
router.get('/post/list/:search?', postController.listPosts );
router.get('/post/:id', postController.findPost );
router.post('/post/save', authController.verifyToken, postController.savePost );
router.put('/post/:id', authController.verifyToken,  postController.updatePost );
router.delete('/post/:id', authController.verifyToken, postController.deletePost );

router.use('/api-docs', swaggerUI.serve);
router.get('/api-docs', swaggerUI.setup(swaggerDocs));

// Authentication
router.post('/auth/login', authController.login );
// Se agrega authController.verifyToken para que verifique token antes de entrar a la ruta
router.post('/auth/verify', authController.verifyToken, authController.profile );

// Users
router.get('/user/list/:search?', userController.listUsers );
router.post('/user/save', userController.saveUser );
router.delete('/user/:id', authController.verifyToken, userController.deleteUser );

// Pets
router.post('/pet/save', authController.verifyToken, petController.savePet );
router.get('/pet/list/:search?', petController.listPets );
router.get('/pet/:id', petController.findPet );
router.put('/pet/:id', authController.verifyToken, petController.updatePet );
router.delete('/pet/:id', authController.verifyToken, petController.deletePet );

// Stores
router.post('/store/save', authController.verifyToken, storeController.saveStore );
router.get('/store/list/:search?', storeController.listStores );
router.get('/store/:id', storeController.findStore );
router.put('/store/:id', authController.verifyToken, storeController.updateStore );
router.delete('/store/:id', authController.verifyToken, storeController.deleteStore );

module.exports = router;
