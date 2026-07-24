const router = require('express').Router()
const { register, login, getMe, getAllUsers, updateMe } = require('../controllers/authController')
const { authMiddleware, adminMiddleware } = require('../middlewares/auth')

router.post('/register', register)
router.post('/login', login)
router.get('/me', authMiddleware, getMe)
router.get('/users', authMiddleware, adminMiddleware, getAllUsers)
router.put('/me', authMiddleware, updateMe)

module.exports = router