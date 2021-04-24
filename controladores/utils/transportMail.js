const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.mail.yahoo.com",
  port: 465,
  auth: {
    user: "puntociudadano@yahoo.com",
    pass: "Somdevbmns202!"
  }
});

module.exports = transport;
