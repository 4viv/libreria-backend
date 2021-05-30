const Autor = require('../models/Autor');

exports.crearAutor = async (req, res, next) => {
    
    try {
        const autorData = await Autor.create(req.body);

        res.status(200).json({
            status: 200,
            data: autorData,
        });
    } catch (error) {
        res.status(400).json({status: 400, mensaje: error})
    }
}

exports.getAutor = async (req, res, next) => {
    try {
        const autorLista = await Autor.find();
        res.status(200).json(autorLista);
    } catch (error) {
        res.status(400).json({status: 400, mensaje: error})
    }
}

exports.getAutorById = async (req, res, next) => {
    try {
        const autor = await Autor.findById(req.params.id);
        res.status(200).json(autor);
    } catch (error) {
        res.status(400).json({status: 400, mensaje: error})
    }
}

exports.updateAutor = async (req, res, next) => {
    try {
        const autor = await Autor.findByIdAndUpdate(req.params.id, req.data);

        if (!autor) {
            return res.status(400).json({status: 400});
        }

        res.status(200).json({status: 200, data: autor});
    } catch (error) {
        res.status(400).json({status: 400, mensaje: error})
    }
}

exports.deleteAutor = async (req, res, next) => {
    try {
        const autor = await Autor.findByIdAndDelete(req.params.id);

        if (!autor) {
            return res.status(400).json({status: 400});
        }

        res.status(200).json({status: 200});
    } catch (error) {
        res.status(400).json({status: 400, mensaje: error})
    }
}