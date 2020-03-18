let id = 1;

//Get Todos API
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0IiwidXNlcm5hbWUiOiJ0ZXN0NCIsInBhc3N3b3JkIjoidGVzdDQiLCJyb2xlciI6Im1lbWJlciIsImlhdCI6MTU4NDU2MTc1NiwiZXhwIjoxNTg0ODYxNzU2fQ.d0odz0fXTP8Ny__yH8TSEMVJk9Y-h0yw_0AhtLWBp84"
const bearer = "Bearer " + token;
const url = 'https://us-central1-todos-server.cloudfunctions.net/api/todos/'

//Listening to get all todos button in header
document.querySelector('.btn-getTodos').addEventListener('click', () => {
    fetch(url, {
        method: 'GET',
        withCredentials: true,
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json',
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log('data.data', data.data);
        renderAllTodos(data.data)
})
})

document.querySelector('.btn-clearTodos').addEventListener('click', () => {
    if (document.querySelector('.todo-list-content').childNode) {
        console.log('at least one child node exists')
        const ul = document.querySelector('.todo-list-content');
        console.log(ul);
    }
    document.querySelector('ul').remove();
    const template = `<ul class="todo-list-content"></ul>`
    document.querySelector('.todo-list').insertAdjacentHTML('beforeend', template)
})

//render all todos fetched from api when getTodos button pressed
const renderAllTodos = (data) => {
    let result = '';
    data.forEach((todo) => {
        const { content, id } = todo;
        result += `
        <li class="todo-list-content-item">${content}<button class='btn btn-remove remove-api-todo' id = ${id}>remove</button></li>
        `;
    })
    document.querySelector('.todo-list-content').insertAdjacentHTML('beforeend',result);
    //add event listener to remove button
    document.querySelectorAll('.btn-remove').forEach((button) => {
        button.addEventListener('click', () => {
            removeTodo(button);
        })
    })
}

//add individual todos

document.querySelector('.add-todo').addEventListener('submit', (e) => {
    e.preventDefault();
    let input = document.querySelector('.input-bar');
    addTodo(input.value);
    input.value = '';
})

const addTodo = (value) => {
    const request = {'todo':`${value}`}
    fetch(url, {
        method: 'POST',
        withCredentials: true,
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
    })
    .then(res => res.json())
    .then(data => {
        fetch(url, {
        method: 'GET',
        withCredentials: true,
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json',
        }
    })
    .then(res => res.json())
    .then(data => {
        currTodo = data.data[data.data.length-1]
        const button = document.getElementById(`${id-1}`);
        button.setAttribute('id', currTodo.id)
        button.addEventListener('click', () => {
            removeTodo(button);
        });
    });
    })

    const template = `
    <li class="todo-list-content-item">${value}<button class='btn btn-remove' id = ${id}>remove</button></li>
    `;
    document.querySelector('.todo-list-content').insertAdjacentHTML('beforeend', template);
    id++;
}

//re-usable function for adding delete functionality to remove button listeners
const removeTodo = (button) => {
    const requestBody = {'todoId': button.id}
    fetch(url, {
        method: 'DELETE',
        withCredentials: true,
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    })
    .then(res => res.json())
    .then(data => console.log('delete route response', data));
    button.parentNode.remove();
}