import dotenv from "dotenv";

dotenv.config();

export = {
  driver: 'smtp',
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USERNAME, // generated ethereal user
    pass: process.env.MAIL_PASSWORD // generated ethereal password
  },
  tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
  },
  maxConnections: 5,
  maxMessages: 100,
  rateLimit: 10
}
