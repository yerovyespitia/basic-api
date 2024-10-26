const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { createHandler } = require('graphql-http/lib/use/express')
const { buildSchema } = require('graphql')
const Department = require('./models/Department')

const app = express()

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
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err))

const schema = buildSchema(`
    type Municipality {
      name: String!
    }
  
    type Department {
      id: ID!
      name: String!
      capital: String!
      region: String!
      population: Int!
      municipalities: [Municipality]!
    }
  
    type Query {
      departments: [Department]
      department(id: ID!): Department
    }
  
    input MunicipalityInput {
      name: String!
    }
  
    input DepartmentInput {
      name: String!
      capital: String!
      region: String!
      population: Int!
      municipalities: [MunicipalityInput]!
    }
  
    type Mutation {
      addDepartment(input: DepartmentInput): Department
    }
  `)

const root = {
  departments: async () => {
    try {
      return await Department.find()
    } catch (error) {
      throw new Error(error, 'Error')
    }
  },
  addDepartment: async ({ input }) => {
    try {
      const newDepartment = new Department(input)
      await newDepartment.save()
      return newDepartment
    } catch (error) {
      throw new Error(error, 'Error')
    }
  },
}

app.all(
  '/graphql',
  createHandler({
    schema: schema,
    rootValue: root,
  })
)

// Ver los departamentos con sus municipios en: http://localhost:4000/graphql?query=%7B%0A%20%20departments%20%7B%0A%20%20%20%20id%0A%20%20%20%20name%0A%20%20%20%20capital%0A%20%20%20%20region%0A%20%20%20%20population%0A%20%20%20%20municipalities%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A
app.listen(4000, () => {
  console.log('Running a GraphQL API server at localhost:4000/graphql')
})
