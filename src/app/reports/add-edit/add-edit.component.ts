import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { IReport } from '../report.model';

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
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
})
export class AddEditComponent implements OnInit {
  inEditMode: boolean = false;
  addEditForm: FormGroup = new FormGroup({});
  types: string[] = ['Expense', 'Income'];
  categories: string[] = ['Salary', 'Home', 'Groceries'];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.addEditForm = new FormGroup({
      title: new FormControl(''),
      amount: new FormControl(''),
      type: new FormControl(this.types[0]),
      category: new FormControl(this.categories[0]),
      date: new FormControl(''),
    });
  }

  back() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    console.log(this.addEditForm);
    const report = this.addEditForm.value as IReport;
  }
}
