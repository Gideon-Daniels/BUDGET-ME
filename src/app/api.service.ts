import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Report, SummaryReport } from '../../backend/src/models/Reports';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private reportsSummary: BehaviorSubject<any> = new BehaviorSubject(null);
  private reports: BehaviorSubject<any> = new BehaviorSubject(null);
  private _snackbar = inject(MatSnackBar);
  summary$: Observable<SummaryReport> = this.reportsSummary.asObservable();
  reports$: Observable<Report[]> = this.reports.asObservable();

  constructor(private http: HttpClient) {}

  loadReportsSummary() {
    this.http
      .get<SummaryReport>('http://localhost:3000/api/v1/reports/summary')
      .subscribe((data) => {
        this.reportsSummary.next(data);
      });
  }

  loadReports() {
    this.http
      .get<Report[]>('http://localhost:3000/api/v1/reports')
      .subscribe((data) => {
        console.log(data);
        this.reports.next(data);
      });
  }

  filterReport(selectedPeriod: string) {
    if (selectedPeriod === 'overall') return this.reports.value;
    return this.reports.value.filter(
      (element: any) =>
        selectedPeriod === element.date.substring(0, selectedPeriod.length),
    );
  }

  addReport(data: Report) {
    this.http
      .post('http://localhost:3000/api/v1/reports', data)
      .subscribe((value: any) => {
        this._snackbar.open(value.message, undefined, {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      });

    this.updateReports(data, 'add');
    this.loadReportsSummary();
  }

  updateReport(data: Report) {
    this.http
      .put(`http://localhost:3000/api/v1/reports/${data.id}`, data)
      .subscribe((value: any) => {
        this._snackbar.open(value.message, undefined, {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      });

    this.updateReports(data, 'update');
    this.loadReportsSummary();
  }

  deleteReport(data: Report) {
    this.http
      .delete(`http://localhost:3000/api/v1/reports/${data.id}`)
      .subscribe((value: any) => {
        this._snackbar.open(value.message, undefined, {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      });
    this.updateReports(data, 'delete');
    this.loadReportsSummary();
  }

  private updateReports(data: Report, action: 'add' | 'update' | 'delete') {
    const filtered = this.reports.value.filter(
      (report: Report) => report.id !== data.id,
    );
    if (action === 'update') {
      this.reports.next([data, ...filtered]);
    } else if (action === 'add') {
      this.reports.next([data, ...this.reports.value]);
    } else {
      this.reports.next([...filtered]);
    }
  }
}
