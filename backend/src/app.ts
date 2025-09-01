import express from 'express';
import { DatabaseService } from './database/db.js';
import { checkDbStatus } from './controllers/databaseController.js';
import { transactionStatementRouter } from './routes/transactionStatementsRoutes.js';
import { reportsRouter } from './routes/reportsRoutes.js';

export const app = express();
export const db = new DatabaseService();

app.use(express.json());
app.use('/api/v1/reports', reportsRouter);
app.use('/api/v1/transaction-statements', transactionStatementRouter);

app.route('/db/v1/status').get(checkDbStatus);
