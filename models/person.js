const mongoose = require("mongoose")

mongoose.set('strictQuery', false)

const dbUrl = process.env.MONGODB_URI
console.log("connecting to: ", dbUrl)

mongoose.connect(dbUrl)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, "Name is required"]
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: (v) => {
        return /^[0-9]{2,3}-[0-9]+$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number`
    },
    required: [true, 'Phone number is required']
  }
})

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Person", personSchema)