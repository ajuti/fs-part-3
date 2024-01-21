const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
morgan.token("payload", function(req, res) { return JSON.stringify(req.body) })

const app = express()

app.use(cors())
app.use(express.static("dist"))
app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :payload"))

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: "1"
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: "2"
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: "3"
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: "4"
  },
  {
    name: "Aapo Jutila",
    number: "12-12312312",
    id: "5"
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get("/info", (req, res) => {
  const len = persons.length
  res.send(`Phonebook has info for ${len} ${len > 1 ? "people" : "person"}\n\n${new Date()}`)
})

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id
  const person = persons.find(x => x.id == id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id
  const person = persons.find(x => x.id == id)
  if (person) {
    console.log(`Deleted record with id ${id}`, person)
    persons = persons.filter(x => x.id != (id))
    res.status(200).json(person)
  } else {
    res.status(404).end()
  }
})

app.post("/api/persons", (req, res) => {
  const id = Math.floor(Math.random() * 10000)
  const body = req.body
  let errFlag = false
  const errors = {}

  if (!body.name) {
    errFlag = true
    errors.name = "field is missing" 
  }
  if (persons.map(x => x.name).includes(body.name)) {
    errFlag = true
    errors.name = "must be unique"
  }
  if (!body.number) {
    errFlag = true
    errors.number = "field is missing"
  }
  if (errFlag) {
    console.log("errors found")
    return res.status(400).json(errors)
  }

  const person = {
    name: body.name,
    number: body.number,
    id: id
  }
  
  persons = persons.concat(person) 
  console.log("person added")
  res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})