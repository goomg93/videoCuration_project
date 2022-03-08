import { logger } from '../winston/logs';

const formatError = err => {
  logger.error(`🔹 ${err.extensions.code} : ${err.message} 🔹 Path : ${err.path}`);
  return err;
};

export default formatError;
