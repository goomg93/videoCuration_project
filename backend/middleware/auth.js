import dotenv from 'dotenv';

dotenv.config();

const authentication = context => {
  if (context.req.headers.domain === 'http://localhost:3000/') {
    return;
  } else if (context.req.headers.authorization === process.env.API_KEY) {
    return;
  } else {
    throw new Error('INVALID ACCESS');
  }
};

export default authentication;
