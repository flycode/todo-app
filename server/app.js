var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    mongo = require('./config/db'),
    mongoose = require('mongoose');
    compress = require('compression');

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compress());
app.use(bodyParser.json());
app.use(methodOverride());
app.set('port', process.env.PORT || 3000);

app.all('*', function(req, res, next){
  res.set('Access-Control-Allow-Credentials', 'true');
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Expose-Headers', 'ETag, Link, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval');
  res.set('Cache-Control', 'public, max-age=60, s-maxage=60');
    next();
});

// Import Models and controllers
var modelTodo = require('./models/todo')(app, mongoose);
var TodoCtrl  = require('./controller/todo');

// Routes
var router = express.Router();

router.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

router.get('/', function(req, res) {
  res.send("Hello world!");
});
app.use(router);

// API routes
var todos = express.Router();

todos.route('/todo')
  .get(TodoCtrl.findAllTodos)
  .post(TodoCtrl.addTodo);

todos.route('/todo/:id')
  .get(TodoCtrl.findById)
  .put(TodoCtrl.updateTodo)
  .delete(TodoCtrl.deleteTodo);

app.use('/api', todos);


app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
