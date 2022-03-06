import winston, { format } from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import winstonMongodb from 'winston-mongodb';
import dotenv from 'dotenv';

dotenv.config();

const logFormat = format.printf(({ timestamp, label, level, message }) => {
  return `${timestamp} [${label}] ${level} : ${message}`;
});

const combineLogFormat = {
  MongoDb: format.combine(
    format.label({ label: 'Vling' }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:dd',
    }),
    logFormat
  ),
  console: format.combine(
    format.colorize(),
    format.label({ label: 'Vling' }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:dd',
    }),
    logFormat
  ),
};

const opts = (level, format) => {
  if (format === 'MongoDb') {
    return new winston.transports.MongoDB({
      level: `${level}`,
      db: process.env.mongodb_atlas_uri,
      collection: 'logs',
      format: combineLogFormat.MongoDb,
    });
  }
  if (format === 'Console') {
    return new winston.transports.Console({
      level: `${level}`,
      format: combineLogFormat.console,
    });
  }
};

const logger = winston.createLogger({
  transports: [opts('verbose', 'MongoDb')],
});

if (process.env.NODE_ENV === 'production') {
  logger.add(opts('verbose', 'Console'));
}

logger.stream = {
  write: message => logger.http(message),
};

export { logger };
