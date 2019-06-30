const config = require('../config.json');

exports.auth = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    res.redirect('/login', { msg: 'Email & pass are required!' });
    console.log('Email & pass are required!');
  }
  if (email !== config.admin.login || password !== config.admin.password) {
    console.log('Неверный логин или пароль');
    res.redirect('/login');
  }
  req.session.isAdmin = true;
  console.log('Авторизирован');
  res.redirect('/admin');
};

// render index.pub and load products and skills
module.exports.get = async (req, res) => {
  try {
    res.render('./pages/login', {});
  } catch (error) {
    return res.status(500).send({ error: 'something blew up' });
  }
};
