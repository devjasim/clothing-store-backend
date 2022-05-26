dotenv.config();
import dotenv from 'dotenv';

export default {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  REMOTE_CLIENT_APP: process.env.REMOTE_CLIENT_APP,
  JWT_SECRET: process.env.JWT_SECRET,
  SMTP_MAIL: process.env.SMTP_MAIL,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID
}
