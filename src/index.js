require("./types");

class Todos {
  /**
   * @type {Todo[]}
   */
  #todos;

  constructor() {
    this.#todos = [];
  }

  list() {
    return [...this.#todos];
  }

  add(title) {
    this.#todos.push({
      title,
      completed: false,
    });
  }

  complete(title) {
    if (this.#todos.length === 0)
      throw new Error(`You have no TODOs stored. Please add one first.`);

    const todo = this.#todos.find(({ title: _title }) => title === _title);
    if (todo) todo.completed = true;
    else throw new Error(`Todo with title "${title}" was not found.`);
  }
}

module.exports = Todos;
