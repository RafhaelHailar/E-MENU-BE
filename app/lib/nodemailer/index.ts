import nodemailer from "nodemailer";

// for sending email messages

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    type: "login",
    user: process.env.NODEMAILER_EMAIL_USER,
    pass: process.env.NODEMAILER_EMAIL_APP_PASSWORD,
  },
});

export default transporter;
