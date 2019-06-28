const nodemailer = require('nodemailer');
const config = require('../config.json');

exports.auth = ({ name, email, message }) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!name || !email || !message) {
        reject('Name, email and message are required!');
        return;
      }

      const transporter = nodemailer.createTransport(config.mail.smtp);
      const mailOptions = {
        from: `"${name}" <${email}>`,
        to: config.mail.smtp.auth.user,
        subject: config.mail.subject,
        text: message.trim().slice(0, 500) + `\n Отправлено с: <${email}>`
      };
      // отправляем почту
      transporter.sendMail(mailOptions, (error, info) => {
        // если есть ошибки при отправке - сообщаем об этом
        if (error) {
          reject('Email hasn`t been sent');
          return;
        }
        resolve(info);
      });
    } catch (error) {
      reject({
        success: false,
        status: 500
      });
    }
  });
