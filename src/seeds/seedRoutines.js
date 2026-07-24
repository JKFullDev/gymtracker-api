require('dotenv').config()
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const connectDB = require('../config/db')
const Routine = require('../models/Routine')
const User = require('../models/User')
const Exercise = require('../models/Exercise')

const parseCSV = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8')
    const lines = content.split('\n').filter(line => line.trim())
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
    return lines.slice(1).map(line => {
        const values = []
        let current = ''
        let inQuotes = false
        for (const char of line) {
            if (char === '"') { inQuotes = !inQuotes }
            else if (char === ',' && !inQuotes) { values.push(current.trim()); current = '' }
            else { current += char }
        }
        values.push(current.trim())
        const obj = {}
        headers.forEach((header, i) => { obj[header] = values[i] || '' })
        return obj
    })
}

const seed = async () => {
    await connectDB()

    try {
        await Routine.deleteMany({})
        console.log('Colección routines limpiada')

        // Necesitamos el admin y los ejercicios ya insertados para asociarlos
        const admin = await User.findOne({ role: 'admin' })
        const allExercises = await Exercise.find({})

        if (!admin) {
            console.error('❌ No hay admin. Ejecuta primero seedUsers.js')
            process.exit(1)
        }

        const csvPath = path.join(__dirname, 'csv', 'routines.csv')
        const data = parseCSV(csvPath)

        const routines = data.map((row, index) => {
            // Asignamos ejercicios aleatorios a cada rutina (entre 4 y 8)
            const shuffled = allExercises.sort(() => 0.5 - Math.random())
            const count = Math.floor(Math.random() * 5) + 4
            const selectedExercises = shuffled.slice(0, count).map(e => e._id)

            return {
                name: row.name,
                description: row.description,
                userId: admin._id,
                exercises: selectedExercises,
                daysPerWeek: parseInt(row.daysPerWeek) || 3,
                goal: row.goal || 'strength',
                difficulty: row.difficulty || 'beginner',
                isPublic: true
            }
        })

        await Routine.insertMany(routines)
        console.log(`✅ ${routines.length} rutinas insertadas correctamente`)
    } catch (error) {
        console.error('Error en el seed de rutinas:', error)
    } finally {
        mongoose.connection.close()
    }
}

seed()