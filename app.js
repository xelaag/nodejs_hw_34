/* eslint-disable no-console */
const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const nocache = require('nocache');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const config = require(path.join(__dirname, './config.json'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(nocache());

app.use(cookieParser());
app.use(
  session({
    secret: 'login',
    key: 'mySess',
    cookie: {
      // path: '/',
      // httpOnly: true,
      maxAge: 10 * 60 * 1000
    },
    saveUninitialized: true,
    resave: true
  })
);
//session fo mail
app.use(
  session({
    secret: 'mail',
    saveUninitialized: true,
    resave: true
  })
);

app.use(flash());

app.use('/', require(path.join(__dirname, './router/index')));

//catch 404 errors
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  // render the error page
  res.status(err.status || 500);
  // res.render('./views/pages/login.pug', { message: err.message, error: err });
  res.send({ message: err.status });
});

const server = app.listen(process.env.PORT || config.port, function() {
  console.log('Server running on localhost:' + server.address().port);
  if (!fs.existsSync(path.join(__dirname, config.upload.path))) {
    fs.mkdirSync(path.join(__dirname, config.upload.path));
  }
});
