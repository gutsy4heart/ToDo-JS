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

const taskDetails = document.getElementById('task-details');
taskDetails.innerHTML = `
  <p><strong>Title:</strong> ${task.title}</p>
  <p><strong>Description:</strong> ${task.description}</p>
  <p><strong>Created At:</strong> ${new Date(task.createdAt).toLocaleString()}</p>
  <p><strong>Status:</strong> ${task.isCompleted ? 'Done' : 'Remaining'}</p>
`;
