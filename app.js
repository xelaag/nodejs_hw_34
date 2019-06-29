/* eslint-disable no-console */
const express = require('express');
const app = express();
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, './public')));

app.use('/', require(path.join(__dirname, './router')));

const server = app.listen(process.env.PORT || 3000, function() {
  console.log('Server running on localhost:' + server.address().port);
});
