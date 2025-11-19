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
  summary$: Observable<{}> = this.reportsSummary.asObservable();
  reports$: Observable<any> = this.reports.asObservable();
  private _snackbar = inject(MatSnackBar);

  constructor(private http: HttpClient) {}

  loadReportsSummary() {
    this.http
      .get<SummaryReport>('http://localhost:3000/api/v1/reports/summary')
      .subscribe((data: any) => {
        this.reportsSummary.next(data);
      });
  }

  loadReports() {
    this.http
      .get<SummaryReport>('http://localhost:3000/api/v1/reports')
      .subscribe((data: any) => {
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
    this.updateReportsSummary(data);
    this.updateReports(data);
  }

  editReport(id: number, data: Report) {
    this.http
      .put(`http://localhost:3000/api/v1/reports/${id}`, data)
      .subscribe((value: any) => {
        this._snackbar.open(value.message, undefined, {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      });
    this.updateReportsSummary(data);
    this.updateReports(data, id);
  }

  private updateReportsSummary(data: any) {
    if (!data || data.length === 0) return;
    const year = data.date.substring(0, 4);
    const yearMonth = data.date.substring(0, 7);
    // todo fix immutability issue . We should not mutate value property
    if (!this.reportsSummary.value[yearMonth]) {
      this.reportsSummary.value[yearMonth] = {
        income: 0,
        expense: 0,
        balance: 0,
      };
      this.reportsSummary.value[year] = {
        income: 0,
        expense: 0,
        balance: 0,
      };
    }

    if (data.type === 'income') {
      this.reportsSummary.value[yearMonth].income += data.amount;
      this.reportsSummary.value[yearMonth].balance += data.amount;
      this.reportsSummary.value[year].income += data.amount;
      this.reportsSummary.value[year].balance += data.amount;
      this.reportsSummary.value['overall'].income += data.amount;
      this.reportsSummary.value['overall'].balance += data.amount;
    } else {
      this.reportsSummary.value[yearMonth].expense -= data.amount;
      this.reportsSummary.value[yearMonth].balance -= data.amount;
      this.reportsSummary.value[year].expense -= data.amount;
      this.reportsSummary.value[year].balance -= data.amount;
      this.reportsSummary.value['overall'].expense -= data.amount;
      this.reportsSummary.value['overall'].balance -= data.amount;
    }

    this.reportsSummary.next(this.reportsSummary.value);
  }

  private updateReports(data: Report, id?: number) {
    if (id) {
      const filtered = this.reports.value.filter(
        (report: Report) => report.id !== id,
      );
      this.reports.next([data, ...filtered]);
    } else {
      this.reports.next([data, ...this.reports.value]);
    }
  }
}
