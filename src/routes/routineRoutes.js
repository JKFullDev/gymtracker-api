const router = require('express').Router()
const { getAll, getMyRoutines, getById, create, update, remove } = require('../controllers/routineController')
const { authMiddleware } = require('../middlewares/auth')

router.get('/', getAll)
router.get('/my', authMiddleware, getMyRoutines)
router.get('/:id', getById)
router.post('/', authMiddleware, create)
router.put('/:id', authMiddleware, update)
router.delete('/:id', authMiddleware, remove)

module.exports = router