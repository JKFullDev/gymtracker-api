const Exercise = require('../models/Exercise')

const findAll = async (filters = {}) => {
    const query = {}
    // Aplicamos los filtros que nos lleguen desde el frontend
    if (filters.category) query.category = filters.category
    if (filters.difficulty) query.difficulty = filters.difficulty
    if (filters.muscleGroup) query.muscleGroup = new RegExp(filters.muscleGroup, 'i')
    return Exercise.find(query).lean()
}

const findById = async (id) => Exercise.findById(id)

const create = async (data) => {
    const exercise = new Exercise(data)
    await exercise.save()
    return exercise
}

const update = async (id, data) =>
    Exercise.findByIdAndUpdate(id, data, { new: true })

const remove = async (id) => Exercise.findByIdAndDelete(id)

module.exports = { findAll, findById, create, update, remove }