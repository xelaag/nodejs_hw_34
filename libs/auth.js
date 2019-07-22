module.exports.auth = (body, admin) =>
  new Promise(async (resolve, reject) => {
    try {
      const { email, password } = body;
      const { login, password: aPassord } = admin;
      if (email !== login || password !== aPassord) {
        reject(false);
        return;
      }
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
