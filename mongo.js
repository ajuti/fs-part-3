const mongoose = require('mongoose')

const argv = process.argv

if (argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@phonebook.bygwqie.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model("Person", personSchema)

if (argv.length > 3) {
  const person = new Person({
    name: argv[3],
    number: argv[4],
  })

  person.save().then(result => {
    console.log(`added ${person.name} ${person.number} to phonebook`, result)
    mongoose.connection.close()
  })
} else {
  console.log("phonebook:")
  Person
    .find({})
    .then(persons => {
      persons.forEach((person) => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
}
