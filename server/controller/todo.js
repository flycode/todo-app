//File: controllers/todo.js
var mongoose = require('mongoose');
var Todo  = mongoose.model('Todo');

//GET - Return all todos in the DB
exports.findAllTodos = function(req, res) {
  Todo.find(function(err, todos) {
    if(err) res.send(500, err.message);

    console.log('GET /todos')
    res.status(200).jsonp(todos);
  });
};

//GET - Return a Todo with specified ID
exports.findById = function(req, res) {
  Todo.findById(req.params.id, function(err, todo) {
    if(err) return res.send(500, err.message);

    console.log('GET /todo/' + req.params.id);
    res.status(200).jsonp(todo);
  });
};

//POST - Insert a new Todo in the DB
exports.addTodo = function(req, res) {
  console.log('POST');
  console.log(req.body);

  var todo = new Todo({
    title:  req.body.title,
    info:   req.body.info,
    status: req.body.status
  });

  todo.save(function(err, todo) {
    if(err) return res.send(500, err.message);
    res.status(200).jsonp(todo);
  });
};

//PUT - Update a register already exists
exports.updateTodo = function(req, res) {
  Todo.findById(req.params.id, function(err, todo) {
    todo.title   = req.body.title;
    todo.info    = req.body.info;
    todo.status  = req.body.status;

    todo.save(function(err, todo) {
      if(err) return res.send(500, err.message);
      res.status(200).jsonp(todo);
    });
  });
};

//DELETE - Delete a Todo with specified ID
exports.deleteTodo = function(req, res) {
  Todo.findById(req.params.id, function(err, todo) {
    todo.remove(function(err) {
      if(err) return res.send(500, err.message);
      res.status(200);
    })
  });
};
