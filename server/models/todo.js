exports = module.exports = function(app, mongoose) {

  var todoSchema = new mongoose.Schema({
    title:        { type: String },
    info:         { type: String },
    status:       { type: String }
  });

  mongoose.model('Todo', todoSchema);

};
