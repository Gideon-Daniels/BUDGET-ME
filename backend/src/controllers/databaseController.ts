import { Response, Request } from 'express';
import { db } from '../app.js';

export function checkDbStatus(_: Request, res: Response) {
  if (db.dbConnection instanceof Error) {
    res.json({ message: 'offline' });
    return;
  }

  res.json({ message: 'online' });
}
