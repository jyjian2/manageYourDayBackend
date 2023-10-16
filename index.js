const http = require('http');

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


//use createServer mrthod to create a web server
//an event handler is called every time a HTTP request is made to the server's address
const app = http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'text/plain'})
    response.end('Hello World')
})


//bond HTTP server to listen to HTTP request sent to port 3001
const PORT = 3001
app.listen(PORT)
console.log(`Server is running on ${PORT}`)