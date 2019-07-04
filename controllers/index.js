/* eslint-disable no-console */
const productsModel = require('../models/products.js');
const skillsModel = require('../models/skills.js');

module.exports.get = async ctx => {
  try {
    const products = await productsModel.get();
    const skills = await skillsModel.get();
    const msgsemail =
      ctx.flash && ctx.flash.get() ? ctx.flash.get().msgsemail : null;
    ctx.render('index', {
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
