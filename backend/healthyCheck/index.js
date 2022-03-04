import express from 'express';

const router = express.Router();

router.use('/healthy', (req, res) => {
  res.send('success');
});

export default router;
