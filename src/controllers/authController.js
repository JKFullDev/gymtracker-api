const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userRepository = require('../repositories/userRepository')

const register = async (req, res, next) => {
    try {
        const { name, email, password, goal } = req.body

        const exists = await userRepository.findByEmail(email)
        if (exists) {
            return res.status(400).json({ message: 'Ya existe una cuenta con ese email' })
        }

        // Hasheamos la contraseña antes de guardarla, nunca guardamos texto plano
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await userRepository.create({
            name, email, password: hashedPassword, goal
        })

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.status(201).json({
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role, goal: user.goal }
        })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await userRepository.findByEmail(email)
        if (!user) {
            return res.status(401).json({ message: 'Email o contraseña incorrectos' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Email o contraseña incorrectos' })
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.json({
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role, goal: user.goal }
        })
    } catch (error) {
        next(error)
    }
}

const getMe = async (req, res, next) => {
    try {
        const user = await userRepository.findById(req.user.id)
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })
        res.json(user)
    } catch (error) {
        next(error)
    }
}



const getAllUsers = async (req, res, next) => {
    try {
        const users = await userRepository.findAll()
        res.json({ data: users })
    } catch (error) {
        next(error)
    }
}


const updateMe = async (req, res, next) => {
    try {
        const { name, goal } = req.body
        const user = await userRepository.update(req.user.id, { name, goal })
        res.json({ user })
    } catch (error) {
        next(error)
    }
}

module.exports = { register, login, getMe, getAllUsers, updateMe }