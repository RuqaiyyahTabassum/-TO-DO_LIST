// Pages
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const page3 = document.getElementById('page3');

// Buttons
const toPage2Btn = document.getElementById('toPage2');
const toPage3Btn = document.getElementById('toPage3');

// User info inputs
const nameInput = document.getElementById('nameInput');
const schoolInput = document.getElementById('schoolInput');
const greetUser = document.getElementById('greetUser');

// Todo table elements
const taskDate = document.getElementById('taskDate');
const taskName = document.getElementById('taskName');
const addTaskBtn = document.getElementById('addTaskBtn');
const todoTableBody = document.querySelector('#todoTable tbody');

// Show first page initially
page1.classList.add('active');

// Navigation buttons
toPage2Btn.addEventListener('click', () => {
    page1.classList.remove('active');
    page2.classList.add('active');
});

toPage3Btn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const school = schoolInput.value.trim();
    if(!name || !school){
        alert("Please enter your name and school/profession!");
        return;
    }
    localStorage.setItem('user', JSON.stringify({name, school}));
    greetUser.textContent = `Hey ${name}! Here’s your To-Do List 🌸`;
    page2.classList.remove('active');
    page3.classList.add('active');
    loadTasks();
});

// Tasks array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Add new task
addTaskBtn.addEventListener('click', () => {
    const date = taskDate.value;
    const taskText = taskName.value.trim();
    if(!date || !taskText) return;

    const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
    const task = {date, day: dayName, text: taskText, done: false};
    tasks.push(task);
    saveTasks();
    addTaskToTable(task);
    taskName.value = '';
    taskDate.value = '';
});

// Add task row to table
function addTaskToTable(task){
    const row = document.createElement('tr');
    if(task.done) row.classList.add('completed');

    row.innerHTML = `
        <td>${task.date}</td>
        <td>${task.day}</td>
        <td>${task.text}</td>
        <td><input type="checkbox" ${task.done ? 'checked' : ''}></td>
    `;

    // Checkbox toggle
    const checkbox = row.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
        task.done = checkbox.checked;
        if(task.done) row.classList.add('completed');
        else row.classList.remove('completed');
        saveTasks();
    });

    todoTableBody.appendChild(row);
}

// Save tasks to localStorage
function saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks(){
    todoTableBody.innerHTML = '';
    tasks.forEach(task => addTaskToTable(task));
}
