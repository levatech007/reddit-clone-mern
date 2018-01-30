require('dotenv').config();

var express = require('express');
var app = express();
var redditRouter = require('./config/routes.js');
var db = require('./models');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  next();
});

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(redditRouter);

app.get('/api/posts', function(req, res) {
  TextPost.find({ })
    .populate('comments')
    .exec(function(err, posts) {
      if (err) {
        res.status(500).send(err);
        return;
      }
      console.log('found and populated all posts: ', posts);
      res.json(posts);
    });
})

app.post('/api/posts', function(req, res) {
  TextPost.create(req.body, function(err, post) {
    if (err) { console.log('error', err); }
    res.json(post);
  });
})

app.get('/api/posts/:post_id', function(req, res) {
  TextPost.findById(req.params.post_id, function(err, post){
    if (err) res.send(err);
    else res.json(post);
  });

})

app.put('/api/posts/:post_id', function(req, res) {
  db.TextPost.findById(req.params.post_id, function(err, foundPost) {
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
})

app.delete('/api/posts/:post_id', function(req, res) {
  db.TextPost.findByIdAndRemove(req.params.post_id, function(err, deletedPost) {
    if (err) { console.log('error', err); }
    res.send(200);
  });
})

app.post('/api/posts/:post_id/comments', function(req, res) {

})

app.get('/api/posts/:post_id/comments/:comment_id', function(req, res) {

})

app.put('/api/posts/:post_id/comments/:comment_id', function(req, res) {

})

app.delete('/api/posts/:post_id/comments/:comment_id', function(req, res) {

})

let port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log(`Listening on port ${ port }`);
});
