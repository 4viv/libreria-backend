const mongoose = require('mongoose');

const conectDatabase = async () => {
    const conexion = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

    console.log('MongoDB Servidor atlas conectado', conexion.connection.host)
}

module.exports = conectDatabase;