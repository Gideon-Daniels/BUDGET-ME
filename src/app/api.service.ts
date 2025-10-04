import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SummaryReport } from '../../backend/src/models/Reports';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getReportsSummary() {
    return this.http.get<SummaryReport>(
      'http://localhost:3000/api/v1/reports/summary',
    );
  }
}
