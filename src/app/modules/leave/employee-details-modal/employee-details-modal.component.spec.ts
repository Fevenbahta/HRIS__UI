import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDetailsModalComponent } from './employee-details-modal.component';

describe('EmployeeDetailsModalComponent', () => {
  let component: EmployeeDetailsModalComponent;
  let fixture: ComponentFixture<EmployeeDetailsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeDetailsModalComponent]
    });
    fixture = TestBed.createComponent(EmployeeDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
