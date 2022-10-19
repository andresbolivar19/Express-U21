//Importa
const mongoose = require('mongoose');
//Declarado esquema
let Schema = mongose.Schema;

// Esquema/Estructura que permite 
const postSchema = Schema ({
    title: String,
    content: String,
    user: String,
    created: { type: Date, default: Date.now }
});

// 1er atributo, nombre que tiene en la base de datos
// 2do atributo, nombre del equema que dice la estructira de este modelo
// Table.Schema
const Post = mongoose.model('post', postSchema);

module.exports = Post;
