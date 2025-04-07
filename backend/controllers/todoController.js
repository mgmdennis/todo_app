const Todo = require("../models/todoModel");

const numista = require("./numista_scrape");

const getTodos = async (req, res) => {
  const todos = await Todo.find();

  console.log("get Todos called");
  res.json(todos);
};

const getTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id)
  res.json(todo)
};

const getNumistaDetails = async (req, res) => {
  const numistaNumber = req.params.numistaNumber;
  const details = await numista.getNumistaDetailsJSON(numistaNumber);

  console.log("Numista Number: ", numistaNumber);

  res.json(details);
}

const createTodo = (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    year: req.body.year,    
  });

  todo.save();
  res.json(todo);
};

const deleteTodo = async (req, res) => {
  const deleteTodo = await Todo.findByIdAndDelete(req.params.id)
  res.json(deleteTodo)
}

const toggleTodoStatus = async (req,res) => {
  const todo = await Todo.findById(req.params.id)
  todo.complete = !todo.complete
  todo.save()
  res.json(todo)
}

exports.getTodos = getTodos;
exports.getTodo = getTodo;
exports.createTodo = createTodo;
exports.deleteTodo = deleteTodo;
exports.toggleTodoStatus = toggleTodoStatus;
exports.getNumistaDetails = getNumistaDetails;
