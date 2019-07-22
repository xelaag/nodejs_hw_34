/* eslint-disable no-console */
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');
const config = require('../config.json');

const adapter = new FileSync(path.join(__dirname, config.db.file));
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ products: [], skills: [] }).write();

module.exports.get = () => {
  const products = db.get('products').value();
  return products;
};

module.exports.add = (src, name, price) => {
  // Add a products
  db.get('products')
    .push({ src, name, price })
    .write();
  console.log('New Products: ' + name + ' has been saved');
  return true;
};
