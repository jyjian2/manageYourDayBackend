const express = require('express');
const app = express();
const cors  = require('cors');

//json-parser middleware
//middleware: functions that can be used for handling request and response objects
app.use(express.json())
//allow requests from other resources using cors middleware
app.use(cors())
//make express show static content
app.use(express.static('dist'))

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: 3,
        content: "ET and POST are the most important methods of HTTP protocol",
        important: true
    },
]


app.get('/', (request, response) => {
    console.log(response)
    response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    //conert datatype of attribute "id" from string to Number
    const id = Number(request.params.id)
    const note = notes.find(n => n.id === id)

    //gives it a condition of finding note or not
    if (note) {
        response.json(note)
    } else {
        response.send("No note is found")
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    console.log(id)
    notes = notes.filter(n => n.id !== id)
    response.status(204).end()
})

app.post('/api/notes', (request, response) => {

    //The json-parser takes the JSON data of a request, 
    //transforms it into a JavaScript object 
    //and then attaches it to the body property of the request object 
    const body = request.body

    const generateId = () => {
        return notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;
    }
    
    if (!body) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        id: generateId(),
    }

    notes = notes.concat(note)
    response.json(note)
})

//add middleware for catching requests to non-existent routes
const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

//bond HTTP server to listen to HTTP request sent to port 3001
const PORT = process.env.PORT || 3001
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})