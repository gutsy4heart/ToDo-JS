export class Task {
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