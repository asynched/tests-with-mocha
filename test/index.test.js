const Todos = require('../src/index')
const assert = require('assert/strict')
const fs = require('fs/promises')
const fsSync = require('fs')

describe('Integration test', () => {
  let todos = new Todos()

  beforeEach(() => {
    todos = new Todos()
  })

  it('should add and complete a todo', () => {
    todos.add('Hello, world!')
    const todoList = todos.list()

    const EXPECTED_RESULT = [{ title: 'Hello, world!', completed: false }]

    assert.deepStrictEqual(EXPECTED_RESULT, todoList)
    assert.strictEqual(todoList.length, 1)
  })
})

describe('complete()', () => {
  let todos = new Todos()

  beforeEach(() => {
    todos = new Todos()
  })

  it('should complete a todo', () => {
    todos.add('Hello, world!')
    todos.complete('Hello, world!')

    const EXPECTED_RESULT = [{ title: 'Hello, world!', completed: true }]

    assert.deepStrictEqual(todos.list(), EXPECTED_RESULT)
  })

  it('should throw an error if there are no todos', () => {
    assert.throws(() => todos.complete(null), Error)
  })

  it('should throw an error when trying to complete an unexisting todo', () => {
    todos.add('hmmmm')
    assert.throws(() => todos.complete(null), Error)
  })
})

describe('add()', () => {
  let todos = new Todos()

  beforeEach(() => (todos = new Todos()))

  it('should add a todo to the todo list', () => {
    todos.add('null')
    const EXPECTED_RESULT = [{ title: 'null', completed: false }]

    assert(todos.list(), EXPECTED_RESULT)
  })
})

describe('list()', () => {
  let todos = new Todos()

  beforeEach(() => (todos = new Todos()))

  it('should return a cloned version of the todos stored in the instanciated "Todos" object', () => {
    todos.add('null')
    const todoList = todos.list()
    const EXPECTED_RESULT = [{ title: 'null', completed: false }]
    assert.deepStrictEqual(todoList, EXPECTED_RESULT)
  })
})

describe('saveToFile()', () => {
  let todos = new Todos()

  const cleanupFunction = async () => {
    if (fsSync.existsSync('todos.csv')) await fs.rm('todos.csv')
  }

  beforeEach(() => (todos = new Todos()))

  it('should save the file', async () => {
    todos.add('Hello, world!')
    await todos.saveToFile()
    assert.strictEqual(fsSync.existsSync('todos.csv'), true)
  })

  it('should save the file and have a single todo', async () => {
    todos.add('Saving to a CSV file')

    await todos.saveToFile()

    const EXPECTED_RESULT = 'Title,Completed\nSaving to a CSV file,false\n'
    const fileBuffer = await fs.readFile('todos.csv')
    const fileContent = fileBuffer.toString()

    assert.strictEqual(fileContent, EXPECTED_RESULT)
  })

  // Cleanup function to remove the file
  afterEach(cleanupFunction)
  after(cleanupFunction)
})
