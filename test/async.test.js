const Todos = require('../src/async')
const assert = require('assert/strict')
const fs = require('fs/promises')
const fsSync = require('fs')

describe('Async integration test', () => {
  let todos = new Todos()
  const cleanupFunction = async () => {
    try {
      await fs.rm('todos.csv')
    } catch (error) {
      // This happens when the file doesn't exist,
      // shouldn't be a problem, really.
    }
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
