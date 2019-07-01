/* eslint-disable no-console */
const express = require('express');
const app = express();
const path = require('path');
const nocache = require('nocache');
const session = require('express-session');
const bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(nocache());

app.use(
  session({
    secret: 'homework',
    key: 'sessionkey',
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 10 * 60 * 1000
    },
    saveUninitialized: false,
    resave: false
  })
);

app.use('/', require(path.join(__dirname, './router')));

//catch 404 errors
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  // res.render('./views/pages/login.pug', { message: err.message, error: err });
  res.send({ message: err.status });
});

const server = app.listen(process.env.PORT || 3000, function() {
  console.log('Server running on localhost:' + server.address().port);
});
