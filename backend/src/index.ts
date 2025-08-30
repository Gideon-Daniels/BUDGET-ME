import express from 'express';
import { dbConnection } from './database/db.ts';

const app = express();
const db = await dbConnection();

app.get('/db/status', async (_, res) => {
  if (db instanceof Error) {
    res.json({ message: 'offline' });
    return;
  }

  res.json({ message: 'online' });
});

app.listen(3000);
