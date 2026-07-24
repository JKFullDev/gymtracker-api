const mongoose = require('mongoose')

// Las rutinas están asociadas a un usuario y contienen ejercicios
const routineSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],
    daysPerWeek: { type: Number, required: true, min: 1, max: 7 },
    goal: {
        type: String,
        enum: ['strength', 'hypertrophy', 'weight-loss', 'endurance'],
        required: true
    },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true
    },
    isPublic: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('Routine', routineSchema)