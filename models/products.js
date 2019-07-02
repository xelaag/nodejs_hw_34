/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(path.join(__dirname, '../lowDb/db.json'));
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

module.exports.add = (src, name, price) => {
  // Add a products
  db.get('products')
    .push({ src, name, price })
    .write();
  console.log('New Products: ' + name + ' has been saved');
  return true;
};
