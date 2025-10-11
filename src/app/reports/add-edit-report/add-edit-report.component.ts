import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorStateMatcher, MatOption } from '@angular/material/core';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForOf } from '@angular/common';
import { ApiService } from '../../api.service';
import { MatButton } from '@angular/material/button';

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
  standalone: true,
  imports: [
    MatLabel,
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatDatepickerToggle,
    MatDatepicker,
    MatInput,
    MatDatepickerInput,
    MatOption,
    NgForOf,
    MatButton,
  ],
})
export class AddEditReportComponent implements OnInit {
  inEditMode: boolean = false;
  addEditForm: FormGroup = new FormGroup({
    description: new FormControl(),
    date: new FormControl(),
    category: new FormControl(),
    type: new FormControl(),
    amount: new FormControl(),
    title: new FormControl(),
  });
  types: string[] = ['Expense', 'Income'];
  categories: string[] = ['Salary', 'Home', 'Groceries'];
  readonly dialogRef = inject(MatDialogRef<AddEditReportComponent>);
  constructor(private apiService: ApiService) {}

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
      description: new FormControl(''),
      amount: new FormControl(''),
    });
  }

  back() {
    this.dialogRef.close();
  }

  async onSubmit() {
    // console.log(this.addEditForm.value.toISOString().slice(0, 10));
    const date = this.addEditForm.value.date.toString();
    // format date
    this.addEditForm.value.date = new Date(date).toISOString().slice(0, 10);
    this.apiService.addReport(this.addEditForm.value);
  }
}
