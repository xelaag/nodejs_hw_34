const express = require('express');
const router = express.Router();

const indexCtrl = require('../controlers/index');
const loginCtrl = require('../controlers/login');
const adminCtrl = require('../controlers/admin');
// const emailCtrl = require('../controlers/email');

router.get('/', indexCtrl.get);

// router.post('/', productsCtrl.post);

// router.post('/', async ctx => {
//   try {
//     await emailCtrl.auth(ctx.request.body);
//     ctx.flash.set({ msgsemail: 'Email has been sent!' });
//     ctx.redirect('/');
//   } catch (error) {
//     console.error('err', error);
//     ctx.flash.set({ msgsemail: error });
//     ctx.redirect('/');
//   }
// });

const isAdmin = (req, res, next) => {
  if (req.session.isAdmin) {
    console.log('isAdmin - yes');
    return next();
  }
  res.redirect('/login');
};

// router.get('/admin', async ctx => {
//   try {
//     if (ctx.session.isAuth) {
//       const msgskill =
//         ctx.flash && ctx.flash.get() ? ctx.flash.get().msgskill : null;
//       const msgfile =
//         ctx.flash && ctx.flash.get() ? ctx.flash.get().msgfile : null;

//       ctx.render('admin', {
//         msgskill,
//         msgfile
//       });
//     } else {
//       ctx.redirect('/login');
//     }
//   } catch (error) {
//     console.error('err', error);
//     ctx.status = 404;
//   }
// });

router.post('/admin/upload', isAdmin, adminCtrl.addProducts);

// router.post('/admin/upload', async ctx => {
//   try {
//     await productsCtrl.add({ ...ctx.request.files, ...ctx.request.body });
//     ctx.render('admin');
//   } catch (error) {
//     console.error('err', error);
//     ctx.flash.set({ msgfile: error });
//     ctx.redirect('/admin');
//   }
// });

router.get('/login', loginCtrl.get);

// router.get('/login', async ctx => {
//   try {
//     const msgslogin =
//       ctx.flash && ctx.flash.get() ? ctx.flash.get().msgslogin : null;
//     ctx.render('login', { msgslogin });
//   } catch (error) {
//     console.error('err', error);
//     ctx.status = 404;
//   }
// });

router.post('/login', loginCtrl.auth);

// router.post('/login', async ctx => {
//   try {
//     await authCtrl.auth(ctx.request.body);
//     ctx.session.isAuth = true;
//     ctx.redirect('admin');
//   } catch (error) {
//     console.error('err', error);
//     ctx.flash.set({ msgslogin: error });
//     ctx.redirect('/login');
//   }
// });
router.get('/admin', isAdmin, adminCtrl.get);

// router.post('/admin/skills', skillsCtrl.post);

// router.post('/admin/skills', async ctx => {
//   try {
//     console.log('tx.request.body:', ctx.request.body);
//     await skillsCtrl.add({ ...ctx.request.body });
//     ctx.render('admin');
//   } catch (error) {
//     console.error('err', error);
//     ctx.flash.set({ msgskill: error });
//     ctx.redirect('/admin');
//   }
// });

module.exports = router;
