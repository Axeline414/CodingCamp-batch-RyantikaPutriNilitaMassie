document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const dateInput = document.getElementById('date-input');
    const todoList = document.getElementById('todo-list');
    const deleteAllBtn = document.getElementById('delete-all-btn');
    const filterBtn = document.getElementById('filter-btn');
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function renderTodos(showAll = true) {
        todoList.innerHTML = '';
        let shownTodos = showAll ? todos : todos.filter(todo => !todo.completed);
        if (shownTodos.length === 0) {
            todoList.innerHTML = `<tr><td colspan="4">No task found</td></tr>`;
            return;
        }
        shownTodos.forEach((todo, index) => {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${todo.task}</td>
                <td>${todo.dueDate}</td>
                <td>${todo.completed ? 'Done' : 'Pending'}</td>
                <td>
                    <button onclick="toggleComplete(${index})">${todo.completed ? 'Undo' : 'Done'}</button>
                    <button onclick="deleteTodo(${index})">Delete</button>
                </td>
            `;
            todoList.appendChild(row);
        });
    }

    window.toggleComplete = function(index){
        todos[index].completed = !todos[index].completed;
        saveTodos();
    }

    window.deleteTodo = function(index){
        todos.splice(index, 1);
        saveTodos();
    }

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    }

    todoForm.onsubmit = function(e) {
        e.preventDefault();
        const task = todoInput.value.trim();
        const dueDate = dateInput.value;
        if (!task) {
            alert('Please enter a todo task!');
            return;
        }
        if (!dueDate) {
            alert('Please select a due date!');
            return;
        }
        todos.push({ task, dueDate, completed: false });
        saveTodos();
        todoForm.reset();
    };

    deleteAllBtn.onclick = function() {
        if (confirm('Delete all tasks?')) {
            todos = [];
            saveTodos();
        }
    };

    filterBtn.onclick = function() {
        renderTodos(false);
    };

    renderTodos();

});