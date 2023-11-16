require('dotenv').config();
const express = require('express');
const app = express();
const cors  = require('cors');
const Note = require('./models/note')
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

app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
    .then(note => {
        if (note) {
            response.json(note)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
    .then(note => {
        if (note) {
            response.json(note)
        } else {
            response.status(204).end()
        }
    })
    //execution will continue to error hanlder middleware if there's error
    .catch(error => next(error))


})

app.post('/api/notes', (request, response, next) => {
    const body = request.body

    const note = new Note({
        content: body.content,
        impoertant: body.important || false,
    })

    note.save().then(savedNote => {
        response.json(savedNote)
    })
    .catch(error => next(error))
})

app.put('api/notes/:id', (request, response, next) => {
    const {content, important} = request.body

    const note = {
        content: body.content,
        important: body.important,
    }

    Note.findByIdAndUpdate(
        request.params.id,
        {content, important},
         {new: true, runValidators: true, context: 'query'})
    .then(updatedNote => {
        response.json(updatedNote)
    })
    .catch(error => next(error))
})

//add middleware for catching requests to non-existent routes
const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    }

    next(error)
}

//handler of requests with result to errors
app.use(errorHandler)

//bond HTTP server to listen to HTTP request sent to port 3001
const PORT = process.env.PORT
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})