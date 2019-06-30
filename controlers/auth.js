const config = require('../config.json');

exports.auth = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!email || !password) {
        reject('Email & pass are required!');
        return;
      }
      if (email !== config.mail || password !== config.password) {
        reject('Unathorized!');
        return;
      }
      resolve(true);
    } catch (error) {
      reject({
        success: false,
        status: 500
      });
    }
  });

// render index.pub and load products and skills
module.exports.get = async (req, res) => {
  try {
    res.render('./pages/login', {});
  } catch (error) {
    return res.status(500).send({ error: 'something blew up' });
  }
};
