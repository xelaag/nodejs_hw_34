/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../models/db.json');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(dbPath);
const db = low(adapter);
// Set some defaults (required if your JSON file is empty)
db.defaults({ products: [], skills: [] }).write();

exports.get = () =>
  new Promise(async (resolve, reject) => {
    try {
      const products = db.get('products').value();
      resolve(products);
    } catch (error) {
      reject({
        success: false,
        status: 500
      });
    }
  });
exports.add = ({ photo, name, price }) =>
  new Promise(async (resolve, reject) => {
    try {
      const { name: photoName, size, path: tempPath } = photo;
      const uploadDir = path.join(
        process.cwd(),
        '/public',
        'assets',
        'img',
        'products'
      );
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }

      if (!name || !price) {
        fs.unlinkSync(tempPath);
        reject('All fields are required');
        return;
      }
      if (!photoName || !size) {
        fs.unlinkSync(tempPath);
        reject('File not saved');
        return;
      }

      fs.renameSync(tempPath, path.join(uploadDir, photoName));

      // Add a products
      db.get('products')
        .push({
          src: './assets/img/products/' + photoName,
          name: name,
          price: price
        })
        .write();
      console.log('New Products: ' + name + ' has been saved');
      resolve(true);
    } catch (error) {
      reject({
        success: false,
        status: 500
      });
    }
  });
