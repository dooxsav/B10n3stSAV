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
});

/** Fonction d'envoi du mail */
const sendMail = (templateName, data, to, object) => {
  return fs.readFile();
};
