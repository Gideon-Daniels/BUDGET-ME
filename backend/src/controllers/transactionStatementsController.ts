import { Request, Response } from 'express';
import { db } from '../app.js';

export async function addTransactionStatement(req: Request, res: Response) {
  try {
    await db.addDataToTable('transaction_statements', req.body);
    res.status(200).json({ message: 'successful' });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: 'failed to store data in database',
      error: e,
    });
  }
}

export async function getAllTransactionStatements(req: Request, res: Response) {
  const data = await db.fetchDataFromTable('transaction_statements');

  if (!data)
    res.status(500).json({ message: 'failed to fetch data from database' });

  res.status(200).json(data);
}

export async function getTransactionStatement(req: Request, res: Response) {
  res.status(200).json({ message: 'successful' });
}

export async function updateTransactionStatement(req: Request, res: Response) {
  res.status(200).json({ message: 'successful' });
}

export async function deleteTransactionStatement(req: Request, res: Response) {
  res.status(200).json({ message: 'successful' });
}
