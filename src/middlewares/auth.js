const jwt = require('jsonwebtoken')

// Comprobamos que el token sea válido antes de dejar pasar la petición
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No tienes autorización para acceder aquí' })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' })
    }
}

// Solo dejamos pasar si el usuario tiene rol de admin
const adminMiddleware = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Necesitas permisos de administrador' })
    }
    next()
}

module.exports = { authMiddleware, adminMiddleware }