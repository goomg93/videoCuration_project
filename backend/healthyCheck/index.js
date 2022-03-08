import express from 'express';
import connectRedisServer from '../cache/redis';
import { dbConnect } from '../mongodb/chatDataHandler';

const router = express.Router();

router.use('/healthy', async (req, res) => {
  if (!!(await connectRedisServer()) && (await dbConnect())) {
    res.status(200).send('success');
  } else {
    res.status(400).send('false');
  }
});

export default router;
