const Post = require('../models/post');

module.exports = (app) => {

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
};