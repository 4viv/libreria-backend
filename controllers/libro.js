exports.getLibros = (req, res, next) => {
    res.status(200).json({status: 200, mensaje: 'Se proceso exitosamente'});
};

exports.getLibroById = (req, res, next) => {
    res.status(200).json({status: 200, mensaje: 'Se devuelbe libro por id'});
};

exports.crearLibro = (req, res, next) => {
    res.status(200).json({status: 200, mensaje: 'Se Agrego nuevo libro'});
};

exports.updateLibro = (req, res, next) => {
    res.status(200).json({status: 200, mensaje: 'Se modifico el libro'});
};

exports.deleteLibro = (req, res, next) => {
    res.status(200).json({status: 200, mensaje: 'Se elimino el libro'});
};

exports.paginator = async (req, res, next) => {
    try {
        const sort = req.body.sort;
        const sortDirection = req.body.sortDirection;
        const page = parseInt(req.body.page);
        const pageSize = parseInt(req.body.pageSize);

        let filterValor = '';
        let filterPropiedad ='';
        let libros = [];

        let totalRows = 0;
        // filterValue = { valor: "", propiedad: ""};
        if (req.body.filterValue) {
            filterValor = req.body.filterValue.valor;
            filterPropiedad = req.body.filterValue.propiedad;

            libros = await libro.find({
                [filterPropiedad]: new RegExp(filterValor, "i")
            })
            .sort({[sort]: sortDirection})
            .skip( (page-1) * pageSize )
            .limit(pageSize);

            totalRows = await libro.find({
                [filterPropiedad]: new RegExp(filterValor, "i")
            }).count();
            
        } else {
            libros = await libro.find()
                                .sort({[sort]: sortDirection})
                                .skip( (page-1) * pageSize )
                                .limit(pageSize);

            totalRows = await libro.find().count()
        }

        const pagesQuantity = Math.ceil(totalRows / pageSize);

        res.status(200).json({
            status: 200,
            pageSize,
            page,
            sort,
            sortDirection,
            pagesQuantity,
            totalRows,
            data: libros
        })
    } catch (error) {
        res.status(400).json({status: 400, mensaje: error})
    }
}
