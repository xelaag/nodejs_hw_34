/* eslint-disable no-console */
const config = require('../config.json');

exports.auth = (req, res) => {
  if (req.session.isAdmin) {
    return res.redirect('/admin');
  }
  const { email, password } = req.body;

  if (!email || !password) {
    req.flash('login', '🙏 заполните все поля');
    return res.redirect('/login');
  }
  if (email !== config.admin.login || password !== config.admin.password) {
    req.flash('login', '☹️ неверный логин или пароль');
    return res.redirect('/login');
  }
  req.session.isAdmin = true;
  return res.redirect('/admin');
};

// render index.pub and load products and skills
module.exports.get = async (req, res) => {
  if (req.session.isAdmin) {
    return res.redirect('/admin');
  }
  res.render('pages/login', { msgslogin: req.flash('login')[0] });
};
