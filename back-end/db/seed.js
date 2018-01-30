let db = require("../models");

let myComments = [
{
  content: "consectetur adipisicing elit",
  votes: 22
},
{
  content: "Lorem ipsum dolor sit amet",
  votes: 20
},
{
  content: "blah blah blah blah blah",
  votes: 15
},
{
  content: "tempor incididunt ut labore et dolore",
  votes: 45
}
]

let myTextPost = [
{
  title: "Cool Story, bro.",
  content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  thumbnail_image_url: "http://www.defendersource.com/forum/images/dto_garage/users/5810/1076.jpg",
  votes: 4,
  comments: []
},
{
  title: "BLAH",
  content: "blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah",
  thumbnail_image_url: "https://2p2bboli8d61fqhjiqzb8p1a-wpengine.netdna-ssl.com/wp-content/uploads/2016/05/bmw-m5-tire-stickers-520x338.jpg",
  votes: 4,
  comments: []
},
{
  title: "Patriots suck",
  content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  thumbnail_image_url: "http://strongauto.net/wp-content/uploads/images/2014-Mercedes-Benz-S-Class_3069.jpg",
  votes: 4,
  comments: []
}
]

myTextPost.forEach(function(post) {
  post.comments = myComments;
});

db.TextPost.remove({}, function(err, posts){
  db.TextPost.create(myTextPost, function(err, posts){
    if (err) { return console.log('ERROR', err); }
    console.log("all posts:", posts);
    console.log("created", posts.length, "posts");
    process.exit();
  });
});
