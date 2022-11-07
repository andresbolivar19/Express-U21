let User = require('../models/user');
const bcrypt = require('bcrypt');

async function saveUser( req, res ){

    let myUser = new User( req.body );

    const userFound = await User.findOne({
        email: myUser.email
    });

    //Si es difenrete es por que el usuario existe
    if( userFound != null ){

        res.status(403).send({ message: 'User is already registered'});
        return;
    }else{
        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        myUser.password = await bcrypt.hash( myUser.password, salt );
    
        myUser.save( ( err, result ) => {
            if(err){
                res.status(500).send( { message: err } );
            }else{
                res.status(200).send( { message: result });
            }
        });

    }

}

function listUsers(req, res){

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
                {name: { $regex: search, $options: "i" } },
                {email: { $regex: search, $options: "i" } },
            ] 
        };
    }

    let query = User.find( param ).sort('createdAt');

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

function deleteUser(req, res){

    // Captura lo que se ingresa en la ruta
    let id = req.params.id;

    User.findByIdAndDelete( id, (err, result) =>{

        if(err){
            res.status(500).send({ message: err});
        }else{
            res.status(200).send({ message: "User deleted", "result": result });
        }
    });
}

module.exports = { saveUser, listUsers, deleteUser }
