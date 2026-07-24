const mongoose = require('mongoose')

// Modelo de usuario con rol para controlar el acceso
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'member'], default: 'member' },
    goal: {
        type: String,
        enum: ['strength', 'hypertrophy', 'weight-loss', 'endurance'],
        default: 'strength'
    },
    avatar: { type: String, default: '' }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)