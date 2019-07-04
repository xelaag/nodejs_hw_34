const nodemailer = require('nodemailer');

module.exports.auth = (data, connection) =>
  new Promise(async (resolve, reject) => {
    try {
      const { name, email, message } = data;
      const transporter = nodemailer.createTransport(connection.smtp);
      const mailOptions = {
        from: `"${name}" <${email}>`,
        to: connection.smtp.auth.user,
        subject: connection.subject,
        text: message.trim().slice(0, 500) + `\n Отправлено с: <${email}>`
      };
      // отправляем почту
      transporter.sendMail(mailOptions, error => {
        // если есть ошибки при отправке - сообщаем об этом
        if (error) {
          reject('Email hasn`t been sent');
          return;
        }
        resolve(true);
      });
    } catch (error) {
      reject(error);
    }
  });
