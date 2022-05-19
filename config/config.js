dotenv.config();
import dotenv from 'dotenv';

export default {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  REMOTE_CLIENT_APP: process.env.REMOTE_CLIENT_APP
}
