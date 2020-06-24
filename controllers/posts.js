const Post = require('../models/post');

module.exports = (app) => {

    // INDEX
    app.get('/', (req, res) => {
        Post.find({}).lean().then(posts => {
            res.render("posts-index", { posts });
        }).catch(err => {
            console.log(err.message);
        });
    });

    
    // CREATE
    app.post('/posts/new', (req, res) => {
        // INSTANTIATE INSTANCE OF POST MODEL
        const post = new Post(req.body);

        // SAVE INSTANCE OF POST MODEL TO DB
        post.save((err, post) => {
        // REDIRECT TO THE ROOT
            return res.redirect(`/`);
        })
    });

    // New Post Route with async/await
    app.get('/posts/new', async (req, res) => {
        try {
            res.render('posts-new', {});
        } catch(err) {
            return console.log(err)
        }
    })

    // SHOW
    app.get("/posts/:id", function(req, res) {
        // LOOK UP THE POST
        Post.findById(req.params.id).then(post => {
            res.render("posts-show", { post });
        }).catch(err => {
            console.log(err.message);
        });
    });

    // SUBREDDIT
    app.get("/n/:subreddit", function(req, res) {
        Post.find({ subreddit: req.params.subreddit })
          .then(posts => {
            res.render("posts-index", { posts });
          }).catch(err => {
            console.log(err);
          });
    });
};