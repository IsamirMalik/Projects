import nodemailer from "nodemailer";

const sendEmail = async (email, subject, message, isHtml = false) => {

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_FROM_EMAIL, // sender address
    to: email, // receiver
    subject: subject, // subject line
  };

  if (isHtml) {
    mailOptions.html = message;
  } else {
    mailOptions.text = message;
  }

  await transporter.sendMail(mailOptions);
};

export default sendEmail;