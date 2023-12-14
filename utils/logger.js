// this is for priting normal log messages

const info = (...params) => {
    if (process.env.NODE_ENV !== 'test') { 
        console.log(...params)
      }
}

// this is for printing error messages
const error = (...params) => {
    if (process.env.NODE_ENV !== 'test') { 
        console.error(...params)
      }
}

module.exports = {
    info, error
}