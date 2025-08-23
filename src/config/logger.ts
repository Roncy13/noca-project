import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize } = format;
const myFormat = printf(({ level, message, timestamp: ts }: any) => {
  return `${ts} ${level}: ${message}`;
});

export default createLogger({
  format: combine(
    colorize(),
    timestamp(),
    myFormat,
  ),
  transports: [new transports.Console()]
});