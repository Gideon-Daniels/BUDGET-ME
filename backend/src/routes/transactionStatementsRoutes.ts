import express from 'express';
import {
  addTransactionStatement,
  deleteMultipleTransactionStatements,
  deleteTransactionStatement,
  getAllTransactionStatements,
  getTransactionStatement,
  updateTransactionStatement,
} from '../controllers/transactionStatementsController.js';

export const transactionStatementRouter = express.Router();

transactionStatementRouter
  .route('/')
  .get(getAllTransactionStatements)
  .post(addTransactionStatement)
  .delete(deleteMultipleTransactionStatements);

transactionStatementRouter
  .route('/:id')
  .get(getTransactionStatement)
  .put(updateTransactionStatement)
  .delete(deleteTransactionStatement);
