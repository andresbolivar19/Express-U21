//Importa
const mongoose = require('mongoose');
//Declarado esquema
let Schema = mongoose.Schema;

// Esquema/Estructura que permite 
const postSchema = Schema (
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    },
    {
        // Create rows createAt and updateAt
        timestamps: true,
    }
);

// 1er atributo, nombre que tiene en la base de datos
// 2do atributo, nombre del equema que dice la estructira de este modelo
// Table.Schema
const Post = mongoose.model('user', postSchema);

module.exports = Post;
