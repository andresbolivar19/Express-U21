// Ejemplo para publicar un blog
const { default: mongoose } = require('mongoose');
let Post = require('../models/post');
const { search } = require('../routers/router');

function welcome( req, res ){
    res.status(200).send(
        {
            message: 'Welcome!!'
        });
}

function savePost(req, res){

    let myPost = new Post( req.body );
    //console.log('DATA req.data.username:>> ', req.data.username);
    myPost.email = req.data.email;

    myPost.save( (err, result) => {
        if(err){
            res.status(500).send({ message: err});
        }else{
            res.status(200).send({ message: result });
        }
    });
}

function listPosts(req, res){

    // let query;
    // Valida si llega uno parametro para buscar por el, o buscar todo
    // if (search ) {
    //     query = Post.findById({ title: search}).sort('content');
    // }else{
    //     query = Post.findById({}).sort('content');
    // }

    // Captura lo que se ingresa en la ruta
    let search = req.params.search;
    let param = {};
    
    // Busca solo por un campo
    // if ( search ) {
    //     param = { title: { $regex: search, $options: "i" } };
    // }

    // Busca el contenido en varios campos
    if ( search ) {
        param = { 
            $or: [
                {title: { $regex: search, $options: "i" } },
                {content: { $regex: search, $options: "i" } },
            ] 
        };
    }

    let query = Post.find( param ).sort('createdAt');

    query.exec( (err, result) => {
        if(err){
            res.status(500).send({ message: err});
        }else{
            // "( result )" envia el resultado como un Array (Forma mas facil)
            // "( {result} )" envia el resultado como un objeto, se hace el llamado "reponse.result" para convertirlo a Array
            // "( {data: result} )" envia el resultado como un objeto, se hace el llamado "reponse.data" para convertirlo a Array
            res.status(200).send( result );
        }
    });
}

function findPost(req, res){

    // Captura lo que se ingresa en la ruta
    let id = req.params.id;

    let query = Post.findById({id}).sort('createdAt');

    query.exec( (err, result) => {
        if(err){
            res.status(500).send({ message: err});
        }else{
            res.status(200).send({ result });
        }
    });
}

function updatePost(req, res){

    // Captura lo que se ingresa en la ruta
    let id = req.params.id;
    let data = req.body;
    req.body.email = req.data.email;

    Post.findByIdAndUpdate( id, data, {new: true}, (err, result) =>{

        if(err){
            res.status(500).send({ message: err});
        }else{
            res.status(200).send({ result });
        }
    });
}

function deletePost(req, res){

    // Captura lo que se ingresa en la ruta
    let id = req.params.id;

    Post.findByIdAndDelete( id, (err, result) =>{

        if(err){
            res.status(500).send({ message: err});
        }else{
            res.status(200).send({ message: "Post deleted", "result": result });
        }
    });
}

// Se exportan para que se pueden consultar desde el router.js
module.exports = { welcome, savePost, listPosts, findPost, updatePost, deletePost };
