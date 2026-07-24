require('dotenv').config()
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const connectDB = require('../config/db')
const Exercise = require('../models/Exercise')

// Leemos el CSV y lo convertimos en objetos para insertarlos en la base de datos
const parseCSV = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8')
    const lines = content.split('\n').filter(line => line.trim())
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))

    return lines.slice(1).map(line => {
        // Manejamos comas dentro de campos entrecomillados
        const values = []
        let current = ''
        let inQuotes = false

        for (const char of line) {
            if (char === '"') {
                inQuotes = !inQuotes
            } else if (char === ',' && !inQuotes) {
                values.push(current.trim())
                current = ''
            } else {
                current += char
            }
        }
        values.push(current.trim())

        const obj = {}
        headers.forEach((header, i) => {
            obj[header] = values[i] || ''
        })
        return obj
    })
}

const seed = async () => {
    await connectDB()

    try {
        // Limpiamos la colección antes de insertar para evitar duplicados
        await Exercise.deleteMany({})
        console.log('Colección exercises limpiada')

        const csvPath = path.join(__dirname, 'csv', 'exercises.csv')
        const data = parseCSV(csvPath)

        const exercises = data.map(row => ({
            name: row.name,
            category: row.category,
            muscleGroup: row.muscleGroup,
            difficulty: row.difficulty,
            description: row.description,
            sets: parseInt(row.sets) || 3,
            reps: parseInt(row.reps) || 10,
            restSeconds: parseInt(row.restSeconds) || 60,
            imageUrl: row.imageUrl || ''
        }))

        await Exercise.insertMany(exercises)
        console.log(`✅ ${exercises.length} ejercicios insertados correctamente`)
    } catch (error) {
        console.error('Error en el seed de ejercicios:', error)
    } finally {
        mongoose.connection.close()
    }
}

seed()