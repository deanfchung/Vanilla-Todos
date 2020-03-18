let id = 1;
//Add Todos
document.querySelectorAll('.btn-remove').forEach((el) => {
    el.setAttribute('id',id);
    el.addEventListener('click', () => {
        el.parentNode.remove();
    })
    id++;
})
document.querySelector('.add-todo').addEventListener('submit', (e) => {
    e.preventDefault();
    let input = document.querySelector('.input-bar').value;
    const template = `
    <li class="todo-list-content-item">${input}
        <button class='btn btn-remove' id = ${id}>
            remove
        </button>
    </li>
    `;
    document.querySelector('.todo-list-content').insertAdjacentHTML('beforeend', template);
    const currButton = document.getElementById(`${id}`)
    currButton.addEventListener('click', () => {
        currButton.parentNode.remove();
    })
    id++;
})
