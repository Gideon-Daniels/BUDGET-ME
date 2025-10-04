import { Component, OnInit } from '@angular/core';
import { SummaryCardComponent } from './summary-card/summary-card.component';
import { NgForOf } from '@angular/common';
import { ApiService } from '../api.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [
    SummaryCardComponent,
    NgForOf,
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
  periodValues!: string[];
  dashboardSections: any[] = [];
  reportSummary!: any[];
  filterControl = new FormControl('overall');
  constructor(private api: ApiService) {}
  ngOnInit(): void {
    this.api.getReportsSummary().subscribe((data) => {
      this.reportSummary = data;
      this.periodValues = data.map((item) => Object.keys(item).join());
      console.log(this.periodValues);
      console.log(data);
      console.log(this.dashboardSections);
      this.getSelectedSummary(this.selectedPeriod);
    });

    this.filterControl.valueChanges.subscribe((value) => {
      if (value) {
        this.getSelectedSummary(value);
      }
    });
  }

  getSelectedSummary(value: string) {
    this.dashboardSections = [];
    this.reportSummary.forEach((item) => {
      if (!item[value]) return;
      return Object.keys(item[value]).map((key) => {
        this.dashboardSections.push({
          displayName: key.charAt(0).toUpperCase() + key.slice(1),
          amount: item[value][key],
        });
      });
    });
  }
}
