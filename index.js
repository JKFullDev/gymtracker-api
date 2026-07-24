require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./src/config/db')
const errorHandler = require('./src/middlewares/error')

const authRoutes = require('./src/routes/authRoutes')
const exerciseRoutes = require('./src/routes/exerciseRoutes')
const routineRoutes = require('./src/routes/routineRoutes')

const app = express()
const PORT = process.env.PORT || 3000

connectDB()

app.use(cors())
app.use(express.json())

// Montamos todas las rutas bajo /api
app.use('/api/auth', authRoutes)
app.use('/api/exercises', exerciseRoutes)
app.use('/api/routines', routineRoutes)

app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' })
})

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})