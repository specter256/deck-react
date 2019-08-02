import express from 'express';
import { getDb } from '../db';

const router : express.Router = express.Router();

router.get('/', (req, res) => {
  getDb().all(`
    SELECT n.id,
           n.text,
           n.create_date,
           n.update_date
      FROM notes n
  `, (err, data) => {
    if (err) {
      return console.log(err);
    }

    res.json(data);
  });
});

export default router;
