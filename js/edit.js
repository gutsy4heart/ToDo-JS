const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get('id');

if (!taskId) {
  window.location.href = '../pages/error404.html';
}

const taskList = new TaskList();
const task = taskList.getTaskById(taskId);

if (!task) {
  window.location.href = '../pages/error404.html';
}

const editForm = document.getElementById('edit-task-form');
editForm.edit-title.value = task.title;
editForm.edit-description.value = task.description;

editForm.addEventListener('submit', e => {
  e.preventDefault();

  const updatedTitle = editForm.edit-title.value.trim();
  const updatedDescription = editForm.edit-description.value.trim();

  const titleRegex = /^(?!\d+$)[a-zA-Zа-яА-ЯёЁ0-9\s]{1,16}( [a-zA-Zа-яА-ЯёЁ0-9\s]{1,16})+$/;
  const descriptionRegex = /^.+$/;

  if (!titleRegex.test(updatedTitle) || !descriptionRegex.test(updatedDescription) || updatedTitle === updatedDescription) {
    alert('Invalid input. Please check the fields.');
    return;
  }

  task.title = updatedTitle;
  task.description = updatedDescription;
  taskList.updateTask(task);

  window.location.href = 'home.html';
});
