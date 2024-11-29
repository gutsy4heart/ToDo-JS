import {TaskList}  from "./app.js";

const taskList = new TaskList();
const editTask = document.getElementById("edit-task-form");

const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get('id');

if(!taskId) {
    window.location.href = '../pages/error404.html';
}

const task = taskList.getTaskById(taskId);
if (!task) {
    alert('Task not found!');
    window.location.href = '../pages/home.html';
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

    // window.location.href = '../pages/home.html';
    alert("Fields is updated!");
});

