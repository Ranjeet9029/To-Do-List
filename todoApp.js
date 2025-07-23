const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Load tasks from localStorage
window.onload = () => {
  tasks.forEach(task => renderTask(task));
};

// Add new task
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Task cannot be empty!");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  tasks.push(task);
  saveTasks();
  renderTask(task);
  taskInput.value = "";
});

// Render task to DOM
function renderTask(task) {
  const li = document.createElement("li");
  li.setAttribute("data-id", task.id);
  if (task.completed) li.classList.add("completed");

  li.innerHTML = `
    <input type="checkbox" ${task.completed ? "checked" : ""}>
    <span class="task-text">${task.text}</span>
    <div class="task-actions">
      <button class="edit">✏️</button>
      <button class="delete">🗑️</button>
    </div>
  `;

  taskList.appendChild(li);
}

// Task interaction
taskList.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  const id = Number(li.getAttribute("data-id"));
  const task = tasks.find(t => t.id === id);

  if (e.target.matches("input[type='checkbox']")) {
    task.completed = e.target.checked;
    li.classList.toggle("completed", task.completed);
    saveTasks();
  }

  if (e.target.classList.contains("delete")) {
    tasks = tasks.filter(t => t.id !== id);
    li.remove();
    saveTasks();
  }

  if (e.target.classList.contains("edit")) {
    const newText = prompt("Edit task:", task.text);
    if (newText !== null && newText.trim() !== "") {
      task.text = newText.trim();
      li.querySelector(".task-text").textContent = task.text;
      saveTasks();
    }
  }
});

// Save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

