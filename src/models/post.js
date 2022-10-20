//Importa
const mongoose = require('mongoose');
//Declarado esquema
let Schema = mongoose.Schema;

// Esquema/Estructura que permite 
const postSchema = Schema ({
    title: { type: String, requied: true },
    content: { type: String, requied: true },
    user: { type: String, requied: true },
    created: { type: Date, default: Date.now }
});

// 1er atributo, nombre que tiene en la base de datos
// 2do atributo, nombre del equema que dice la estructira de este modelo
// Table.Schema
const Post = mongoose.model('post', postSchema);

module.exports = Post;
