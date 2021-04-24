const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "b84164b1aff146",
    pass: "1d83a8122c42cf"
  }
});

module.exports = transport;
