import { Request, Response } from 'express';
import { db } from '../app.js';

export async function addReport(req: Request, res: Response) {
  try {
    await db.addDataToTable('reports', req.body);
    res.status(200).json({ message: 'successful' });
  } catch (e) {
    res.status(500).json({ message: 'failed to fetch data from database' });
  }
}

export async function getAllReports(_: Request, res: Response) {
  const data = await db.fetchDataFromTable('reports');
  if (!data)
    res.status(500).json({ message: 'failed to fetch data from database' });

  res.status(200).json(data);
}

export async function getReport(req: Request, res: Response) {
  const data = await db.fetchRowFromTable('reports', req.params['id']);
  if (!data)
    res.status(500).json({ message: 'failed to fetch data from database' });

  res.status(200).json(data);
}

export async function deleteReport(req: Request, res: Response) {
  try {
    await db.deleteRowFromTable('reports', req.params['id']);
    res.status(200).json({ message: 'successful' });
  } catch (e) {
    res.status(500).json({ message: 'failed to delete data from database' });
  }
}

export async function updateReport(req: Request, res: Response) {
  res.status(200).json({ message: 'successful' });
}
