import { MongoClient } from 'mongodb';
import getNextSequenceValue from './indexController';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.mongodb_atlas_uri;

export const client = new MongoClient(uri);
let db;

const connect = async () => {
  try {
    await client.connect();
    if (process.env.NODE_ENV !== 'production') console.log('connected');
  } catch (e) {
    console.error(e);
  }
};

const insertUesrInfo = async user => {
  try {
    db = await client.db(`room_${user.room}`);
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
      name: user.username,
    };

    col.insertOne(userInfo);
  } catch (e) {
    console.error(e);
  }
};

const deleteUserInfo = async user => {
  try {
    const col = await db.collection('userInfo');
    col.findOneAndDelete({ user_id: user.id });
  } catch (e) {
    console.error(e);
  }
};

const getCurrentUserInfo = async roomId => {
  try {
    const col = await db.collection('userInfo');
    return col.find({});
  } catch (e) {
    console.error(e);
  }
};

const insertMsg = async (msg, user) => {
  try {
    const col = await db.collection('message');
    const message = {
      _id: await getNextSequenceValue('id', user.room),
      user_id: user.id,
      name: user.username,
      createdAt: new Date().toISOString(),
      message: msg,
    };
    col.insertOne(message);
  } catch (e) {
    console.error(e);
  }
};

export { connect, insertUesrInfo, insertMsg, deleteUserInfo, getCurrentUserInfo };
