const express = require('express');
const ruta = express.Router();

const {
    getLibros,
    getLibroById,
    crearLibro,
    updateLibro,
    deleteLibro,
    paginator
} = require('../controllers/libro');

ruta.route('/')
    .get(getLibros)
    .post(crearLibro);

ruta.route('/:id')
    .get(getLibroById)
    .put(updateLibro)
    .delete(deleteLibro);

ruta.route('/pagination')
    .post(paginator);

module.exports = ruta;