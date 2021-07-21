// Required Modules
const http = require('http');
const express = require('express');
const app = express();
const db = require('./model/db')

// Create Server
const hostname = '127.0.0.1'
const port = 7000   
const server = http.createServer(app)

// Middleware
app.use(express.static('./public'))
app.use(express.json('./public'))
app.use(express.urlencoded({ extended: false}))







// Listen for requests
server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`);
})