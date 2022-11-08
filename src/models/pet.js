//Importa
const mongoose = require('mongoose');
//Declarado esquema
let Schema = mongoose.Schema;

// Esquema/Estructura que permite 
const petSchema = Schema ({
    category: { type: String, requied: true },
    name: { type: String, requied: true },
    photoUrls: {type: String},
    status: {type: String},
    user: { type: String, requied: true }
    },
    {
        // Create rows createAt and updateAt
        timestamps: true
    }
);

// 1er atributo, nombre que tiene en la base de datos
// 2do atributo, nombre del equema que dice la estructira de este modelo
// Table.Schema
const Pet = mongoose.model('pet', petSchema);

module.exports = Pet;
