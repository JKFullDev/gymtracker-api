const mongoose = require('mongoose')

// Cada ejercicio pertenece a una categoría y tiene su nivel de dificultad
const exerciseSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    category: {
        type: String,
        enum: ['chest', 'back', 'legs', 'shoulders', 'arms', 'core', 'cardio'],
        required: true
    },
    muscleGroup: { type: String, required: true },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true
    },
    description: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    restSeconds: { type: Number, required: true },
    imageUrl: { type: String, default: '' }
}, { timestamps: true })

module.exports = mongoose.model('Exercise', exerciseSchema)