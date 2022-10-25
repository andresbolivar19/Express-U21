let User = require('../models/user');
const bcrypt = require("bcrypt");

async function saveUser( req, res ){

    let myUser = new User( req.body );
    
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    myUser.password = await bcrypt.hash( myUser.password , salt);

    myUser.save( ( err, result ) => {
        if(err){
            res.status(500).send( { message: err } );
        }else{
            res.status(200).send( { message: result });
        }
    });
}

module.exports = { saveUser }
