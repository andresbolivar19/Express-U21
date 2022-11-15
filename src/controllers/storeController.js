let Store = require('../models/store');

// function welcome( req, res ){
//     res.status(200).send(
//         {
//             message: 'Welcome!!'
//         });
// }

function saveStore( req, res ){

    let myStore = new Store( req.body );
    //console.log('DATA req.data.username:>> ', req.data.username);
    myStore.user = req.payload.email;

    myStore.save( (err, result) => {
        if(err){
            res.status(500).send({ error: err});
        }else{
            res.status(200).send({ message: "Store created", result: result });
        }
    });
}

function listStores(req, res){

    // let query;
    // Valida si llega uno parametro para buscar por el, o buscar todo
    // if (search ) {
    //     query = Store.findById({ title: search}).sort('content');
    // }else{
    //     query = Store.findById({}).sort('content');
    // }

    // Captura lo que se ingresa en la ruta
    let search = req.params.search;
    let queryParam = {};
    
    // Busca solo por un campo
    // if ( search ) {
    //     param = { title: { $regex: search, $options: "i" } };
    // }

    // Busca el contenido en varios campos
    if ( search ) {
        queryParam = { 
            $or: [
                { title: { $regex: search, $options: "i" } },
                { content: { $regex: search, $options: "i" } },
                { user: { $regex: search, $options: "i"  } }
            ] 
        };
    }

    query = Store.find( queryParam ).sort('createdAt');

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

function findStore(req, res){

    // Captura lo que se ingresa en la ruta
    let id = req.params.id;
    let query = Store.findById(id);

    query.exec( (err, result) => {
        if(err){
            res.status(500).send({ message: err});
        }else{
            res.status(200).send( result );
        }
    });
}

function updateStore(req, res){

    // Captura lo que se ingresa en la ruta
    let id = req.params.id;
    let data = req.body;
    data.user = req.payload.email;

    Store.findByIdAndUpdate( id, data, {new: true}, (err, result) =>{

        if(err){
            res.status(500).send({ message: err});
        }else{
            res.status(200).send( { message: "Store updated", result: result });
        }
    });
}

function deleteStore(req, res){

    // Captura lo que se ingresa en la ruta
    let id = req.params.id;

    Store.findByIdAndDelete( id, (err, result) =>{

        if(err){
            res.status(500).send({ message: err});
        }else{
            res.status(200).send( { message: "Store deleted", result: result } );
        }
    });
}

// Se exportan para que se pueden consultar desde el router.js
module.exports = { saveStore, listStores, findStore, updateStore, deleteStore };
