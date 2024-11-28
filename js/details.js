import {TaskList}  from "./app.js";
// Получение параметра id из URL
const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get('id');

// Если ID задачи отсутствует, редирект на страницу ошибки
if (!taskId) {
  window.location.href = '../pages/error404.html';
}

// Создание списка задач и поиск задачи по ID
const taskList = new TaskList();
const task = taskList.getTaskById(taskId);

// Если задачи с таким ID нет, редирект на страницу ошибки
if (!task) {
  window.location.href = '../pages/error404.html';
}

// Отображение деталей задачи
const taskDetails = document.getElementById('task-details');

if (taskDetails) {
  taskDetails.innerHTML = `
    <p><strong>Title:</strong> ${task.title}</p>
    <p><strong>Description:</strong> ${task.description}</p>
    <p><strong>Created At:</strong> ${new Date(task.createdAt).toLocaleString()}</p>
    <p><strong>Status:</strong> ${task.isCompleted ? 'Done' : 'Remaining'}</p>
  `;
} else {
  console.error('Element #task-details not found in DOM');
}
