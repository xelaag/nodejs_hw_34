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
  const skills = db.get('skills').value();
  return skills;
};
module.exports.add = ({ age, concerts, cities, years }) => {
  // Add a skills
  try {
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

    return true;
  } catch (error) {
    return error;
  }
};
