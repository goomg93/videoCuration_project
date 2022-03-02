import { AuthenticationError } from 'apollo-server-express';
import { client } from '../mongodb/chatDataHandler';
import dotenv from 'dotenv';

dotenv.config();

const authentication = async req => {
  if (req.headers.domain === process.env.FRONTEND_URL) {
    return;
  } else if (req.headers.authorization) {
    const API_KEY = req.headers.authorization;
    const col = await client.db('videoInfo').collection('listId').findOne({ API_KEY: API_KEY });
    if (!col) {
      throw new AuthenticationError('INVALID ACCESS');
    }
    return col.LIST_ID;
  } else {
    throw new AuthenticationError('INVALID ACCESS');
  }
};

export default authentication;
