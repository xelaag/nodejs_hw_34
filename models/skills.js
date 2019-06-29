/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const skillsPath = path.join(__dirname, '../temp/skills.json');

exports.add = ({ age, concerts, cities, years }) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!age || !concerts || !cities || !years) {
        reject('All fields are required');
        return;
      }

      let skills = [];

      try {
        fs.accessSync(skillsPath);
        skills = JSON.parse(fs.readFileSync(skillsPath, 'utf-8'));
      } catch (err) {
        console.log('No dir: ', skillsPath);
      }

      skills = [
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
      ];

      fs.writeFileSync(
        path.join(process.cwd(), '/temp/skills.json'),
        JSON.stringify(skills)
      );
      resolve(true);
    } catch (error) {
      console.log('Error to save skills: ', error);

      reject({
        success: false,
        status: 500
      });
    }
  });
exports.get = () =>
  new Promise(async (resolve, reject) => {
    try {
      let skills = [];
      if (fs.existsSync(skillsPath)) {
        skills = JSON.parse(fs.readFileSync(skillsPath, 'utf-8'));
      }
      resolve(skills);
    } catch (error) {
      console.log('Error to get skills: ', error);
      reject({
        success: false,
        status: 500
      });
    }
  });
