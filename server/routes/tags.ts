import express from 'express';
import { getRepository, getConnection } from "typeorm";

import { Tag } from "../entity/tag";

const router : express.Router = express.Router();

router.get('/', (req, res) => {
  getRepository(Tag)
    .find({
      order: {
        name: 'ASC'
      }
    })
    .then(data => {
      res.json(data);
    });
});

router.post('/add', async (req, res) => {
  const data = req.body;

  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Tag)
    .values([{
      name: data.name,
    }])
    .execute();

    res.status(200).send({status: 200});
});

router.delete('/del', async (req, res) => {
  const data = req.body;

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Tag)
    .where('id = :id', { id: data.id })
    .execute();

    res.status(200).send({status: 200});
});

export default router;
