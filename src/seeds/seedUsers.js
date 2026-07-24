require('dotenv').config()
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const connectDB = require('../config/db')
const User = require('../models/User')

const parseCSV = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8')
    const lines = content.split('\n').filter(line => line.trim())
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
    return lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim().replace(/"/g, ''))
        const obj = {}
        headers.forEach((header, i) => { obj[header] = values[i] || '' })
        return obj
    })
}

const seed = async () => {
    await connectDB()

    try {
        await User.deleteMany({})
        console.log('Colección users limpiada')

        const csvPath = path.join(__dirname, 'csv', 'users.csv')
        const data = parseCSV(csvPath)

        // A todos los usuarios de seed les ponemos la misma contraseña por defecto
        const hashedPassword = await bcrypt.hash('Gymtracker2024!', 10)

        const users = data.map(row => ({
            name: row.name,
            email: row.email,
            password: hashedPassword,
            role: row.role || 'member',
            goal: row.goal || 'strength'
        }))

        await User.insertMany(users)
        console.log(`✅ ${users.length} usuarios insertados correctamente`)
    } catch (error) {
        console.error('Error en el seed de usuarios:', error)
    } finally {
        mongoose.connection.close()
    }
}

seed()