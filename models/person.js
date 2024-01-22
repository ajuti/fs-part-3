const mongoose = require("mongoose")

mongoose.set('strictQuery', false)

const dbUrl = process.env.MONGODB_URI
console.log("connecting to: ", dbUrl)

mongoose.connect(dbUrl)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Person", personSchema)