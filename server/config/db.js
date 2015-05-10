/*
  Dependencies
**/
var mongoose = require('mongoose'),
    //uri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost:27017/todoapp';
    uri = 'mongodb://localhost:27017/todoapp';

// Connect to mongo
mongoose.connect(uri);
// Print db connected
console.log('active db', uri);

/*
  Exports
**/
exports.mongoose = mongoose;
