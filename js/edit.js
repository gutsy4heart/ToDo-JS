import {TaskList}  from "./app.js";

const taskList = new TaskList();
const editTask = document.getElementById("edit-task-form");
const cancelBtn = document.getElementById('cancel-btn');

const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get('id');

if(!taskId) {
    window.location.href = '../pages/error404.html';
}

const task = taskList.getTaskById(taskId);
if (!task) {
    alert('Task not found!');
    window.location.href = 'index.html';
}

editTask.title.value = task.title;
editTask.description.value = task.description;

editTask.addEventListener("submit", e => {
    e.preventDefault();
    const updatedTitle = editTask.title.trim();
    const updatedDescription = editTask.description.trim();

    if(!updatedTitle || !updatedDescription) {
        alert('Fields cannot be empty.');
    }

    task.title = updatedTitle;
    task.description = updatedDescription;

    taskList.updateTask(task);

    window.location.href = './index.html';

});
cancelBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
});

