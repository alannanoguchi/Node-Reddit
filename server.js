// Initialize express
const express = require('express')
const app = express()

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

// require handlebars
const exphbs = require('express-handlebars');

// Set db
require('./data/reddit-db');


// Use "main" as our default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// Use handlebars to render
app.set('view engine', 'handlebars');


// Tell our app to send the "hello world" message to our home page
app.get('/', (req, res) => {
    res.render('home', { msg: 'Reddit.js' });
  })


// // New Post Route with async/await
// app.get('/posts/new', async (req, res) => {
//     try {
//         res.render('posts-new', {});
//     } catch(err) {
//         return console.log(err)
//     }
// })


// Must be at the bottom on server.js
require('./controllers/posts.js')(app);

// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})