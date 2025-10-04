import { Component, OnInit } from '@angular/core';
import { SummaryCardComponent } from './summary-card/summary-card.component';
import { ApiService } from '../api.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SummaryReport } from '../../../backend/src/models/Reports';

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
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
})
export class DashboardComponent implements OnInit {
  selectedPeriod = 'overall';
  periodValues!: any[];
  dashboardSections!: { displayName: string; amount: string }[];
  reportSummary!: SummaryReport;
  filterControl = new FormControl('overall');
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getReportsSummary().subscribe((data: SummaryReport) => {
      this.reportSummary = data;
      this.periodValues = Object.keys(data);
      this.setDashboardSections();
    });

    this.filterControl.valueChanges.subscribe((_) => {
      this.setDashboardSections();
    });
  }

  setDashboardSections() {
    const selectSummary = this.reportSummary[this.selectedPeriod];
    if (!selectSummary) return;
    this.dashboardSections = Object.keys(selectSummary).map((key: string) => {
      return {
        displayName: key.charAt(0).toUpperCase() + key.slice(1),
        amount: selectSummary[key],
      };
    });
  }
}
