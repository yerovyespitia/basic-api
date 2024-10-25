const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const Department = require('./models/Department')

app.use(express.json())

app.use(
  cors({
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
  })
)

mongoose
  .connect(
    'mongodb+srv://luyeesgar:Luis12345678@cluster-basic-api.wo0qh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-basic-api'
  )
  .then(console.log('Connected to MongoDB'))
  .catch((err) => console.log(err))

app.get('/', async (req, res) => {
  try {
    const departments = await Department.find()
    res.json(departments)
  } catch (error) {
    res.status(500).json({ message: 'Error', error })
  }
})

app.post('/', async (req, res) => {
  try {
    const newDepartment = new Department(req.body)
    await newDepartment.save()
    res.status(201).json(newDepartment)
  } catch (error) {
    res.status(400).json({ message: 'Error al guardar los datos', error })
  }
})

app.listen(process.env.PORT || 4000, () => {
  console.log('Server running on port 4000')
})
