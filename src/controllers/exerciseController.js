const exerciseRepository = require('../repositories/exerciseRepository')

const getAll = async (req, res, next) => {
    try {
        // Pasamos los query params como filtros opcionales
        const exercises = await exerciseRepository.findAll(req.query)
        res.json({ data: exercises })
    } catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    try {
        const exercise = await exerciseRepository.findById(req.params.id)
        if (!exercise) return res.status(404).json({ message: 'Ejercicio no encontrado' })
        res.json({ data: exercise })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const exercise = await exerciseRepository.create(req.body)
        res.status(201).json({ data: exercise })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const exercise = await exerciseRepository.update(req.params.id, req.body)
        if (!exercise) return res.status(404).json({ message: 'Ejercicio no encontrado' })
        res.json({ data: exercise })
    } catch (error) {
        next(error)
    }
}

const remove = async (req, res, next) => {
    try {
        const exercise = await exerciseRepository.remove(req.params.id)
        if (!exercise) return res.status(404).json({ message: 'Ejercicio no encontrado' })
        res.json({ message: 'Ejercicio eliminado correctamente' })
    } catch (error) {
        next(error)
    }
}

module.exports = { getAll, getById, create, update, remove }