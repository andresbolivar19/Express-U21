const jwt = require('jsonwebtoken');

function login (req, res) {
    const user = {
        username: "AFBN",
        email: "a@gmail.com"
    }
    // Al consultar la ruta envia el usuario 
    // res.send({
    //     loginUser: user
    // });

    // Guarda el objeto user y genera el token 
    jwt.sign( user, 'secretKey', (err, token ) => {
        res.send({
            token: token
        });          
    } );
}

function test (req, res ) {
    //res.send({ message: req.data });
    res.status(200).send({ testResult: req.data });
}

// Function called before acces the route
// next: to continue with proccess
function verifyToken (req, res, next ) {
    // Verifica en los headers el valor que tiene en authorization
    const requestHeader = req.headers['authorization'];

    // Valida si se envio o no el header authorization
    if (typeof requestHeader !== 'undefined'){
        // funcion split separa un texto segun el separador que se ponga, en este caso espacio
        const token = requestHeader.split(" ")[1];

        // Validacion del token, el usuario se guarda arriba en jwt.sign( user,
        jwt.verify( token, 'secretKey', (err, data ) => {

            if ( err ){
                // Si no es el token esperado, genera error de no autorizado
                res.sendStatus(403);
                }else{
                    req.data = data;
                    next();
                }
        });

        next();
    }else{
        //2 formas de enviar el estado 403
        res.sendStatus(403);
        //res.status(403).send();
    }
}

module.exports = { login, test, verifyToken };
