import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Handsontable from 'handsontable';

@Component({
  selector: 'app-reports-grid',
  templateUrl: './reports-grid.component.html',
  styleUrls: ['./reports-grid.component.scss'],
})
export class ReportsGridComponent {
  hotSettings: Handsontable.GridSettings = {
    startRows: 5,
    startCols: 9,
    colHeaders: [' ', 'Title', 'Category', 'Type', 'Date', 'Amount', 'Edit'],
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
  id = 'reports-grid';

  constructor(private router: Router) {
    const data = {
      '1': {
        checked: 'unchecked',
        title: 'Shoprite Shopping',
        category: 'groceries',
        type: 'Expense',
        Date: '22 March 2024',
        amount: 'R 200',
        edit: 'edit',
      },
    };

    this.hotSettings.data = Object.values(data);
  }

  async navigateToHome() {
    await this.router.navigate(['/']);
  }
}
