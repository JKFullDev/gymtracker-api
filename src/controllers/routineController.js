const routineRepository = require('../repositories/routineRepository')

const getAll = async (req, res, next) => {
    try {
        const routines = await routineRepository.findAll()
        res.json({ data: routines })
    } catch (error) {
        next(error)
    }
}

const getMyRoutines = async (req, res, next) => {
    try {
        // Cada usuario solo puede ver sus propias rutinas
        const routines = await routineRepository.findByUser(req.user.id)
        res.json({ data: routines })
    } catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    try {
        const routine = await routineRepository.findById(req.params.id)
        if (!routine) return res.status(404).json({ message: 'Rutina no encontrada' })
        res.json({ data: routine })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const routine = await routineRepository.create({
            ...req.body,
            userId: req.user.id
        })
        res.status(201).json({ data: routine })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const routine = await routineRepository.update(req.params.id, req.body)
        if (!routine) return res.status(404).json({ message: 'Rutina no encontrada' })
        res.json({ data: routine })
    } catch (error) {
        next(error)
    }
}

const remove = async (req, res, next) => {
    try {
        await routineRepository.remove(req.params.id)
        res.json({ message: 'Rutina eliminada correctamente' })
    } catch (error) {
        next(error)
    }
}

module.exports = { getAll, getMyRoutines, getById, create, update, remove }