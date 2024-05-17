import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditReportComponent } from './add-edit-report.component';

describe('AddEditComponent', () => {
  let component: AddEditReportComponent;
  let fixture: ComponentFixture<AddEditReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditReportComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
