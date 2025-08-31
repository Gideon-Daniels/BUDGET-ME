import express from 'express';
import { DatabaseService } from './database/db.ts';

const app = express();
const db = new DatabaseService();

app.use(express.json());

app.get('/db/status', async (_, res) => {
  if (db.dbConnection instanceof Error) {
    res.json({ message: 'offline' });
    return;
  }

  res.json({ message: 'online' });
});

app.post('/api/reports', async (req, res) => {
  console.log(req.body);
  //todo: validate body before submitting to db
  await db.createReport(req.body);
  res.json({ message: 'successful' });
});

app.get('/api/reports', (req, res) => {
  res.json({ message: 'successful' });
});

app.get('/api/reports/:id', (req, res) => {
  res.json({ message: 'successful' });
});

app.put('/api/reports/:id', (req, res) => {
  res.json({ message: 'successful' });
});

app.delete('/api/reports/:id', (req, res) => {
  res.json({ message: 'successful' });
});

app.post('/api/transaction-statements', (req, res) => {
  res.json({ message: 'successful' });
});

app.get('/api/transaction-statements', (req, res) => {
  res.json({ message: 'successful' });
});

app.get('/api/transaction-statements/:id', (req, res) => {
  res.json({ message: 'successful' });
});

app.put('/api/transaction-statements/:id', (req, res) => {
  res.json({ message: 'successful' });
});

app.delete('/api/transaction-statements', (req, res) => {
  res.json({ message: 'successful' });
});

app.listen(3000);
