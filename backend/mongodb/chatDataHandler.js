import { MongoClient } from 'mongodb';
import getNextSequenceValue from './indexController';
import dotenv from 'dotenv';
import { logger } from '../winston/logs';

dotenv.config();

const uri = process.env.mongodb_atlas_uri;

export const client = new MongoClient(uri);
let db;

const dbConnect = async () => {
  try {
    await client.connect();
    return true;
  } catch (e) {
    logger.error('MongoDB connected Error');
    return false;
  }
};

const insertUserInfo = async user => {
  try {
    db = client.db(`room_${user.room}`);
    const list = await db.listCollections().toArray();
    let isExsist = false;
    for (let el of list) {
      if (el.name === 'counters') {
        isExsist = true;
        break;
      }
    }

    if (!isExsist) {
      db.collection('counters').insertOne({ _id: 'id', sequence_value: 1 });
    }
    const col = db.collection('userInfo');
    const userInfo = {
      user_id: user.id,
      username: user.username,
    };

    await col.insertOne(userInfo);
  } catch (e) {
    logger.error(e.message);
  }
};

const deleteUserInfo = async user => {
  try {
    db = client.db(`room_${user.room}`);
    await db.collection('userInfo').findOneAndDelete({ user_id: user.id });
  } catch (e) {
    logger.error(e.message);
  }
};

const getCurrentUserInfo = async user => {
  try {
    db = client.db(`room_${user.room}`);
    const users = await db.collection('userInfo').find({}, { name: 1, user_id: 0 }).toArray();
    return users;
  } catch (e) {
    logger.error(e.message);
  }
};

const insertMsg = async (msg, user) => {
  try {
    db = client.db(`room_${user.room}`);
    const col = await db.collection('message');
    const message = {
      _id: await getNextSequenceValue('id', user.room),
      user_id: user.id,
      username: user.username,
      createdAt: new Date().toISOString(),
      message: msg,
    };
    await col.insertOne(message);
  } catch (e) {
    logger.error(e.message);
  }
};

export { dbConnect, insertUserInfo, insertMsg, deleteUserInfo, getCurrentUserInfo };
