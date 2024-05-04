import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
})
export class AddEditComponent implements OnInit {
  inEditMode: boolean = false;
  addEditForm: FormGroup = new FormGroup({});

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.addEditForm = new FormGroup({
      title: new FormControl(''),
      amount: new FormControl(''),
      typpe: new FormControl(''),
      category: new FormArray([new FormControl('')]),
      date: new FormGroup({
        day: new FormControl(''),
        month: new FormControl(''),
        year: new FormControl(''),
      }),
      description: new FormControl(''),
    });
  }

  back() {
    this.router.navigate(['/']);
  }
}
