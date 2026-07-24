// Middleware de errores global, lo usamos al final de todas las rutas
const errorHandler = (err, req, res, next) => {
    console.error(err.stack)
    const status = err.status || 500
    res.status(status).json({
        message: err.message || 'Algo salió mal en el servidor'
    })
}

module.exports = errorHandler