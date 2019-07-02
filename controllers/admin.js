/* eslint-disable no-console */
const fs = require('fs');
const formidable = require('formidable');
const path = require('path');
const productsModel = require(path.join(__dirname, '../models/products.js'));
const skillsModel = require(path.join(__dirname, '../models/skills.js'));

// module.exports.get = function(req, res) {
//   res.render('../views/pages/admin');
// };

module.exports.get = async (req, res) => {
  res.render('../views/pages/admin');
};

module.exports.addSkills = (req, res, next) => {
  const result = skillsModel.add(req.body);
  if (!result) {
    return next(err);
  }
  res.redirect('/admin');
};

module.exports.addProducts = (req, res, next) => {
  let form = new formidable.IncomingForm();
  let upload = path.join('./public/assets/img/product');

  if (!fs.existsSync(upload)) {
    fs.mkdirSync(upload);
  }

  form.uploadDir = path.join(process.cwd(), upload);

  form.parse(req, function(err, fields, files) {
    if (err) {
      return next(err);
    }

    const valid = validation(fields, files);

    if (valid.err) {
      fs.unlinkSync(files.photo.path);
      return res.redirect(`/admin?msg=${valid.status}`);
    }

    const fileName = path.join(upload, files.photo.name);

    fs.rename(files.photo.path, fileName, function(err) {
      if (err) {
        console.error(err.message);
        return next(err);
      }

      const src = fileName.substr(fileName.indexOf('\\'));

      productsModel.add(src, fields.name, fields.price);
      res.redirect('/admin');
    });
  });
};

const validation = (fields, files) => {
  if (files.photo.name === '' || files.photo.size === 0) {
    return { status: 'Не загружена картинка!', err: true };
  }
  if (!fields.name || !fields.price) {
    return { status: 'Не указано описание картинки!', err: true };
  }
  return { status: 'Ok', err: false };
};
