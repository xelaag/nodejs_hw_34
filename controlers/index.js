const skillsModel = require('../models/skills');
const productsModel = require('../models/products');

// render index.pub and load products and skills
module.exports.get = async (req, res) => {
  try {
    let products = await productsModel.get();
    let skills = await skillsModel.get();
    res.render('./pages/index', {
      products,
      skills
    });
  } catch (error) {
    return res.status(500).send({ error: 'something blew up' });
  }
};

// router.get('/', async ctx => {
//   try {
//     const products = await productsCtrl.get();
//     const skills = await skillsCtrl.get();
//     const msgsemail =
//       ctx.flash && ctx.flash.get() ? ctx.flash.get().msgsemail : null;
//     ctx.render('index', {
//       products,
//       skills,
//       msgsemail
//     });
//   } catch (error) {
//     console.error('err', error);
//     if (error.status) {
//       ctx.status = error.status;
//     } else {
//       ctx.status = 500;
//     }
//   }
// });
