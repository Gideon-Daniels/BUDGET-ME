import { Request, Response } from 'express';
import { db } from '../app.js';

export async function addReport(req: Request, res: Response) {
  await db.createReport(req.body);
  res.status(200).json({ message: 'successful' });
}

export async function getAllReports(req: Request, res: Response) {
  res.status(200).json({ message: 'successful' });
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
