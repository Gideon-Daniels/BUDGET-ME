import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getReportsSummary() {
    return this.http.get<any[]>('http://localhost:3000/api/v1/reports/summary');
  }
}
