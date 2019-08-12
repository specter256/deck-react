import express from 'express';
import { getRepository, getConnection } from "typeorm";

import { Note } from "../entity/note";

const router : express.Router = express.Router();

router.get('/', (req, res) => {
  getRepository(Note).find()
    .then(data => {
      res.json(data);
    });
});

router.post('/add', async (req, res) => {
  const data = req.body;
  const currentDate = getCurrentDate();

  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Note)
    .values([{
      text: data.text,
      create_date: currentDate,
      update_date: currentDate
    }])
    .execute();

  res.json({status:200});
});

router.delete('/del', async (req, res) => {
  const data = req.body;

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Note)
    .where('id = :id', { id: data.id })
    .execute();

  res.json({status:200});
});
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
