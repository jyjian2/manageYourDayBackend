const express = require('express');
const app = express();
const cors  = require('cors');
const mongoose = require('mongoose');
const Note = require('./models/note');
require('dotenv').config();
const baseUrl = '/api/notes'

//json-parser middleware
//middleware: functions that can be used for handling request and response objects
app.use(express.json())
//allow requests from other resources using cors middleware
app.use(cors())
//use middleware 'dist' to make express shows static contents
app.use(express.static('dist'))




app.get('/', (request, response) => {
    console.log(response)
    response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes=> {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response) => {
    //conert datatype of attribute "id" from string to Number
    const id = Number(request.params.id)
    const note = Note.findByID(id).then(note => {
        response.json(note)
    })
})

app.delete('/api/notes/:id', (request, response) => {

    const id = Number(request.params.id);


})

app.post('/api/note/new', (request, response) => {

    //The json-parser takes the JSON data of a request, 
    //transforms it into a JavaScript object 
    //and then attaches it to the body property of the request object 
    const body = request.body
    
    if (!body) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = new Note(
        {
            content: body.content,
            important: body.important,
        }
    )

    note.save().then(savedNote => {
        response.json(savedNote)
    })
})

//add middleware for catching requests to non-existent routes
const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

//bond HTTP server to listen to HTTP request sent to port 3001
const PORT = process.env.PORT
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})