const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "Outlook365",
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    ciphers: 'SSLv3',
  },
});



transporter
  .verify()
  .then(() => {
    console.log('Mail server is ready');
  })
  .catch((err) => {
    console.error('Error verifying mail server:', err);
  });

async function sendEmail(to, subject, text, html) {
  try {
    await transporter.sendMail({
      from: `BPIT Admissions <${process.env.EMAIL_USER}>`,
      to: Array.isArray(to) ? to.join(',') : to,
      subject,
      text,
      html,
    });

    return true;
  } catch (error) {
    console.error('Nodemailer error:', error);
    return false;
  }
}

module.exports = sendEmail;
