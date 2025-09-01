import express from 'express';
import {
  addReport,
  deleteReport,
  getAllReports,
  getReport,
  updateReport,
} from '../controllers/reportsController.js';

export const reportsRouter = express.Router();

reportsRouter.route('/').get(getAllReports).post(addReport);
reportsRouter
  .route('/:id')
  .get(getReport)
  .put(updateReport)
  .delete(deleteReport);
