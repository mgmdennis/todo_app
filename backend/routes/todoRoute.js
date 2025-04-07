const express = require("express");

const router = express.Router();

const { getTodos, getTodo, getNumistaDetails, createTodo, deleteTodo, toggleTodoStatus } = require("../controllers/todoController");

router.get("/todos", getTodos);

router.get("/numista/:numistaNumber", getNumistaDetails);

router.get("/todo/:id", getTodo);

router.post("/todo/new", createTodo);

router.delete('/todo/delete/:id', deleteTodo)

router.get('/todo/toggleStatus/:id', toggleTodoStatus)

module.exports = router;
