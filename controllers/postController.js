// Ejemplo para publicar un blog
let Post = require('../models/post');

function welcome( req, res ){

    res.status(200).send(
        {
            message: 'Welcome!!'
        });
}

function savePost(req, res){
    let myPost = new Post( req.body );

    // Para buscar todo
    Post.find({}).sort('title');

    myPost.save( (err, result) => {
        if(err){
            res.status(500).send({ message: err});
        }else{
            res.status(200).send({ message: result });
        }

    });

}

// Se exportan para que se pueden consultar desde el router.js
module.exports = { 
    welcome,
    savePost 
};
