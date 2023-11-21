// this is for priting normal log messages

const info = (...params) => {
    console.log(...params)
}

// this is for printing error messages
const error = (...params) => {
    console.log(...params)
}

module.exports = {
    info, error
}