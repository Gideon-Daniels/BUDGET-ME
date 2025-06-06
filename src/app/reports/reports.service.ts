import { Injectable } from '@angular/core';
import { Report } from './report.model';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  reports: Report[] = [
    {
      title: 'Shoprite shopping',
      category: 'Food',
      type: 'Expense',
      date: '2025-05-23',
      amount: '100',
    },
    {
      title: 'PnP shopping',
      category: 'Food',
      type: 'Expense',
      date: '2025-05-22',
      amount: '200',
    },
    {
      title: 'Safety IO Salary',
      category: 'Salary',
      type: 'Income',
      date: '2025-05-21',
      amount: '10000',
    },
    {
      title: 'Home Loan',
      category: 'Salary',
      type: 'Expense',
      date: '2025-05-20',
      amount: '5000',
    },
  ];

  constructor() {}

  addReport(report: Report) {
    this.reports.push(report);
  }

  getReports() {
    return this.reports;
  }
}
