// Task Manager

class Task {
  #id;
  #title;
  #description;
  #createdAt;
  #isCompleted;

  constructor(id, title, description, createdAt, isCompleted = false) {
    this.#id = id;
    this.#title = title;
    this.#description = description;
    this.#createdAt = createdAt;
    this.#isCompleted = isCompleted;
  }

  // Геттеры и сеттеры для управления приватными полями
  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  set title(value) {
    this.#title = value;
  }

  get description() {
    return this.#description;
  }

  set description(value) {
    this.#description = value;
  }

  get createdAt() {
    return this.#createdAt;
  }

  get isCompleted() {
    return this.#isCompleted;
  }

  set isCompleted(value) {
    this.#isCompleted = value;
  }
}

class TaskList {
  #tasks;

  constructor() {
    this.#tasks = JSON.parse(localStorage.getItem('tasks'))?.map(
      task => new Task(task.id, task.title, task.description, task.createdAt, task.isCompleted)
    ) || [];
  }

  addTask(task) {
    this.#tasks.push(task);
    this.saveTasks();
  }

  deleteTask(id) {
    this.#tasks = this.#tasks.filter(task => task.id !== id);
    this.saveTasks();
  }

  updateTask(updatedTask) {
    const index = this.#tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.#tasks[index] = updatedTask;
      this.saveTasks();
    }
  }

  getTaskById(id) {
    return this.#tasks.find(task => task.id === id);
  }

  filterTasks(filter) {
    if (filter === 'done') {
      return this.#tasks.filter(task => task.isCompleted);
    } else if (filter === 'remaining') {
      return this.#tasks.filter(task => !task.isCompleted);
    }
    return this.#tasks;
  }

  sortTasks(criteria) {
    return [...this.#tasks].sort((a, b) => {
      if (criteria === 'name') {
        return a.title.localeCompare(b.title);
      } else if (criteria === 'date') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
  }

  saveTasks() {
    const serializedTasks = this.#tasks.map(task => ({
      id: task.id,
      title: task.title,
      description: task.description,
      createdAt: task.createdAt,
      isCompleted: task.isCompleted,
    }));
    localStorage.setItem('tasks', JSON.stringify(serializedTasks));
  }
}

// Инициализация
const taskList = new TaskList();
const taskListContainer = document.getElementById('task-list');
const addTaskForm = document.getElementById('add-task-form');
const filterSelect = document.getElementById('filter');
const sortSelect = document.getElementById('sort');

// Функция для отображения задач
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
        <span class="task-title" data-id="${task.id}">${task.title} ${task.createdAt}</span>
      </div>
      <div>
        <button data-id="${task.id}" class="edit-btn">Edit</button>
        <button data-id="${task.id}" class="delete-btn">Delete</button>
      </div>
    `;

    taskListContainer.appendChild(taskElement);
  });
}

// Добавление новой задачи
addTaskForm.addEventListener('submit', e => {
  e.preventDefault();

  const title = addTaskForm.title.value.trim();
  const description = addTaskForm.description.value.trim();

  // Валидация данных
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

// Удаление задачи
taskListContainer.addEventListener('click', e => {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.dataset.id;
    taskList.deleteTask(id);
    displayTasks();
  }
});

// Редактирование задачи
taskListContainer.addEventListener('click', e => {
  if (e.target.classList.contains('edit-btn')) {
    const id = e.target.dataset.id;
    window.location.href = `edit.html?id=${id}`;
  }
});

// Смена статуса задачи
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

// Фильтрация и сортировка
filterSelect.addEventListener('change', displayTasks);
sortSelect.addEventListener('change', displayTasks);

// Отображение задач при загрузке
displayTasks();
