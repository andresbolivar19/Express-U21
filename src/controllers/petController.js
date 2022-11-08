// Ejemplo para publicar un blog
const { default: mongoose } = require('mongoose');
let Pet = require('../models/pet');
const { search } = require('../routers/router');

function welcome( req, res ){
    res.status(200).send(
        {
            message: 'Welcome!!'
        });
}

function savePet(req, res){

    let myPet = new Pet( req.body );
    //console.log('DATA req.data.username:>> ', req.data.username);
    myPet.email = req.data.email;

    myPet.save( (err, result) => {
        if(err){
            res.status(500).send({ message: err});
        }else{
            res.status(200).send({ message: result });
        }
    });
}

function listPets(req, res){

    // let query;
    // Valida si llega uno parametro para buscar por el, o buscar todo
    // if (search ) {
    //     query = Pet.findById({ title: search}).sort('content');
    // }else{
    //     query = Pet.findById({}).sort('content');
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
                {category: { $regex: search, $options: "i" } },
                {name: { $regex: search, $options: "i" } },
                {status: { $regex: search, $options: "i" } },
                {user: { $regex: search, $options: "i" } },
            ] 
        };
    }

    let query = Pet.find( param ).sort('createdAt');

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

function findPet(req, res){

    // Captura lo que se ingresa en la ruta
    let id = req.params.id;

    let query = Pet.findById({id}).sort('createdAt');

    query.exec( (err, result) => {
        if(err){
            res.status(500).send({ message: err});
        }else{
            res.status(200).send({ result });
        }
    });
}

function updatePet(req, res){

    // Captura lo que se ingresa en la ruta
    let id = req.params.id;
    let data = req.body;
    req.body.email = req.data.email;

    Pet.findByIdAndUpdate( id, data, {new: true}, (err, result) =>{

        if(err){
            res.status(500).send({ message: err});
        }else{
            res.status(200).send({ result });
        }
    });
}

function deletePet(req, res){

    // Captura lo que se ingresa en la ruta
    let id = req.params.id;

    Pet.findByIdAndDelete( id, (err, result) =>{

        if(err){
            res.status(500).send({ message: err});
        }else{
            res.status(200).send({ message: "Pet deleted", "result": result });
        }
    });
}

// Se exportan para que se pueden consultar desde el router.js
module.exports = { welcome, savePet, listPets, findPet, updatePet, deletePet };
