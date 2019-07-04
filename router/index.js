const Router = require('koa-router');
const router = new Router();

const productsCtrl = require('../models/products.js');
const authCtrl = require('../controllers/auth.js');
const skillsCtrl = require('../models/skills.js');
const indexCtrl = require('../controllers/index.js');

router.get('/', indexCtrl.get);
router.post('/', indexCtrl.sendEmail);
router.get('/admin', async ctx => {
  try {
    if (ctx.session.isAuth) {
      const msgskill =
        ctx.flash && ctx.flash.get() ? ctx.flash.get().msgskill : null;
      const msgfile =
        ctx.flash && ctx.flash.get() ? ctx.flash.get().msgfile : null;

      ctx.render('admin', {
        msgskill,
        msgfile
      });
    } else {
      ctx.redirect('/login');
    }
  } catch (error) {
    console.error('err', error);
    ctx.status = 404;
  }
});
router.post('/admin/upload', async ctx => {
  try {
    await productsCtrl.add({ ...ctx.request.files, ...ctx.request.body });
    ctx.render('admin');
  } catch (error) {
    console.error('err', error);
    ctx.flash.set({ msgfile: error });
    ctx.redirect('/admin');
  }
});
router.get('/login', async ctx => {
  try {
    const msgslogin =
      ctx.flash && ctx.flash.get() ? ctx.flash.get().msgslogin : null;
    ctx.render('login', { msgslogin });
  } catch (error) {
    console.error('err', error);
    ctx.status = 404;
  }
});
router.post('/login', async ctx => {
  try {
    await authCtrl.auth(ctx.request.body);
    ctx.session.isAuth = true;
    ctx.redirect('admin');
  } catch (error) {
    console.error('err', error);
    ctx.flash.set({ msgslogin: error });
    ctx.redirect('/login');
  }
});
router.post('/admin/skills', async ctx => {
  try {
    console.log('tx.request.body:', ctx.request.body);
    await skillsCtrl.add({ ...ctx.request.body });
    ctx.render('admin');
  } catch (error) {
    console.error('err', error);
    ctx.flash.set({ msgskill: error });
    ctx.redirect('/admin');
  }
});

module.exports = router;
