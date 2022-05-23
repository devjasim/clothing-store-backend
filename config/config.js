dotenv.config();
import dotenv from 'dotenv';

export default {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  REMOTE_CLIENT_APP: process.env.REMOTE_CLIENT_APP,
  JWT_SECRET: process.env.JWT_SECRET,
  MAIL_EMAIL: process.env.MAIL_EMAIL,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD
}
