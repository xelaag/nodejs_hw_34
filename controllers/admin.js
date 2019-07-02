/* eslint-disable no-console */
const fs = require('fs');
const formidable = require('formidable');
const path = require('path');
const productsModel = require(path.join(__dirname, '../models/products.js'));
const skillsModel = path.join(__dirname, '../models/skills.js');

// module.exports.get = function(req, res) {
//   res.render('../views/pages/admin');
// };

module.exports.get = async (req, res) => {
  res.render('../views/pages/admin');
};

module.exports.addProducts = (req, res, next) => {
  console.log('First to upload product');
  let form = new formidable.IncomingForm();
  let upload = path.join('./public/assets/img/product');
  console.log('Second to upload product', path.join(process.cwd(), upload));

  if (!fs.existsSync(upload)) {
    fs.mkdirSync(upload);
    console.log('3 to upload product');
  }
  console.log('4 to upload product');

  console.log(`dirname: ${__dirname}`);
  console.log(`cwd: ${process.cwd()}`);

  form.uploadDir = path.join(process.cwd(), upload);

  form.parse(req, function(err, fields, files) {
    if (err) {
      console.log('Error parse: ', err);
      return next(err);
    }

    const valid = validation(fields, files);

    if (valid.err) {
      console.log('valid.err: ', valid.err);
      fs.unlinkSync(files.photo.path);
      return res.redirect(`/admin?msg=${valid.status}`);
    }

    const fileName = path.join(upload, files.photo.name);

    fs.rename(files.photo.path, fileName, function(err) {
      if (err) {
        console.error(err.message);
        return;
      }
      console.log('rename to : ', fileName);

      let product = {};
      product.src = fileName.substr(fileName.indexOf('\\'));
      product.name = fields.name;
      product.price = fields.price;
      console.log('product:', product);

      productsModel.add(product.src, product.name, product.price);
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
