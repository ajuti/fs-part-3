require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./models/person")
const errorHandler = require("./middlewares/errorHandlerMw.js")
const unknownEndpoint = require("./middlewares/unknownEndpointMw.js")

morgan.token("payload", function(req, res) { return JSON.stringify(req.body) })

const app = express()

app.use(cors())
app.use(express.static("dist"))
app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :payload"))

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get("/info", (req, res) => {
  const len = persons.length
  res.send(`Phonebook has info for ${len} ${len > 1 ? "people" : "person"}\n\n${new Date()}`)
})

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      console.log(result)
      res.status(200).json(result)
    })
    .catch(error => next(error))
})

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body
  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, {new: true})
    .then(updatedPerson => {
      console.log(updatedPerson)
      res.status(200).json(updatedPerson)
    })
    .catch(error => next(error))
})

app.post("/api/persons", (req, res) => {
  const body = req.body
  let errFlag = false
  const errors = {}

  if (!body.name) {
    errFlag = true
    errors.name = "field is missing" 
  }
  if (!body.number) {
    errFlag = true
    errors.number = "field is missing"
  }
  if (errFlag) {
    console.log("errors found")
    return res.status(400).json(errors)
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })
  
  console.log("person added")
  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
})

app.use(errorHandler)
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})