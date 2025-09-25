import { Component, OnInit } from '@angular/core';
import { SummaryCardComponent } from './summary-card/summary-card.component';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [SummaryCardComponent, NgForOf, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
})
export class DashboardComponent implements OnInit {
  mockData = [
    {
      month: '2025-02',
      totalIncome: '0.00',
      totalExpense: '1000.00',
      totalBalance: '-1000.00',
    },
  ];
  mockSection!: any[];
  placeHolderSections = ['Balance', 'Expense', 'Income'];

  constructor() {}
  ngOnInit(): void {
    setTimeout(() => {
      this.mockSection = [
        {
          title: 'Balance',
          amount: this.mockData[0].totalBalance,
        },
        {
          title: 'Expense',
          amount: this.mockData[0].totalExpense,
        },
        {
          title: 'Income',
          amount: this.mockData[0].totalIncome,
        },
      ];
    }, 5000);
  }
}
