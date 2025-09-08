import { Request, Response } from 'express';
import { db } from '../app.js';

export async function addReport(req: Request, res: Response) {
  await db.addDataToTable('reports', req.body);
  res.status(200).json({ message: 'successful' });
}

export async function getAllReports(_: Request, res: Response) {
  const data = await db.fetchDataFromTable('reports');

  if (!data)
    res.status(500).json({ message: 'failed to fetch data from database' });

  res.status(200).json(data);
}

export async function getReport(req: Request, res: Response) {
  res.status(200).json({ message: 'successful' });
}

export async function updateReport(req: Request, res: Response) {
  res.status(200).json({ message: 'successful' });
}

export async function deleteReport(req: Request, res: Response) {
  res.status(200).json({ message: 'successful' });
}
