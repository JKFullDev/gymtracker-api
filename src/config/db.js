const mongoose = require('mongoose')

// Nos conectamos a MongoDB usando la variable de entorno
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Base de datos conectada')
    } catch (error) {
        console.error('Error al conectar la base de datos:', error)
        process.exit(1)
    }
}

module.exports = connectDB