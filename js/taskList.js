import {Task} from "./task.js";

export class TaskList {
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