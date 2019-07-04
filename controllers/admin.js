/* eslint-disable no-console */
const fs = require('fs');
const formidable = require('formidable');
const path = require('path');
const productsModel = require(path.join(__dirname, '../models/products.js'));
const skillsModel = require(path.join(__dirname, '../models/skills.js'));
const config = require('../config.json');

// module.exports.get = function(req, res) {
//   res.render('../views/pages/admin');
// };

module.exports.get = async (req, res) => {
  res.render('pages/admin', {
    msgskill: req.flash('skills')[0],
    msgfile: req.flash('products')[0]
  });
};

module.exports.addSkills = (req, res) => {
  const { age, concerts, cities, years } = req.body;
  if (age && concerts && cities && years) {
    const result = skillsModel.add(req.body);
    if (result === true) {
      console.log('skills have been updated');
      req.flash('skills', '️👍 skills обновлены');
      return res.redirect('/admin');
    }
    console.log('error while update skills', result);
    req.flash('skills', '☹️ skills не обновлены');
    return res.redirect('/admin');
  } else {
    req.flash('skills', '🙏 заполните все поля');
    return res.redirect('/admin');
  }
};

module.exports.addProducts = (req, res) => {
  let form = new formidable.IncomingForm();
  let upload = path.join(process.cwd(), config.upload.path);

  form.uploadDir = upload;

  form.parse(req, function(err, fields, files) {
    if (err) {
      console.log('error while pars upload form', err);
      req.flash('products', '☹️ продукт не добавлен');
      return res.redirect('/admin');
    }
    const { name, price } = fields;
    const { name: nameFile, size, path } = files.photo;

    if (nameFile === '' || size === 0) {
      console.log('error not download picture', err);
      req.flash('products', '☹️ не добавлена фото');
      return res.redirect('/admin');
    }
    if (!name || !price) {
      console.log('error empty name or price', err);
      req.flash('products', '☹️ все поля обязательны');
      return res.redirect('/admin');
    }

    const fileName = path.join(upload, nameFile);

    fs.renameSync(path, fileName, err => {
      if (err) {
        console.log('error while rename filename', err);
        req.flash('products', '☹️ products не добавлены');
        return res.redirect('/admin');
      }
    });

    const src = fileName.substr(fileName.indexOf('\\'));

    productsModel.add(src, name, price);
    res.redirect('/admin');
  });
};
