const authLib = require('../libs/auth.js');
const config = require('../config.json');

module.exports.get = async ctx => {
  try {
    if (ctx.session.isAuth) {
      return ctx.redirect('/admin');
    }
    const msgslogin =
      ctx.flash && ctx.flash.get() ? ctx.flash.get().msgslogin : null;
    return ctx.render('login', { msgslogin });
  } catch (error) {
    console.error('err get login render', error);
    ctx.status = 404;
  }
};

module.exports.auth = async ctx => {
  try {
    const { email, password } = ctx.request.body;
    if (!email || !password) {
      ctx.flash.set({ msgslogin: '🙏 заполните все поля' });
      return ctx.redirect('/login');
    }
    const isAdmin = await authLib.auth(ctx.request.body, config.admin);

    if (isAdmin) {
      ctx.session.isAuth = true;
      return ctx.render('admin');
    } else {
      ctx.flash.set({ msgslogin: '☹️ неверный логин или пароль' });
      return ctx.redirect('/login');
    }
  } catch (error) {
    console.error('err login page: ', error);
    ctx.flash.set({ msgslogin: '☹️ что то пошло не так...' });
    return ctx.redirect('/login');
  }
};
