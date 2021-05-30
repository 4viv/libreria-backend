const dotenv = require('dotenv');
const express = require('express');
// para implementar los middleware
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('./middleware/error');
const conectDatabase = require('./config/db')
// declaramos ruta de archivo de variables
dotenv.config({path: './config/config.env'});
conectDatabase();

const libro = require('./router/libro');
const autor = require('./router/autor');


const app = express();
app.use(express.json()) // prosesa los 
app.use(cors());


/* Creando un middleware
const loger = (req, res, next) => {
    console.log('Este request esta pasando por el middleware');
    next();
}
// Ejecutamos middleware
app.use(loger); */

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));    
}

app.use('/api/libreriaAutor', autor);
app.use('/api/libro', libro);
app.use(errorHandler);


//asignamos el valor de la variable port y si no tiene valor asigna el 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log('Servidor ejecutandose en modo:', process.env.NODE_ENV));

process.on('unhandledRejection', (err, promise) => {
    console.log('Errores', err.message);
    server.close(() => process.exit(1));
})