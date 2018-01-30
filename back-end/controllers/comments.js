var models = require('../models');
var Comment = models.Comment;
var TextPost = models.TextPost;

function create(req, res) {
  Comment.create(req.body, function(err, comment){
    if (err) res.end(err);
    else {
      TextPost.findById(req.params.post_id, function(err, post) {
        if (err) res.send(err);
        else {
          post.comments.push(comment);
          post.save();
          res.json(comment);
        }
      })
    }
  });
}

function update(req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id,
    {$set: req.body}, function(err, comment){
    if (err) res.send(err);
    else res.json(comment);
  });
}

function destroy(req, res) {
  Comment.findByIdAndRemove(req.params.comment_id, function(err, comment){
    if (err) res.send(err);
    else res.send("comment deleted");
    });
}

module.exports.create = create;
module.exports.update = update;
module.exports.destroy = destroy;
