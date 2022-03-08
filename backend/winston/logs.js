import winston, { format } from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import winstonMongodb from 'winston-mongodb';
import moment from 'moment';
import 'moment-timezone';
import dotenv from 'dotenv';

dotenv.config();

moment.tz.setDefault('Asia/Seoul');
const timeStamp = () => moment().format('YYYY-MM-DD HH:mm:ss');

const logFormat = format.printf(({ label, level, message }) => {
  return `${timeStamp()} [${label}] ${level} : ${message}`;
});

const combineLogFormat = {
  MongoDb: format.combine(format.label({ label: 'Vling' }), logFormat),
  console: format.combine(format.colorize(), format.label({ label: 'Vling' }), logFormat),
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
  transports: [opts('verbose', 'Console')],
});

if (process.env.NODE_ENV === 'production') {
  logger.add(opts('verbose', 'MongoDb'));
}

logger.stream = {
  write: message => logger.http(message),
};

export { logger };
