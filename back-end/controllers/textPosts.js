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
    if (err) { console.log('error', err); }
    res.json(post);
  });
}

function show(req, res) {
  TextPost.findById(req.params.post_id, function(err, post){
    if (err) res.send(err);
    else res.json(post);
  });
}

function update(req, res) {
  TextPost.findById(req.params.post_id, function(err, foundPost) {
    if (err) { console.log('albumsController.update error', err); }
    foundPost.title = req.body.title;
    foundPost.content = req.body.content;
    foundPost.thumbnail_image_url = req.body.thumbnail_image_url;
    foundPost.save(function(err, savedPost) {
      if (err) { console.log('saving altered post failed'); }
      res.json(savedPost);
    });
  });
  console.log(res);
}

function destroy(req, res) {
  TextPost.findByIdAndRemove(req.params.post_id, function(err, deletedPost) {
    if (err) { console.log('error', err); }
    res.send(200);
  });
}

module.exports.index = index;
module.exports.create = create;
module.exports.show = show;
module.exports.update = update;
module.exports.destroy = destroy;
