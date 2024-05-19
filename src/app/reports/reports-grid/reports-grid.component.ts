import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReportsService } from '../reports.service';
import { Report } from '../report.model';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-reports-grid',
  templateUrl: './reports-grid.component.html',
  styleUrls: ['./reports-grid.component.scss'],
})
export class ReportsGridComponent {
  displayedColumns: string[] = [
    'select',
    'title',
    'category',
    'type',
    'date',
    'amount',
    'edit',
  ];
  dataSource!: Report[];
  selection = new SelectionModel<Report>(true, []);

  constructor(
    private reportsService: ReportsService,
    private router: Router,
  ) {
    this.init();
  }

  init() {
    this.dataSource = this.reportsService.getReports();
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
