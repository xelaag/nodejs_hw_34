const nodemailer = require('nodemailer');
const config = require('../config.json');
const skillsModel = require('../models/skills');
const productsModel = require('../models/products');

// render index.pub and load products and skills
module.exports.get = (req, res) => {
  let products = productsModel.get();
  let skills = skillsModel.get();
  res.render('pages/index', {
    msgsemail: req.flash('info')[0],
    products,
    skills
  });
};

module.exports.sendEmail = (req, res) => {
  const { name, email, message } = req.body;

  if (name && email && message) {
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
        console.log('error sent email:', error);

        req.flash('info', '☹️ сообщение не отправлено');
        return res.redirect('/#status');
      }
      req.flash('info', '👍 сообщение отправлено');
      return res.redirect('/#status');
    });
  } else {
    req.flash('info', '🙏 заполните все поля');
    return res.redirect('/#status');
  }
};
