/* eslint-disable no-console */
const express = require('express');
const router = express.Router();

const indexCtrl = require('../controllers/index');
const loginCtrl = require('../controllers/login');
const adminCtrl = require('../controllers/admin');
// const emailCtrl = require('../controlers/email');

router.get('/', indexCtrl.get);
router.post('/', indexCtrl.sendEmail);

const isAdmin = (req, res, next) => {
  if (req.session.isAdmin) {
    console.log('isAdmin - yes');
    return next();
  }
  console.log('isAdmin - no');
  res.redirect('/login');
};

router.post('/admin/upload', isAdmin, adminCtrl.addProducts);

router.get('/login', loginCtrl.get);

router.post('/login', loginCtrl.auth);

router.get('/admin', isAdmin, adminCtrl.get);

router.post('/admin/skills', isAdmin, adminCtrl.addSkills);

module.exports = router;
