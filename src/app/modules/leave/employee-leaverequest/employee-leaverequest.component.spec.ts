import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLeaverequestComponent } from './employee-leaverequest.component';

describe('EmployeeLeaverequestComponent', () => {
  let component: EmployeeLeaverequestComponent;
  let fixture: ComponentFixture<EmployeeLeaverequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeLeaverequestComponent]
    });
    fixture = TestBed.createComponent(EmployeeLeaverequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
