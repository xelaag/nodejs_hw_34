const fs = require('fs');
const formidable = require('formidable');
const path = require('path');
const productsModel = path.join(__dirname, '../models/products.js');
const skillsModel = path.join(__dirname, '../models/skills.js');

module.exports.get = (req, res) => {
  try {
    res.render('./pages/admin');
  } catch (error) {
    return res.status(500).send({ error: 'something blew up' });
  }
};

module.exports.addProducts = (req, res, next) => {
  let form = new formidable.IncomingForm();
  let upload = path.join('../public/assets', 'img');

  if (!fs.existsSync(upload)) {
    fs.mkdirSync(upload);
  }

  console.log(`dirname: ${__dirname}`);
  console.log(`cwd: ${process.cwd()}`);

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
        return;
      }
      let product = {};
      product.src = fileName.substr(fileName.indexOf('\\'));
      product.name = fields.name;
      product.price = fields.price;

      productsModel.add(product);
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
