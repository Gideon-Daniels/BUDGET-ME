import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { Report } from '../report.model';
import { ReportsService } from '../reports.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null,
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
    selector: 'app-add-edit-report',
    templateUrl: './add-edit-report.component.html',
    styleUrls: ['./add-edit-report.component.scss'],
    standalone: false
})
export class AddEditReportComponent implements OnInit {
  inEditMode: boolean = false;
  addEditForm: FormGroup = new FormGroup({});
  types: string[] = ['Expense', 'Income'];
  categories: string[] = ['Salary', 'Home', 'Groceries'];

  constructor(
    private reportsService: ReportsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.inEditMode = false;
    this.addEditForm = new FormGroup({
      title: new FormControl(''),
      category: new FormControl(this.categories[0]),
      type: new FormControl(this.types[0]),
      date: new FormControl(''),
      amount: new FormControl(''),
    });
  }

  back() {
    this.router.navigate(['/']);
  }

  async onSubmit() {
    // console.log(this.addEditForm.value.toISOString().slice(0, 10));
    const date = this.addEditForm.value.date.toString();
    // format date
    this.addEditForm.value.date = new Date(date).toISOString().slice(0, 10);
    this.reportsService.addReport(this.addEditForm.value);
    console.log('form', this.addEditForm.value);
    await this.router.navigate(['reports']);
  }
}
