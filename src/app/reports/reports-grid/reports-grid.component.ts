import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReportsService } from '../reports.service';
import { Report } from '../report.model';
import { SelectionModel } from '@angular/cdk/collections';
import { PdfUploadService } from '../../pdf-upload-service.service';

@Component({
    selector: 'app-reports-grid',
    templateUrl: './reports-grid.component.html',
    styleUrls: ['./reports-grid.component.scss'],
    standalone: false
})
export class ReportsGridComponent {
  displayedColumns: string[] = ['date', 'description', 'income', 'expense'];
  dataSource!: Report[];
  selection = new SelectionModel<Report>(true, []);
  total = 0;

  constructor(
    private reportsService: ReportsService,
    private pdfService: PdfUploadService,
    private router: Router,
  ) {
    this.init();
  }

  init() {
    // this.dataSource = this.reportsService.getReports();
    const data = this.pdfService.pdfData;
    console.log(data);
    this.dataSource = data.rows;
    data.rows.forEach((data: any) => {
      console.log(data.expense);
      if (!isNaN(parseFloat(data.income)))
        this.total += parseFloat(data.income);
    });
    console.log(this.total);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Report): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.title + 1
    }`;
  }

  async navigateToHome() {
    await this.router.navigate(['/']);
  }

  async addReport() {
    await this.router.navigate(['reports', 'add-edit-report']);
  }

  editReport() {
    console.log('editing report');
  }

  deleteReport() {
    console.log('reported deleted');
  }

  edit() {
    console.log('editing report');
  }
}
