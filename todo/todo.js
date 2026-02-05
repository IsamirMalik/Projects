const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')

let selectedTodo = null; // Store reference to the clicked todo element

const todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {
    todos.forEach(todo => addTodo(todo));
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (selectedTodo) {
        // Update existing todo
        selectedTodo.innerText = input.value;
        // selectedTodo = null;
        updateLS();
        input.value = "";
    } else {
        // Create new todo
        addTodo()
    }
});

function addTodo(todo) {
    let todoText = input.value

    if (todo) {
        todoText = todo.text
    }

    if (todoText) {
        const todoEl = document.createElement('li');

        todoEl.innerText = todoText;

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed')
            updateLS()
        });

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            selectedTodo = todoEl; // Store reference to this element
            input.value = selectedTodo.innerText;
            input.focus();
        });



        todoEl.addEventListener('dblclick', () => {
            todoEl.remove();
            if (todoEl == selectedTodo) {
                selectedTodo = null;
                input.value = "";
            }
            updateLS()
        });

        if (todo && todo.completed) {
            todoEl.classList.add('completed')
        }

        todosUL.appendChild(todoEl);

        input.value = "";

        updateLS()
    }
}

function updateLS() {
    const todos = [];

    const todosEl = document.querySelectorAll('li');

    todosEl.forEach((todoEl) => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        })
    })

    localStorage.setItem('todos', JSON.stringify(todos))

}

function updateTodoItem() {
    const todosEl = document.querySelectorAll('li');
    todosEl.forEach((todoEl) => {
        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed')
            updateLS()
        });
    })
}


