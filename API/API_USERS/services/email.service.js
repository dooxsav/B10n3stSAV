const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const mailConfigFile = require("../config/mail.config.json");

/** Configuration de nodemailer */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: mailConfigFile.development.user,
    pass: mailConfigFile.development.pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

/** Fonction d'envoi du mail */
const sendEmail = (templateName, data, to, subject, callback) => {
  fs.readFile(`./templates/${templateName}.hbs`, "utf8", (err, source) => {
    if (err) {
      console.error(err);
      return callback(false);
    }

    const template = handlebars.compile(source);
    const html = template(data);

    const mailOptions = {
      from: "[BIONEST FRANCE] Service SAV <contact@bionest-tech.com>",
      to,
      subject,
      html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return callback(false);
      }

      console.log("Message sent: %s", info.messageId);
      callback(true);
    });
  });
};

module.exports = {
  sendEmail,
};
