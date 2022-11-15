//Importa
const mongoose = require('mongoose');
//Declarado esquema
let Schema = mongoose.Schema;

// Esquema/Estructura que permite 
const storeSchema = Schema ({
    idPet: { type: String, requied: true },
    quantity: {type: Number},
    address: { type: String, requied: true },
    price: {type: Number},
    status: {type: String, requied: true },
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
const Store = mongoose.model('store', storeSchema);

module.exports = Store;
