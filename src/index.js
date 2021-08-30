const fs = require('fs/promises')
require('./types')

class Todos {
  /**
   * @type {Todo[]}
   */
  #todos

  /**
   * Instanciates a new "Todos" object
   */
  constructor() {
    this.#todos = []
  }

  /**
   * Returns a list of all the todos
   *
   * @returns {Todo[]}
   */
  list() {
    return [...this.#todos]
  }

  /**
   * Adds a todo
   *
   * @param {string} title Title of the todo to be added
   */
  add(title) {
    this.#todos.push(this.#todoFactory(title))
  }

  /**
   * Completes a todo
   * @param {string} title Title to filter the todo
   */
  complete(title) {
    if (this.#todos.length === 0)
      throw new Error(`You have no TODOs stored. Please add one first.`)

    const todo = this.#todos.find(({ title: _title }) => title === _title)

    if (!todo) throw new Error(`Todo with title "${title}" was not found.`)

    todo.completed = true
  }

  /**
   * Saves the todos to a file
   */
  async saveToFile() {
    const csvHeader = 'Title,Completed\n'

    const csvFileContent = this.#todos.reduce(
      (content, todo) => (content += `${todo.title},${todo.completed}\n`),
      csvHeader
    )

    await fs.writeFile('todos.csv', csvFileContent)
  }

  /**
   * Generates a todo object
   *
   * @param {string} title Title of the todo
   * @returns {Todo} Todo object
   */
  #todoFactory(title) {
    return {
      title,
      completed: false,
    }
  }
}

module.exports = Todos
