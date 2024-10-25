const mongoose = require('mongoose')

const municipalitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
})

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  capital: {
    type: String,
    required: true,
    trim: true,
  },
  region: {
    type: String,
    required: true,
    enum: ['Andina', 'Caribe', 'Pacífica', 'Orinoquía', 'Amazonía', 'Insular'],
  },
  population: {
    type: Number,
    required: true,
  },
  municipalities: [municipalitySchema],
})

module.exports = mongoose.model('Department', departmentSchema)
