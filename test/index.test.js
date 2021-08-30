const Todos = require("../src/index");
const assert = require("assert/strict");

describe("Integration test", () => {
  let todos = new Todos();

  beforeEach(() => {
    todos = new Todos();
  });

  it("should return 0 as the todos length", () => {
    assert.strictEqual(todos.list().length, 0);
  });

  it("should add a todo to the todo list", () => {
    todos.add("Hello, world!");

    const EXPECTED_RESULT = [
      {
        title: "Hello, world!",
        completed: false,
      },
    ];

    assert.deepStrictEqual(todos.list(), EXPECTED_RESULT);
  });

  it("should complete a todo", () => {
    todos.add("Hello, world!");

    const EXPECTED_RESULT = [
      {
        title: "Hello, world!",
        completed: true,
      },
    ];

    todos.complete("Hello, world!");

    assert.deepStrictEqual(todos.list(), EXPECTED_RESULT);
  });

  it("should throw an error when trying to complete a todo on an empty todo list", () => {
    assert.throws(() => todos.complete(null), Error);
  });

  it("should throw an error when trying to complete an unexisting todo", () => {
    todos.add("Hello, world!");
    assert.throws(() => todos.complete(null), Error);
  });
});
