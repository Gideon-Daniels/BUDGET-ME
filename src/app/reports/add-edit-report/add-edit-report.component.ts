import { Component, Inject, inject, OnInit } from '@angular/core';
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
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgClass, NgForOf } from '@angular/common';
import { ApiService } from '../../api.service';
import { MatButton } from '@angular/material/button';
import { Report } from '../../../../backend/src/models/Reports';

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
  isEditMode: boolean = false;
  addEditForm!: FormGroup;
  types: string[] = ['expense', 'income'];
  categories: string[] = [
    'salary',
    'home',
    'groceries',
    'entertainment',
    'transport',
    'work',
  ];
  readonly dialogRef = inject(MatDialogRef<AddEditReportComponent>);
  constructor(
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: Report | null,
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.data && this.addEditForm) {
      this.isEditMode = true;
      this.addEditForm.setValue({
        title: this.data.title,
        amount: this.data.amount,
        category: this.data.category,
        type: this.data.type,
        date: this.data.date,
        description: this.data.description,
      });
      this.addEditForm.markAsTouched();
    }
  }

  initForm() {
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

    if (this.isEditMode && this.data) {
      this.apiService.updateReport({
        id: this.data.id,
        ...this.addEditForm.value,
      });
    } else {
      this.apiService.addReport(this.addEditForm.value);
    }
    this.exitModal();
  }
}
