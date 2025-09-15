import express from 'express';
import { getMonthlySummary } from '../controllers/dashboardController.js';

export const dashboardRouter = express.Router();

dashboardRouter.route('/monthly-summary').get(getMonthlySummary);
