const router = require('express').Router()
const { getAll, getById, create, update, remove } = require('../controllers/exerciseController')
const { authMiddleware, adminMiddleware } = require('../middlewares/auth')

// Cualquiera puede ver los ejercicios, pero solo el admin puede crear, editar o borrar
router.get('/', getAll)
router.get('/:id', getById)
router.post('/', authMiddleware, adminMiddleware, create)
router.put('/:id', authMiddleware, adminMiddleware, update)
router.delete('/:id', authMiddleware, adminMiddleware, remove)

module.exports = router