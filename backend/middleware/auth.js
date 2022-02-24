require('dotenv').config();

const authentication = context => {
  if (context.req.headers.origin === process.env.FRONTEND_URL) {
    return;
  } else if (context.req.headers.authorization === process.env.API_KEY) {
    context.setHeaders.push({
      key: 'Access-Control-Allow-Origin',
      value: context.req.headers.origin,
    });
  } else {
    throw new Error('INVALID ACCESS');
  }
};

export default authentication;
