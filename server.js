// Initialize express
const express = require('express')
const app = express()

require('dotenv').config();

// require handlebars
const exphbs = require('express-handlebars');

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

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

app.use(cookieParser()); // Add this after you initialize express.


const checkAuth = (req, res, next) => {
    console.log("Checking authentication");
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
      req.user = null;
    } else {
      var token = req.cookies.nToken;
      var decodedToken = jwt.decode(token, { complete: true }) || {};
      req.user = decodedToken.payload;
    }

    next();
  };
app.use(checkAuth);


// Set db
require('./data/reddit-db');

// Must be at the bottom on server.js
require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);


// Choose a port to listen on
const port = process.env.PORT || 3002;

module.exports = app;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3002!')
})