import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'app/models/employee.model';
import { EmployeeService } from 'app/service/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  employeeId: string;
  employee: Employee;
  employeeUpdated: boolean = false;

  employees: Employee[] = [];
 
   buttons = [
     { label: ' Add Employee ', route: '/employee-registration' },
     { label: '  List Employee ', route: '/employee-list' }
   ];
  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
 
      updatedDate: [ "2023-07-25T09:28:33.440Z", Validators.required],
      updatedBy: ['string', Validators.required],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      joinDate: ['', Validators.required],
      sex: ['', Validators.required],
      dateOfBityh: ['', Validators.required],
      placeOfBith: ['', Validators.required],
      martialStatus: ['', Validators.required],
      salutation: ['', Validators.required],
      nationality: ['', Validators.required],
      pensionNo: ['', Validators.required],
      imageData: [''],
      crime: [true],
      crimeDescription: [''],
      firstSupervisor: ['', Validators.required],
      secondSupervisor: ['', Validators.required],
      
    });

    this.route.params.subscribe((params) => {
      this.employeeId = params['empId']; // Updated to use empId as the route parameter
      this.employeeService.getEmployee(this.employeeId).subscribe((employee) => {
        this.employee = employee;
        this.populateForm();
        console.log(employee) // Call the method to populate the form with employee data
      });
    });
 
  }

  populateForm(): void {
    // Set the form values with the employee data
    this.employeeForm.setValue({
  
      updatedDate: this.employee.updatedDate,
      updatedBy: this.employee.updatedBy,
      firstName: this.employee.firstName,
      middleName: this.employee.middleName,
      lastName: this.employee.lastName,
      joinDate: this.employee.joinDate,
      sex: this.employee.sex,
      dateOfBityh: this.employee.dateOfBityh,
      placeOfBith: this.employee.placeOfBith,
      martialStatus: this.employee.martialStatus,
      salutation: this.employee.salutation,
      nationality: this.employee.nationality,
      pensionNo: this.employee.pensionNo,
      imageData: this.employee.imageData,
      crime: this.employee.crime,
      crimeDescription: this.employee.crimeDescription,
      firstSupervisor: this.employee.firstSupervisor,
      secondSupervisor: this.employee.secondSupervisor,
    
    });
  }

  updateEmployee(): void {
    if (this.employeeForm.valid) {
      const formData = this.employeeForm.value;
      // Add logic to update the employee using the formData
      // For example:
      this.employeeService.updateEmployee(formData,this.employeeId, ).subscribe({
        next: () => {
          this.employeeUpdated = true;
          setTimeout(() => {
            this.employeeUpdated = false;
          }, 2000);
        },
        error: (response) => {
          console.log(response);
        }
      });
    } else {
      this.validateAllFormFields(this.employeeForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }
}