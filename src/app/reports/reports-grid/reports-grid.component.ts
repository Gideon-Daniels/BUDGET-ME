import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Handsontable from 'handsontable';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'app-reports-grid',
  templateUrl: './reports-grid.component.html',
  styleUrls: ['./reports-grid.component.scss'],
})
export class ReportsGridComponent {
  hotSettings: Handsontable.GridSettings = {};
  id = 'reports-grid';

  constructor(
    private reportsService: ReportsService,
    private router: Router,
  ) {
    this.init();
  }

  init() {
    const data = this.reportsService.getReports();

    this.hotSettings = {
      data,
      renderAllRows: true,
      startRows: 5,
      startCols: 5,
      colHeaders: ['Title', 'Category', 'Type', 'Date', 'Amount'],
      editor: false,
      colWidths: 100,
      rowHeights: 40,
      stretchH: 'all',
      width: '100%',
      autoWrapRow: true,
      autoWrapCol: true,
      className: 'htCenter htMiddle',
      licenseKey: 'non-commercial-and-evaluation',
    };
    console.log(this.hotSettings.data);
  }

  async navigateToHome() {
    await this.router.navigate(['/']);
  }

  async addReport() {
    await this.router.navigate(['reports', 'add-edit-report']);
  }

  deleteReport() {
    console.log('reported deleted');
  }
}
