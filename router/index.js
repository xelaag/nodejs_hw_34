const Router = require('koa-router');
const router = new Router();

const productsCtrl = require('../controlers/products.js');
const authCtrl = require('../controlers/auth.js');
const skillsCtrl = require('../controlers/skills.js');

router.get('/', async (ctx) => {
  try {
    const products = await productsCtrl.get();
    const skills = await skillsCtrl.get();
    ctx.render('index', {
      products,
      skills
    });
  } catch (error) {
    console.error('err', error);
    if (error.status) {
      ctx.status = error.status;
    } else {
      ctx.status = 500;
    }
  }
});
router.get('/admin', async (ctx) => {
  try {
    if (ctx.session.isAuth) {
      ctx.render('admin');
    } else {
      ctx.redirect('/login');
    }
  } catch (error) {
    console.error('err', error);
    ctx.status = 404;
  }
});
router.post('/admin/upload', async (ctx) => {
  try {
    await productsCtrl.add({ ...ctx.request.files, ...ctx.request.body });
    ctx.render('admin');
  } catch (error) {
    console.error('err', error);
    ctx.status = 404;
  }
});
router.get('/login', async (ctx) => {
  try {
    const msgslogin =
      ctx.flash && ctx.flash.get() ? ctx.flash.get().msgslogin : null;
    ctx.render('login', { msgslogin });
  } catch (error) {
    console.error('err', error);
    ctx.status = 404;
  }
});
router.post('/login', async (ctx) => {
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
router.post('/admin/skills', async (ctx) => {
  try {
    
    console.log('tx.request.body:', ctx.request.body)
    await skillsCtrl.add({ ...ctx.request.body });
    ctx.render('admin');
  } catch (error) {
    console.error('err', error);
    ctx.status = 404;
  }
});

module.exports = router;
