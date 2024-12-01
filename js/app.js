import {TaskList} from "./taskList.js";
import {Task} from "./task.js";

const taskList = new TaskList();
const taskListContainer = document.getElementById('task-list');
const addTaskForm = document.getElementById('add-task-form');
const filterSelect = document.getElementById('filter');
const sortSelect = document.getElementById('sort');

function displayTasks() {
  const filter = filterSelect.value;
  const sort = sortSelect.value;
  const tasks = taskList
      .sortTasks(sort)
      .filter(
          task =>
              filter === 'all' ||
              (filter === 'done' && task.isCompleted) ||
              (filter === 'remaining' && !task.isCompleted)
      );

  taskListContainer.innerHTML = '';

  tasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task-item');
    if (task.isCompleted) taskElement.classList.add('done');

    taskElement.innerHTML = `
      <div>
        <input type="checkbox" ${task.isCompleted ? 'checked' : ''} data-id="${task.id}">
        <span class="task-title" data-id="${task.id}">${task.title} </span>${task.createdAt}
      </div>
      <div>
        <button data-id="${task.id}" class="edit-btn">Edit</button>
        <button data-id="${task.id}" class="delete-btn">Delete</button>
      </div>
    `;

    taskListContainer.appendChild(taskElement);
  });
  document.querySelectorAll('.task-title').forEach(titleElement => {
    titleElement.addEventListener('click', e => {
      const taskId = e.target.dataset.id; // Получаем ID задачи
      window.location.href = `details.html?id=${taskId}`; // Переход на страницу деталей
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (!addTaskForm) {
    console.error('add-task-form элемент не найден!');
    return;
  }
  addTaskForm.addEventListener('submit', e => {
    e.preventDefault();

    const title = addTaskForm.title.value.trim();
    const description = addTaskForm.description.value.trim();

    const titleRegex = /^(?!\d+$)[a-zA-Zа-яА-ЯёЁ0-9\s]{1,16}( [a-zA-Zа-яА-ЯёЁ0-9\s]{1,16})+$/;
    const descriptionRegex = /^.+$/;

    if (!titleRegex.test(title) || !descriptionRegex.test(description) || title === description) {
      alert('Invalid input. Please check the fields.');
      return;
    }

    const newTask = new Task(
        Date.now().toString(),
        title,
        description,
        new Date().toISOString()
    );

    taskList.addTask(newTask);
    addTaskForm.reset();
    displayTasks();
  });
});

taskListContainer.addEventListener('click', e => {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.dataset.id;
    taskList.deleteTask(id);
    displayTasks();
  }
});

taskListContainer.addEventListener('click', e => {
  if (e.target.classList.contains('edit-btn')) {
    const id = e.target.dataset.id;
    window.location.href = `edit.html?id=${id}`;
  }
});

taskListContainer.addEventListener('change', e => {
  if (e.target.type === 'checkbox') {
    const id = e.target.dataset.id;
    const task = taskList.getTaskById(id);
    if (task) {
      task.isCompleted = e.target.checked;
      taskList.updateTask(task);
      displayTasks();
    }
  }
});

filterSelect.addEventListener('change', displayTasks);
sortSelect.addEventListener('change', displayTasks);


displayTasks();
