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
    context.setHeaders.push({
      key: 'Access-Control-Allow-Origin',
      value: null,
    });
  }
};

export default authentication;
