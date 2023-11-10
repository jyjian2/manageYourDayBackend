const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

//added "manageYourDay" to specify db name
const url = `mongodb+srv://jyjian2:K6evhSXA0pDonjk5@cluster0.2icmqht.mongodb.net/manageYourDay?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

//define a schema for a note and the matching model
//the schema tells Mongoose how the note objects are to be stored in the database
const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

//Mongoose automatically name collection as the plural "notes" 
const Note = mongoose.model('Note', noteSchema)

//created a new note object with the help of the Note model
// const note = new Note({
//     content: 'Mongoose makes things easy',
//     important: true,
// })

//put condition as a parameter of find method
Note.find({content: 'CSS is hard'}).then(result => {
    console.log(result[0])
    console.log(",")
    mongoose.connection.close()
})

//saving the object to database
//event handler closed the database connection
// note.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
// })