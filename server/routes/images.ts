import express from 'express';
import path from 'path';
import { getRepository, getConnection } from 'typeorm';
import multer from 'multer';
import mime from 'mime-types';
import fs from 'fs';

import { Image } from '../entity/image';
import Utils from '../utils/utils';

const router: express.Router = express.Router();
const imagesDir = path.join(__dirname, '../database/images');
const storage = multer.diskStorage({
  destination: imagesDir,
  filename: function (req, file, callback) {
    const timestamp = +new Date();
    callback(null, `${timestamp.toString()}.${mime.extension(file.mimetype)}`);
  }
});
const upload = multer({ storage: storage });

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
  res.sendFile(path.join(imagesDir, req.params.path));
});

router.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    console.log('Error while uploading file: file not received.');
    return res.send({ status: 500 });
  } else {
    try {
      const currentDate = Utils.getCurrentDate();
      const note = new Image();
      note.filename = req.file.filename;
      note.create_date = currentDate;
      await getConnection().manager.save(note);

      console.log(`File uploaded: ${req.file.filename}`);
      return res.send({ status: 200 });
    } catch(error) {
      // Delete file if saving to database fails
      if (fs.existsSync(req.file.path)) {
        fs.unlink(req.file.path, (err) => {
          if (err) { console.log(err); }
        });
      }

      return console.log('Error while saving image in database:\n', error);
    }
  }
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
