const Todos = require("./src");

const todos = new Todos();

todos.add("Hello, world!");
todos.add("Testing with Mocha. xD");

console.log(todos.list());

todos.complete("Hello, world!");

console.log(todos.list());

todos.complete("Isto non ecsiste!");
