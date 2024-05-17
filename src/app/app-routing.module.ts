import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReportsComponent } from './reports/reports.component';
import { AddEditReportComponent } from './reports/add-edit-report/add-edit-report.component';
import { ReportsGridComponent } from './reports/reports-grid/reports-grid.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  { path: 'home', component: HomeComponent },
  {
    path: 'reports',
    children: [
      { path: '', component: ReportsGridComponent },
      {
        path: 'add-edit-report',
        component: AddEditReportComponent,
      },
    ],
    component: ReportsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
