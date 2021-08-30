const fs = require('fs/promises')
require('./types')

class Todos {
  /**
   * @type {Todo[]}
   */
  #todos

  constructor() {
    this.#todos = []
  }

  list() {
    return [...this.#todos]
  }

  add(title) {
    this.#todos.push({
      title,
      completed: false,
    })
  }

  complete(title) {
    if (this.#todos.length === 0)
      throw new Error(`You have no TODOs stored. Please add one first.`)

    const todo = this.#todos.find(({ title: _title }) => title === _title)

    if (!todo) throw new Error(`Todo with title "${title}" was not found.`)

    todo.completed = true
  }

  async saveToFile() {
    const csvHeader = 'Title,Completed\n'

    const csvFileContent = this.#todos.reduce(
      (content, todo) => (content += `${todo.title},${todo.completed}\n`),
      csvHeader
    )

    await fs.writeFile('todos.csv', csvFileContent)
  }
}

module.exports = Todos
