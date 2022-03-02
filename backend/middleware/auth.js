require('dotenv').config();

const authentication = req => {
  if (req.headers.origin === process.env.FRONTEND_URL) {
    return;
  } else if (req.headers.authorization === process.env.API_KEY) {
    return;
  } else {
    throw new Error('INVALID ACCESS');
  }
};

export default authentication;
