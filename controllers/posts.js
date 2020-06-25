const Post = require('../models/post');

module.exports = (app) => {

    // INDEX
    app.get("/", (req, res) => {
        const currentUser = req.user;
      
        Post.find({})
          .then(posts => {
            res.render("posts-index", { posts, currentUser });
          })
          .catch(err => {
            console.log(err.message);
          });
      });

    
    // CREATE
    app.post("/posts/new", (req, res) => {
        if (req.user) {
            const post = new Post(req.body);
        
            post.save(function(err, post) {
                return res.redirect(`/`);
            });
        } else {
            return res.status(401); // UNAUTHORIZED
        }
    });

    // New Post Route with async/await
    app.get('/posts/new', async (req, res) => {
        try {
            res.render('posts-new', {});
        } catch(err) {
            return console.log(err)
        }
    })

    app.get("/posts/:id", function(req, res) {
        // LOOK UP THE POST
        Post.findById(req.params.id).populate('comments').lean()
          .then(post => {
            res.render("posts-show", { post });  
          })
          .catch(err => {
              console.log(err.message);
          });
      });

    // SUBREDDIT
    app.get("/n/:subreddit", function(req, res) {
        Post.find({ subreddit: req.params.subreddit })
          .then(posts => {
            res.render("posts-index", { posts });
          })
          .catch(err => {
            console.log(err);
          });
    });
};