import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private route: Router) {}

  navigateToAddEdit() {
    this.route.navigate(['/add-edit']);
  }

  navigateToReports() {
    this.route.navigate(['/reports']);
  }
}
