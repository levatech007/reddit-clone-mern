var models = require('../models');
var TextPost = models.TextPost;

function index(req, res) {
  TextPost.find({}, function(err, textPosts) {
    if (err) res.send(err);
    else res.json(textPosts);
  });
}

function create(req, res) {
  TextPost.create(req.body, function(err, post) {
    console.log(req.body);
    if (err) res.send(err);
    else res.json(post);
  });
}

function show(req, res) {
  TextPost.findById(req.params.post_id, function(err, post){
    if (err) res.send(err);
    else res.json(post);
  });
}

function update(req, res) {
  TextPost.findByIdAndUpdate(req.params.post_id,
     {$set: req.body}, { 'new': true }, function(err, post){  // without {'new': true}, returns the old comment, not updated one
     if (err) res.send(err);
     else res.json(post);
   });
}

function destroy(req, res) {
  TextPost.findByIdAndRemove(req.params.post_id, function(err, deletedPost) {
    if (err) { console.log('error', err); }
    res.send('Post deleted!');
  });
}

module.exports.index = index;
module.exports.create = create;
module.exports.show = show;
module.exports.update = update;
module.exports.destroy = destroy;
