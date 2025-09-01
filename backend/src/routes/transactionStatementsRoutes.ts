import express from 'express';
import {
  addTransactionStatement,
  deleteTransactionStatement,
  getAllTransactionStatements,
  getTransactionStatement,
  updateTransactionStatement,
} from '../controllers/transactionStatementsController.js';

export const transactionStatementRouter = express.Router();

transactionStatementRouter
  .route('/')
  .get(getAllTransactionStatements)
  .post(addTransactionStatement);

transactionStatementRouter
  .route('/:id')
  .get(getTransactionStatement)
  .put(updateTransactionStatement)
  .delete(deleteTransactionStatement);
