import express  from 'express';
import bodyParser from 'body-parser';

import notes from './routes/notes';
import { initDb }  from './db';

initDb('/database/storage.db');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/notes', notes);

app.listen(port, () => `Server running on port ${port}`);
