import { Component, inject, Input, OnInit } from '@angular/core';
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
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddEditReportComponent } from '../add-edit-report/add-edit-report.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { Report } from '../../../../backend/src/models/Reports';

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
  readonly dialog = inject(MatDialog);
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.loadReports();
    this.apiService.reports$.subscribe((data: Report[]) => {
      if (!data) return;
      console.log(data);
      this.dataSource = data;
    });
  }

  updateReport(data: Report) {
    console.log('editing report');
    console.log(data);
    this.dialog.open(AddEditReportComponent, { data });
  }

  deleteReport(report: Report) {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '520px',
      data: { name: report.title },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.apiService.deleteReport(report);
      }
    });
  }
}
