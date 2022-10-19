//Application inport
let app = require ('./app');
let connection = require('./db/connection');

const PORT = 4000;

app.listen( PORT, ()=> {
    console.log("Server is ready in port", PORT);
});
