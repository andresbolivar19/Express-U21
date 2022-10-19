const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/mintic", { }, (err, res) => {
    if(err){
        console.log("Error connecting to database");
    }else{
        console.log("Connection successful");
    }
});

module.exports = mongoose;
