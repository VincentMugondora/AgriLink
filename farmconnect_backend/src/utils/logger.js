const winston = require('winston');
const { combine, timestamp, printf, colorize, json } = winston.format;

const logFormat = printf(({ level, message, timestamp, ...meta }) => {
  let log = `${timestamp} [${level.toUpperCase()}]: ${message}`;
  if (Object.keys(meta).length > 0) {
    log += `\n${JSON.stringify(meta, null, 2)}`;
  }
  return log;
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    process.env.NODE_ENV === 'production' ? json() : combine(colorize(), logFormat)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

module.exports = logger;
