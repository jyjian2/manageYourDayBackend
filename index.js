const express = require('express');
const app = express();

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

//bond HTTP server to listen to HTTP request sent to port 3001
const PORT = 3001
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})