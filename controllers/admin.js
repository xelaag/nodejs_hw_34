const fs = require('fs');
const productsModel = require('../models/products.js');
const skillsModel = require('../models/skills.js');
const config = require('../config.json');

module.exports.get = async ctx => {
  try {
    if (ctx.session.isAuth) {
      const msgskill =
        ctx.flash && ctx.flash.get() ? ctx.flash.get().msgskill : null;
      const msgfile =
        ctx.flash && ctx.flash.get() ? ctx.flash.get().msgfile : null;

      return ctx.render('admin', {
        msgskill,
        msgfile
      });
    } else {
      return ctx.redirect('/login');
    }
  } catch (error) {
    ctx.status = 404;
  }
};

module.exports.addProducts = async ctx => {
  try {
    if (!ctx.session.isAuth) {
      ctx.redirect('/login');
    }
    const { name: photoName, size, path: tempPath } = ctx.request.files.photo;
    const { name, price } = ctx.request.body;

    if (!name || !price) {
      fs.unlinkSync(tempPath);
      ctx.flash.set({ msgfile: '☹️ все поля обязательны' });
      return ctx.redirect('/admin');
    }
    if (!photoName || !size) {
      fs.unlinkSync(tempPath);
      ctx.flash.set({ msgfile: '☹️ фото не загружено' });
      return ctx.redirect('/admin');
    }
    await productsModel.add(
      ctx.request.files.photo,
      ctx.request.body,
      config.upload.path
    );
    ctx.flash.set({ msgfile: '️👍 продукт добавлен' });
    return ctx.redirect('/admin');
  } catch (error) {
    ctx.flash.set({ msgfile: '☹️ что то пошло не так...' });
    return ctx.redirect('/admin');
  }
};

module.exports.addSkills = async ctx => {
  try {
    const { age, concerts, cities, years } = ctx.request.body;
    if (age && concerts && cities && years) {
      await skillsModel.add(ctx.request.body);
      ctx.flash.set({ msgskill: '️👍 skills обновлен' });
      return ctx.redirect('/admin');
    } else {
      ctx.flash.set({ msgskill: '🙏 заполните все поля' });
      return ctx.redirect('/admin');
    }
  } catch (error) {
    ctx.flash.set({ msgskill: '☹️ skills не обновлены' });
    return ctx.redirect('/admin');
  }
};
