import express from 'express';
import { getRepository, getConnection } from 'typeorm';

import { Note } from '../entity/note';
import Utils from '../utils/utils';

const router: express.Router = express.Router();

router.get('/', (req, res) => {
  getRepository(Note)
    .createQueryBuilder('note')
    .orderBy('update_date', 'DESC')
    .leftJoinAndSelect('note.tags', 'tag')
    .getMany()
    .then(data => {
      data.map(i => i.update_date = Utils.formatDate(i.update_date));
      res.json(data);
    });
});

router.get('/:id', (req, res) => {
  getRepository(Note)
    .createQueryBuilder('note')
    .where('note.id = :id', { id: req.params.id })
    .leftJoinAndSelect('note.tags', 'tag')
    .getOne()
    .then(data => {
      res.json(data);
    });
});

router.post('/add', async (req, res) => {
  const data = req.body;
  const currentDate = Utils.getCurrentDate();

  const note = new Note();
  note.text = data.text;
  note.create_date = currentDate;
  note.update_date = currentDate;
  note.tags = parseTags(data.tags);
  await getConnection().manager.save(note);

  res.status(200).send({status: 200});
});

router.post('/upd', async (req, res) => {
  const data = req.body;
  const currentDate = Utils.getCurrentDate();

  const note = await getRepository(Note).findOneOrFail(data.id);
  note.text = data.text;
  note.update_date = currentDate;
  note.tags = parseTags(data.tags);
  await getConnection().manager.save(note);

  res.status(200).send({status: 200});
});

router.delete('/del', async (req, res) => {
  const data = req.body;

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Note)
    .where('id = :id', { id: data.id })
    .execute();

  res.status(200).send({status: 200});
});

const parseTags = (data: any) => {
  if (data === null) {
    return null;
  }

  const tags = data.map((tag: any) => {
    return {
      id: tag.value,
      name: tag.label,
    };
  });

  return tags;
}

export default router;
