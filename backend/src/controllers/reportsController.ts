import { Request, Response } from 'express';
import { db } from '../app.js';

export async function addReport(req: Request, res: Response) {
  try {
    await db.addEntry('reports', req.body);
    res.status(200).json({ message: 'successful' });
  } catch (e: any) {
    console.log(e);
    res
      .status(500)
      .json({ message: `failed to add data to database: ${e.message}` });
  }
}

export async function getReport(req: Request, res: Response) {
  const data = await db.FetchEntry('reports', req.params['id']);
  if (!data)
    res.status(500).json({ message: 'failed to fetch entry in database' });

  res.status(200).json(data);
}

export async function getAllReports(_: Request, res: Response) {
  const data = await db.fetchAllEntries('reports');
  if (!data)
    res.status(500).json({ message: 'failed to fetch data from database' });

  res.status(200).json(data);
}

export async function deleteReport(req: Request, res: Response) {
  try {
    await db.deleteEntry('reports', req.params['id']);
    res.status(200).json({ message: 'successful' });
  } catch (e: any) {
    res
      .status(500)
      .json({ message: `failed to delete entry in database ${e.message}` });
  }
}

export async function deleteMultipleReports(req: Request, res: Response) {
  try {
    await db.deleteMultipleEntries('reports', req.body['ids']);
    res.status(200).json({ message: 'successful' });
  } catch (e: any) {
    res
      .status(500)
      .json({ message: `failed to delete entry in database ${e.message}` });
  }
}

export async function updateReport(req: Request, res: Response) {
  try {
    await db.updateEntry('reports', req.params['id'], req.body);
    res.status(200).json({ message: 'successful' });
  } catch (e: any) {
    console.log(e);
    res
      .status(500)
      .json({ message: `failed to update entry in database: ${e.message}` });
  }
}
