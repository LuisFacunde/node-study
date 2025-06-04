import http from 'node:http'

const server = http.createServer((req, res) => {
    return res.end('Hello FAV!')
})

server.listen(3333)
// localhost:3333


// Métodos de importação
// CommonJS => require
// ESModule => import/export


// console.log("Hello World!");