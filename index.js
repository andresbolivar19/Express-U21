//Application inport
let app = require ('./app');
const PORT = 4000;

app.listen( PORT, ()=> {
    console.log("Server is ready in port", PORT);
});
