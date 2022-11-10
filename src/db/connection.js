const mongoose = require('mongoose');

// Local connnection
// mongoose.connect("mongodb://localhost:27017/mintic", { }, (err, res) => {
//     if(err){
//         console.log("Error connecting to database");
//     }else{
//         console.log("Connection successful");
//     }
// });

// Server conection
mongoose.connect("mongodb+srv://${{secrets.BD_USER}}:${{secrets.BD_PASS}}@cluster0.0ousshc.mongodb.net/mintic?retryWrites=true&w=majority", { }, (err, res) => {
    if(err){
        console.log("Error connecting to database");
    }else{
        console.log("Connection successful");
    }
});

module.exports = mongoose;
