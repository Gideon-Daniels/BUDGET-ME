import { Component, Input, OnInit } from '@angular/core';
import {
  MatCell,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTableModule,
} from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { ApiService } from '../../api.service';
import { Report } from '../report.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reports-grid',
  templateUrl: './reports-grid.component.html',
  styleUrls: ['./reports-grid.component.scss'],
  standalone: true,
  imports: [
    MatTableModule,
    MatHeaderRowDef,
    MatRowDef,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatIcon,
    DatePipe,
  ],
})
export class ReportsGridComponent implements OnInit {
  @Input() dataSource!: any;

  displayedColumns: string[] = [
    'title',
    'date',
    'type',
    'category',
    'description',
    'amount',
    'actions',
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.loadReports();
    this.apiService.reports$.subscribe((data: Report[]) => {
      if (!data) return;
      console.log(data);
      this.dataSource = data;
    });
  }

  editReport() {
    console.log('editing report');
  }

  deleteReport() {
    console.log('reported deleted');
  }
}
