import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReportsService } from '../reports.service';
import { Report } from '../report.model';
import { SelectionModel } from '@angular/cdk/collections';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

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
}
