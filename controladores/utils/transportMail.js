const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  auth: {
    user: "ciutadaverd@outlook.es",
    pass: "somdevbmns202!"
  }
});

module.exports = transport;
