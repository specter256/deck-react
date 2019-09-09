import express  from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { getConnectionOptions, createConnection } from 'typeorm';
import { config } from './config';

if (!config.storagePath) {
  config.storagePath = path.join(__dirname, 'database');
}

if (!config.databaseName) {
  config.databaseName = 'storage.db';
}

import notes from './routes/notes';
import tags from './routes/tags';
import images from './routes/images';

const connect = async () => {
  const connectionOptions = await getConnectionOptions();
  Object.assign(connectionOptions, {
    database: path.join(config.storagePath, config.databaseName)
  });
  const connection = await createConnection(connectionOptions);
  const app = express();
  const port = process.env.PORT || 5000;

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/api/notes', notes);
  app.use('/api/tags', tags);
  app.use('/api/images', images);

  app.listen(port, () => `Server running on port ${port}`);
}

connect();
