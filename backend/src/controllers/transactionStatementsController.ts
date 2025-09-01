import { Request, Response } from 'express';

export async function addTransactionStatement(req: Request, res: Response) {
  res.status(200).json({ message: 'successful' });
}

export async function getAllTransactionStatements(req: Request, res: Response) {
  res.status(200).json({ message: 'successful' });
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
