import { Component, inject, OnInit } from '@angular/core';
import { SummaryCardComponent } from './summary-card/summary-card.component';
import { ApiService } from '../api.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Report, SummaryReport } from '../../../backend/src/models/Reports';
import { MatDialog } from '@angular/material/dialog';
import { AddEditReportComponent } from '../reports/add-edit-report/add-edit-report.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ReportsGridComponent } from '../reports/reports-grid/reports-grid.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    SummaryCardComponent,
    MatProgressSpinner,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatButton,
    MatIcon,
    ReportsGridComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
})
export class DashboardComponent implements OnInit {
  selectedPeriod = 'overall';
  periodValues!: any[];
  dashboardSections!: { displayName: string; amount: string }[];
  summaryReport!: SummaryReport;
  reports!: Report[];
  filterControl = new FormControl('overall');
  readonly dialog = inject(MatDialog);
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.loadReportsSummary();
    this.api.summary$.subscribe((data) => {
      if (!data) return;
      console.log(data);
      this.summaryReport = data;
      this.sortPeriodValues(Object.keys(this.summaryReport));
      this.setDashboardSections();
    });

    this.api.reports$.subscribe((data) => {
      if (!data) return;
      data.forEach((element) => {
        element.date = new Date(element.date).toLocaleDateString('en-CA');
      });
      this.reports = data;
      this.filterTable();
      console.log('this.summaryReport', this.summaryReport);
      this.sortPeriodValues(Object.keys(this.summaryReport));
    });

    this.filterControl.valueChanges.subscribe((_) => {
      this.setDashboardSections();
      this.filterTable();
    });
  }

  setDashboardSections() {
    const selectSummary = this.summaryReport[this.selectedPeriod];
    console.log('selectSummary', selectSummary);

    if (!selectSummary) return;
    this.dashboardSections = Object.keys(selectSummary).map((key: string) => {
      return {
        displayName: key.charAt(0).toUpperCase() + key.slice(1),
        amount: selectSummary[key],
      };
    });
  }

  private filterTable() {
    this.reports = this.api.filterReport(this.selectedPeriod);
  }

  openReportDialog() {
    const dialogRef = this.dialog.open(AddEditReportComponent);

    dialogRef.afterClosed().subscribe(() => {
      console.log('dialog was closed');
    });
  }

  sortPeriodValues(data: string[]) {
    this.periodValues = data.sort((a, b) => {
      if (a === 'overall') return -1;
      if (b === 'overall') return 1;

      const [yearA, monthA] = a.split('-').map(Number);
      const [yearB, monthB] = b.split('-').map(Number);

      if (yearA !== yearB) return yearB - yearA;
      if (monthA && monthB) return monthB - monthA;

      if (!monthA && monthB) return -1;
      if (monthA && !monthB) return 1;

      return 0;
    });
  }
}
