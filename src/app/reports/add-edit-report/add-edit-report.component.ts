import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { NgClass, NgForOf } from '@angular/common';
import { ApiService } from '../../api.service';
import { MatButton } from '@angular/material/button';

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
    NgClass,
  ],
})
export class AddEditReportComponent implements OnInit {
  inEditMode: boolean = false;
  addEditForm!: FormGroup;
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
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      amount: new FormControl('', [Validators.required]),
      category: new FormControl(this.categories[0]),
      type: new FormControl(this.types[0]),
      date: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });
  }

  exitModal() {
    this.dialogRef.close();
  }

  async onSubmit() {
    const date = this.addEditForm.value.date.toString();
    // todo : change date to be more dynamic depending on the browser timezone
    this.addEditForm.value.date = new Date(date).toLocaleDateString('en-CA');
    this.apiService.addReport(this.addEditForm.value);
    console.log(this.addEditForm.value.date);
    this.exitModal();
  }
}
