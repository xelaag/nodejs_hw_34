/* eslint-disable no-console */
const config = require('../config.json');

exports.auth = (req, res) => {
  if (req.session.isAdmin) {
    return res.redirect('/admin');
  }
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    req.flash('msgslogin', 'Email & pass are required!');
    // req.flash('msgslogin', 'Email & pass are required!');
    // res.local.msgslogin = req.flash('msgslogin');
    // res.local.msgslogin = 'Email & pass are required!';

    console.log('Email & pass are required!');
    return res.redirect('/login');
  }
  if (email !== config.admin.login || password !== config.admin.password) {
    console.log('Неверный логин или пароль');
    return res.redirect('/login');
  }
  req.session.isAdmin = true;
  console.log('Авторизирован');
  return res.redirect('/admin');
};

// render index.pub and load products and skills
module.exports.get = async (req, res) => {
  if (req.session.isAdmin) {
    return res.redirect('/admin');
  }
  res.render('pages/login', { msgslogin: req.flash('login')[0] });
};
