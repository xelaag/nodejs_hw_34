/* eslint-disable no-console */
const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(path.join(__dirname, '../lowDb/db.json'));
const db = low(adapter);
// Set some defaults (required if your JSON file is empty)
db.defaults({ products: [], skills: [] }).write();

module.exports.get = () => {
  try {
    const skills = db.get('skills').value();
    return skills;
  } catch (error) {
    console.log('Error to get skills: ', error);
    return {
      success: false,
      status: 500
    };
  }
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
    console.log('Skills has been updated');

    return true;
  } catch (error) {
    return false;
  }
};
