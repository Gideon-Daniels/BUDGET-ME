import { Request, Response } from 'express';
import { db } from '../app.js';

export async function getMonthlySummary(req: Request, res: Response) {
  const data = await db.aggregateMonthlyReports();

  if (!data)
    res.status(500).json({ message: 'failed to fetch data from database' });

  res.status(200).json(data);
}
