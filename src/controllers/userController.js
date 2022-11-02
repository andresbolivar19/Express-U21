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

module.exports = { saveUser }
