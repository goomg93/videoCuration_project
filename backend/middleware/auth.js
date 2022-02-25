import dotenv from 'dotenv';

dotenv.config();

// const authentication = context => {
//   if (context.req.headers.origin === process.env.FRONTEND_URL) {
//     return;
//   } else if (context.req.headers.authorization === process.env.API_KEY) {
//     context.setHeaders.push({
//       key: 'Access-Control-Allow-Origin',
//       value: context.req.headers.origin,
//     });
//   } else {
//     context.setHeaders.push({
//       key: 'Access-Control-Allow-Origin',
//       value: null,
//     });
//     const err = new Error('INVALID ACCESS');
//     throw err;
//   }
// };

const authentication = context => {
  if (context.req.headers.domain === 'http://localhost:3000/') {
    return;
  } else if (context.req.headers.authorization === process.env.API_KEY) {
    return;
  } else {
    const err = new Error('INVALID ACCESS');
    console.log('domain : ' + context.req.headers.domain);
    console.log('origin : ' + context.req.headers.origin);
    throw err;
  }
};

export default authentication;
