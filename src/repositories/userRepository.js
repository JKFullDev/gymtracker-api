const User = require('../models/User')

// Centralizamos aquí todo el acceso a datos de usuarios
const findAll = async () => User.find().select('-password').lean()

const findById = async (id) => User.findById(id).select('-password')

const findByEmail = async (email) => User.findOne({ email })

const create = async (data) => {
    const user = new User(data)
    await user.save()
    return user
}

const update = async (id, data) =>
    User.findByIdAndUpdate(id, data, { new: true }).select('-password')

const remove = async (id) => User.findByIdAndDelete(id)

module.exports = { findAll, findById, findByEmail, create, update, remove }