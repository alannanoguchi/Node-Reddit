// Initialize express
const express = require('express')
const app = express()

// require handlebars
const exphbs = require('express-handlebars');

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');


// MIDDLEWARE instantiations
// Use Body Parser- node.js body parsing middleware communicates with POST requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!- another middleware, validates and sanitizes string inputs
app.use(expressValidator());


// Use "main" as our default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));

// Use handlebars to render
app.set('view engine', 'handlebars');


// Set db
require('./data/reddit-db');

// Must be at the bottom on server.js
require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);

// Choose a port to listen on
const port = process.env.PORT || 3001;

module.exports = app;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3001!')
})