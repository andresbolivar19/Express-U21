// Ejemplo para publicar un blog

function welcome( req, res ){

    res.status(200).send(
        {
            message: 'Welcome!!'
        });
}

module.exports = { welcome };
