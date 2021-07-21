const http = require('http');
const express = require('express');
const app = express();

app.set('view engine', 'ejs')
// 1st argument: setting,2nd argument: value - folder name 'views'
app.set('views', 'views')
const hostname = '127.0.0.1'
const port = 7000   


// Middleware
app.use(express.static('./public'))
app.use(express.json('./public'))
app.use(express.urlencoded({ extended: false}))


const server = http.createServer(app)
const db = require('./model/db')



server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`);
})