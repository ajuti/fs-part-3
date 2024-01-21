const express = require("express")
const app = express()

app.use(express.json())

const persons = [
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
  const id = req.params.id - 1
  if (persons[id]) {
    res.json(persons[id])
  } else {
    res.status(404).end()
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})