function renderTodos(todosArray) {
    const todosHtmlArray = todosArray.map(todo => {
        return `<li class="${todo.completed ? 'completed' : 'incomplete'}">
        
        <input type="edit_field" id="edit-${todo.id}" value="${todo.text}">
        <button class="update-button" data-id="${todo.id}">💾</button>
        <button class="complete-button" data-id="${todo.id}"
        data-completed="${todo.completed ? 'completed' : 'incomplete'}"
        >✅</button>
        <button class="delete-button" data-id="${todo.id}">🗑</button>
        </li>`
    })

    return todosHtmlArray.join('')
}

function fetchTodos() {
    fetch('/api/v1/todos')
        .then(res => res.json())
        .then(data => {
            //  Make the html formatted todos the inner html 
            // of our ordered list
            console.log(data)
            todos.innerHTML = renderTodos(data)
        })
}

// ol id todos in index.html
const todos = document.getElementById('todos')
// form id todoForm in index.html
const todoForm = document.getElementById('todoForm')


fetchTodos()
todoForm.addEventListener('submit', (e) => {
    // prevent default behavior of the submit button
    e.preventDefault()
    // grab text that was inputted in the todo_text field and send to API
    const input = document.getElementById('todo_text')
    // fetch the todos database for a post request 
    fetch('api/v1/todos', {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        // turn text into json
        body: JSON.stringify({
            text: input.value
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                alert(data.error)
            }
            fetchTodos()
            todoForm.reset()
        })
})

document.addEventListener('click', (e) => {
    // data attribute 'delete-button' assigned in our render function
    
    if (e.target.classList.contains('delete-button')) {
        // get id to be deleted from button
        const id = e.target.dataset.id
        // delete
        fetch(`/api/v1/todos/${id}`, {
            method: 'DELETE'
        })
            .then(res => !res.ok && res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                }
                fetchTodos()
            })
    }

    if (e.target.classList.contains('complete-button')) {
        // get id to be deleted from button
        const id = e.target.dataset.id;
        const completed = e.target.dataset.completed;
        fetch(`/api/v1/todos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                completed: completed === 'completed' ? false : true
            })
        })
            .then(res => !res.ok && res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                }
                fetchTodos()
            })
    }

    if (e.target.classList.contains('update-button')) {
        // get the id
        const id = e.target.dataset.id;
        // get the input from the edit field
        const editField = document.getElementById(`edit-${id}`)
        // get the text from the edit field
        const newValue = editField.value
        // send a pacth request to /api/v1/todos/{id}
        fetch(`/api/v1/todos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: newValue
            })
        })
            .then(res => !res.ok && res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                }
                fetchTodos()
            })
        // then refresh
    }




})
    
