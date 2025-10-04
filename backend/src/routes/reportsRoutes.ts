import express from 'express';
import {
  addReport,
  deleteMultipleReports,
  deleteReport,
  getAllReports,
  getReport,
  getReportsSummary,
  updateReport,
} from '../controllers/reportsController.js';

export const reportsRouter = express.Router();

reportsRouter
  .route('/')
  .get(getAllReports)
  .post(addReport)
  .delete(deleteMultipleReports);
reportsRouter.route('/summary').get(getReportsSummary);
reportsRouter
  .route('/:id')
  .get(getReport)
  .put(updateReport)
  .delete(deleteReport);
