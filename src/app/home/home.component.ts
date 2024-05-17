import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToAddEdit() {
    this.router.navigate(['reports', 'add-edit-report']);
  }

  navigateToReports() {
    this.router.navigate(['reports']);
  }
}
