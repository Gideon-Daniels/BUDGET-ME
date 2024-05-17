import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsGridComponent } from './reports-grid.component';

describe('ReportsGridComponent', () => {
  let component: ReportsGridComponent;
  let fixture: ComponentFixture<ReportsGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportsGridComponent]
    });
    fixture = TestBed.createComponent(ReportsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
