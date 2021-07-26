// Required Modules
const http = require('http');
const express = require('express');
const app = express();
const db = require('./model/db');
const { todos } = require('./model/db');

// Create Server
const hostname = '127.0.0.1'
const port = 7000   
const server = http.createServer(app)

// Middleware
app.use(express.static('./public'))
app.use(express.json('./public'))
app.use(express.urlencoded({ extended: false}))

// Set ID to numb
let id = 6;

// Get All Todos
app.get('/api/v1/todos', (req, res) => {
    // Sends whatever you give it as json data
    res.json(db.todos)
    // IN INSOMNIA - 
    // 1. Get /api/v1/todos 
    // 2. Add path http://127.0.0.1:7000/api/v1/todos and send
    
})

// Create New Todos
app.post('/api/v1/todos', (req, res) => {
    // If todo body is empty
    if (!req.body || !req.body.text) {
        // respond with an error
        res.status(422).json({
            error: "Must include To Do Text"
        })
        // and exit the function
        return
    }
    // console.log(req.body)
    const newTodo = {
        id: id++,
        text: req.body.text,
        completed: false
    }
    db.todos.push(newTodo)
    // Update status to comply with REST protocol 
    // and send response with updated info
    res.status(201).json(newTodo)
    
})


// Update existing todos by id
app.patch('/api/v1/todos/:id', (req, res) => {
    // get the id from the route
    const id = parseInt(req.params.id)
    // find the existing todo
    const todoIndex = db.todos.findIndex((todo) => {
        // return the todo id that matches the id being requested
        return todo.id === id
    })

    // If we cannot find todo with that id
    if(todoIndex === -1) {
        res.status(404).json({error: 'Could not find todo with that id'})
        return
    }
    // update the todo text if one was provided
    if (req.body && req.body.text) {
        db.todos[todoIndex].text = req.body.text
    }
    if (req.body && req.body.completed !== undefined) {
        db.todos[todoIndex].completed = req.body.completed
    }
    db.todos[todoIndex].completed 
    // respond with updated item
    res.json(db.todos[todoIndex])
})


// Delete existing todo by id
app.delete('/api/v1/todos/:id', (req, res) => {
    // get the id from the route
    const id = parseInt(req.params.id)
    // find the existing todo
    const todoIndex = db.todos.findIndex((todo) => {
        // return the todo id that matches the id being requested
        return todo.id === id
    })
    // If we cannot find todo with that id
    if(todoIndex === -1) {
        res.status(404).json({error: 'Could not find todo with that id'})
        return
    }
    // delete todo
    db.todos.splice(todoIndex, 1)
    // respond with 204 and updated todos 
    res.status(204).json()

})





// Listen for requests
server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`);
})