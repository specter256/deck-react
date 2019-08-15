import express from 'express';
import { getRepository, getConnection } from "typeorm";

import { Note } from "../entity/note";

const router: express.Router = express.Router();

router.get('/', (req, res) => {
  getRepository(Note)
    .createQueryBuilder('note')
    .orderBy('update_date', 'DESC')
    .leftJoinAndSelect('note.tags', 'tag')
    .getMany()
    .then(data => {
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
  const currentDate = getCurrentDate();

  const note = new Note();
  note.text = data.text;
  note.create_date = currentDate;
  note.update_date = currentDate;
  note.tags = parseTags(data.tags);
  await getConnection().manager.save(note);

  res.json({status: 200});
});

router.post('/upd', async (req, res) => {
  const data = req.body;
  const currentDate = getCurrentDate();

  const note = await getRepository(Note).findOneOrFail(data.id);
  note.text = data.text;
  note.update_date = currentDate;
  note.tags = parseTags(data.tags);
  await getConnection().manager.save(note);

  res.json({status: 200});
});

router.delete('/del', async (req, res) => {
  const data = req.body;

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Note)
    .where('id = :id', { id: data.id })
    .execute();

  res.json({status: 200});
});

const parseTags = (data: any) => {
  const tags = data.map((tag: any) => {
    return {
      id: tag.value,
      name: tag.label,
    };
  });

  return tags;
}

const getCurrentDate = () => {
  const currentDate = new Date();
  let year = currentDate.getFullYear();
  let day: any = currentDate.getDate();
  let month: any = currentDate.getMonth() + 1;
  let hours: any = currentDate.getHours();
  let minutes: any = currentDate.getMinutes();
  let seconds: any = currentDate.getSeconds();

  if (day < 10) { day = '0' + day; }
  if (month < 10) { month = '0' + month; }
  if (hours < 10) { hours  = '0' + hours; }
  if (minutes < 10) { minutes  = '0' + minutes; }
  if (seconds < 10) { seconds  = '0' + seconds; }

  const date = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;

  return date;
}

export default router;
