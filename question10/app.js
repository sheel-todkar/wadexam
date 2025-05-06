const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Simulated task array (in real app, load from server)
let tasks = [];

// Load tasks (simulate server)
function loadTasks() {
  // Simulate AJAX with setTimeout or use fetch from real server
  setTimeout(() => {
    // Simulated tasks from server
    tasks = [
      { id: 1, name: "Learn JavaScript" },
      { id: 2, name: "Build a to-do app" }
    ];
    renderTasks();
  }, 300);
}

// Render tasks to the DOM
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${task.name}</span>
      <div class="actions">
        <button onclick="editTask(${task.id})">Edit</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

// Add new task
function addTask() {
  const name = taskInput.value.trim();
  if (name === '') return alert('Task cannot be empty');
  
  const newTask = { id: Date.now(), name };
  tasks.push(newTask);
  taskInput.value = '';
  renderTasks();
  saveTaskToServer(newTask);
}

// Edit task
function editTask(id) {
  const task = tasks.find(t => t.id === id);
  const newName = prompt("Edit task", task.name);
  if (newName) {
    task.name = newName;
    renderTasks();
    updateTaskOnServer(task);
  }
}

// Delete task
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
  deleteTaskFromServer(id);
}

// Simulate AJAX calls

function saveTaskToServer(task) {
  console.log('Saving to server...', task);
  // In real app, use fetch('/api/tasks', { method: 'POST', body: JSON.stringify(task) })
}

function updateTaskOnServer(task) {
  console.log('Updating on server...', task);
  // fetch(`/api/tasks/${task.id}`, { method: 'PUT', body: JSON.stringify(task) })
}

function deleteTaskFromServer(id) {
  console.log('Deleting from server...', id);
  // fetch(`/api/tasks/${id}`, { method: 'DELETE' })
}

// Start
loadTasks();
