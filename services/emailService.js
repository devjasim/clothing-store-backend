import nodemailer from 'nodemailer';
import config from '../config/config.js';

const MAIL_SETTINGS = {
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: true,
  auth: {
    user: config.SMTP_MAIL,
    pass: config.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  }
};

const transporter = nodemailer.createTransport(MAIL_SETTINGS);

export const sendMail = async (params) => {
  try {
    let info = await transporter.sendMail({
      from: '"Stablespay Service" <demo@bakedbeans.is>',
      to: params.to, 
      subject: 'Email verification code',
      html: `
      <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>Welcome to stablespay.com</h2>
        <h4>Without verify your email you cna't login to stablespay.com</h4>
        <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
        <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${params.OTP}</h1>
      </div>
    `,
    });
    return info;
  } catch (error) {
    console.log(error);
    return false;
  }
};