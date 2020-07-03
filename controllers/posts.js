const Post = require('../models/post');
const User = require('../models/user');

module.exports = (app) => {

    // INDEX
    app.get('/', (req, res) => {
        const currentUser = req.user;
        // res.render('home', {});
        console.log(req.cookies);
        Post.find().populate('author')
        .then(posts => {
            res.render('posts-index', { posts, currentUser });
            // res.render('home', {});
        }).catch(err => {
            console.log(err.message);
        })
    })

    
    // CREATE
    app.post("/posts/new", (req, res) => {
        if (req.user) {
            const post = new Post(req.body);
            post.author = req.user._id;

            post
                .save()
                .then(post => {
                    return User.findById(req.user._id);
                })
                .then(user => {
                    user.posts.unshift(post);
                    user.save();
                    // REDIRECT TO THE NEW POST
                    res.redirect(`/posts/${post._id}`);
                })
                .catch(err => {
                    console.log(err.message);
                });
        } else {
            console.log('no user found')
            return res.status(401); // UNAUTHORIZED
        }

    });

    // New Post Route with async/await
    app.get('/posts/new', async (req, res) => {
        const currentUser = req.user;
        res.render('posts-new', { currentUser });
    })

    // SHOW
    app.get("/posts/:id", function (req, res) {
        const currentUser = req.user;
        Post.findById(req.params.id).populate('comments').lean()
            .then(post => {
                res.render("posts-show", { post, currentUser });  
            })
            .catch(err => {
                console.log(err.message);
            });
    });

    // SUBREDDIT
    app.get("/n/:subreddit", function (req, res) {
        var currentUser = req.user;
        Post.find({ subreddit: req.params.subreddit }).lean()
            .then(posts => {
                res.render("posts-index", { posts, currentUser });
            })
            .catch(err => {
                console.log(err);
            });
    });
};