/* eslint-disable no-console */
const productsModel = require('../models/products.js');
const skillsModel = require('../models/skills.js');
const emailLib = require('../libs/email.js');
const config = require('../config.json');

module.exports.get = async ctx => {
  try {
    const products = await productsModel.get();
    const skills = await skillsModel.get();
    const msgsemail =
      ctx.flash && ctx.flash.get() ? ctx.flash.get().msgsemail : null;
    return ctx.render('index', {
      products,
      skills,
      msgsemail
    });
  } catch (error) {
    console.log('err', error);
    if (error.status) {
      ctx.status = error.status;
    } else {
      ctx.status = 500;
    }
  }
};

module.exports.sendEmail = async ctx => {
  try {
    const { name, email, message } = ctx.request.body;
    if (!name || !email || !message) {
      ctx.flash.set({ msgsemail: '🙏 заполните все поля' });
      return ctx.redirect('/#status');
    }
    await emailLib.send(ctx.request.body, config.mail);
    ctx.flash.set({ msgsemail: '👍 сообщение отправлено' });
    return ctx.redirect('/#status');
  } catch (error) {
    console.error('err send email', error);
    ctx.flash.set({ msgsemail: '☹️ сообщение не отправлено' });
    return ctx.redirect('/#status');
  }
};
