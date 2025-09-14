import { Request, Response } from 'express';
import { db } from '../app.js';

export async function addTransactionStatement(req: Request, res: Response) {
  try {
    await db.addEntry('transaction_statements', req.body);
    res.status(200).json({ message: 'successfully added data' });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: 'failed to store data in database',
      error: e,
    });
  }
}

export async function getAllTransactionStatements(req: Request, res: Response) {
  const data = await db.fetchAllEntries('transaction_statements');

  if (!data)
    res.status(500).json({ message: 'failed to fetch data from database' });

  res.status(200).json(data);
}

export async function getTransactionStatement(req: Request, res: Response) {
  const data = await db.FetchEntry('transaction_statements', req.params['id']);

  if (!data) res.status(401).json({ message: 'failed to fetch data' });

  res.status(200).json(data);
}

export async function deleteTransactionStatement(req: Request, res: Response) {
  try {
    await db.deleteEntry('transaction_statements', req.params['id']);
    res.status(200).json({ message: 'successfully removed data' });
  } catch (e) {
    res.status(500).json({ message: 'failed to delete data from database' });
  }
}

export async function deleteMultipleTransactionStatements(
  req: Request,
  res: Response,
) {
  try {
    await db.deleteMultipleEntries('transaction_statements', req.body['ids']);
    res.status(200).json({ message: 'successful' });
  } catch (e: any) {
    res
      .status(500)
      .json({ message: `failed to delete entry in database ${e.message}` });
  }
}

export async function updateTransactionStatement(req: Request, res: Response) {
  res.status(200).json({ message: 'successful' });
}
