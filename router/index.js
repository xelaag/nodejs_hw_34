const Router = require('koa-router');
const router = new Router();

const indexCtrl = require('../controllers/index.js');
const adminCtrl = require('../controllers/admin.js');
const loginCtrl = require('../controllers/login.js');

router.get('/', indexCtrl.get);
router.post('/', indexCtrl.sendEmail);
router.get('/admin', adminCtrl.get);
router.post('/admin/upload', adminCtrl.addProducts);
router.post('/admin/skills', adminCtrl.addSkills);
router.get('/login', loginCtrl.get);
router.post('/login', loginCtrl.auth);

module.exports = router;
