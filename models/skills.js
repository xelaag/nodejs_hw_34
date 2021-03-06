/* eslint-disable no-console */
const path = require('path');
const config = require('../config.json');
const dbPath = path.join(__dirname, config.db.file);
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(dbPath);
const db = low(adapter);
// Set some defaults (required if your JSON file is empty)
db.defaults({ products: [], skills: [] }).write();

exports.get = () =>
  new Promise(async (resolve, reject) => {
    try {
      const skills = db.get('skills').value();
      resolve(skills);
    } catch (error) {
      console.log('Error to get skills: ', error);
      reject(error);
    }
  });
exports.add = ({ age, concerts, cities, years }) =>
  new Promise(async (resolve, reject) => {
    try {
      // Add a skills
      db.set('skills', [
        {
          number: age,
          text: 'Возраст начала занятий на скрипке'
        },
        {
          number: concerts,
          text: 'Концертов отыграл'
        },
        {
          number: cities,
          text: 'Максимальное число городов в туре'
        },
        {
          number: years,
          text: 'Лет на сцене в качестве скрипача'
        }
      ]).write();
      console.log('Skills has been updated');

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
