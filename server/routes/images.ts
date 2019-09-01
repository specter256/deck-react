import express from 'express';
import path from 'path';
import { getRepository, getConnection } from "typeorm";

import { Image } from "../entity/image";
import Utils from '../utils/utils';

const router: express.Router = express.Router();

router.get('/', (req, res) => {
  getRepository(Image)
    .createQueryBuilder('note')
    .orderBy('create_date', 'DESC')
    .getMany()
    .then(data => {
      res.json(data);
    });
});

router.get('/:path', (req, res) => {
  const imagesDir = path.join(__dirname, '../database/images');
  res.sendFile(path.join(imagesDir, req.params.path));
});

router.post('/add', async (req, res) => {
  const data = req.body;
  const currentDate = Utils.getCurrentDate();

  const note = new Image();
  note.filename = data.filename;
  note.create_date = currentDate;
  await getConnection().manager.save(note);

  res.json({status: 200});
});

router.delete('/del', async (req, res) => {
  const data = req.body;

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Image)
    .where('id = :id', { id: data.id })
    .execute();

  res.json({status: 200});
});

export default router;
