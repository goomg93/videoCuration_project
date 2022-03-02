import { AuthenticationError } from 'apollo-server-express';
import dotenv from 'dotenv';

dotenv.config();

const authentication = req => {
  if (req.headers.domain === process.env.FRONTEND_URL) {
    return;
  } else if (req.headers.authorization === process.env.API_KEY) {
    return;
  } else {
    throw new AuthenticationError('INVALID ACCESS');
  }
};

export default authentication;
