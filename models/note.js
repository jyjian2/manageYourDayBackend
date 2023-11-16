const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose.connect('connect to', url)
.then(result => {
    console.log('Connect to MongoDB')
})
.catch(error => {
    console.log('Error', error.message)
})

//define a schema for a note and the matching model
//the schema tells Mongoose how the note objects are to be stored in the database
const noteSchema = new mongoose.Schema(
    {
        // define specific validation rules for content field in the schema
        content: {
            type: String,
            minLength: 5,
            required: true
        },
        important: Boolean,
    }
)

//Change we dont's want to return the mongo versioning file __v to the frontend
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
       //remove returnedObject._id, returnedObject.__v before returning the result
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
  //Mongoose automatically name collection as the plural "notes" 
  module.exports = mongoose.model('Note', noteSchema)