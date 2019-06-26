exports.auth = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!email || !password) {
        reject('Email & pass are required!');
        return;
      }
      if (email !== 'admin@admin.com' || password !== '123') {
        reject('Unathorized!');
        return;
      }
      resolve(true);
    } catch (error) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({
        success: false,
        status: 500
      });
    }
  });
