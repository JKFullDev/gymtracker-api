const Routine = require('../models/Routine')

const findAll = async () =>
    Routine.find({ isPublic: true })
        .populate('userId', 'name email')
        .populate('exercises')
        .lean()

const findByUser = async (userId) =>
    Routine.find({ userId })
        .populate('exercises')
        .lean()

const findById = async (id) =>
    Routine.findById(id)
        .populate('userId', 'name email')
        .populate('exercises')

const create = async (data) => {
    const routine = new Routine(data)
    await routine.save()
    return routine
}

const update = async (id, data) =>
    Routine.findByIdAndUpdate(id, data, { new: true }).populate('exercises')

const remove = async (id) => Routine.findByIdAndDelete(id)

module.exports = { findAll, findByUser, findById, create, update, remove }