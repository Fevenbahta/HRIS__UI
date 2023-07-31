
import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { Route, Router } from '@angular/router'; 
 
 
import { Employee, Supervisor } from 'app/models/employee.model'; 
import { EmployeeService } from 'app/service/employee.service'; 
import { PidService } from 'app/service/pid.service'; 
import { SupervisorService } from 'app/service/supervisor.service'; 
 
@Component({ 
  selector: 'app-employee-registration', 
  templateUrl: './employee-registration.component.html', 
  styleUrls: ['./employee-registration.component.css'] 
}) 
export class EmployeeRegistrationComponent implements OnInit { 
  employeeForm: FormGroup; 
 
 employeeSaved: boolean = false; 
 employees: Employee[] = []; 
 supervisors: Supervisor[] = []; 
 firstSupervisors: Supervisor[] = []; // Array to store first supervisors only 
 selectedFirstSupervisor: string = ''; 
 
 secondSupervisors: Supervisor[] = []; // Array to store first supervisors only 
 selectedSecondSupervisor: string = ''; 
  buttons = [ 
    { label: ' Add Employee ', route: '/employee-registration' }, 
    { label: '  List Employee ', route: '/employee-list' } 
  ]; 
 
  constructor( 
    private formBuilder: FormBuilder, 
    private pIdservice: PidService, 
    private employeeservice: EmployeeService, 
    private router: Router, 
    private supervisorService:SupervisorService 
  ) {} 
 
  ngOnInit(): void { 
 
     
   
 
    this.employeeForm = this.formBuilder.group({ 
      pId: [0], // You can add any specific validation rule here, like Validators.required 
      createdBy: ['string', Validators.required], 
      createdDate: [ "2023-07-25T09:28:33.440Z", Validators.required], 
      updatedDate: [ "2023-07-25T09:28:33.440Z", Validators.required], 
      updatedBy: ['string', Validators.required], 
      empId: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"], // You can add any specific validation rule here, like Validators.required 
      ecxId: ['ecx/pi',Validators.required], 
      adId: ['ad/pi', Validators.required], 
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
      status: [0,] 
    }); 
 
    this.supervisorService.getAllSupervisors() 
    .subscribe({ 
      next: (supervisors) => { 
        this.supervisors = supervisors; 
        this.firstSupervisors = supervisors.filter((supervisor) => supervisor.supervisorLevel == 'First Supervisor'); 
        this.secondSupervisors = supervisors.filter((supervisor) => supervisor.supervisorLevel == 'Second Supervisor'); 
      }, 
      error(response) { 
        console.log(response); 
      }, 
    }); 
    this.employeeservice.getAllEmployees() 
    .subscribe({ 
      next: (employees) => { 
        this.employees=employees; 
      }, 
      error(response){ 
        console.log(response) 
      }, 
       
    }); 
} 
  
   
 
  addEmployee(): void { 
    if (this.employeeForm.valid) { 
      const formData = this.employeeForm.value; 
      // formData.empId = uuidv4(); 
      this.employeeForm.value.firstSupervisor = this.selectedFirstSupervisor; 
      this.employeeForm.value.secondSupervisor = this.selectedSecondSupervisor; 
      this.employeeservice.addEmployee(formData).subscribe({ 
        next: (contact) => { 
      
          this.employeeSaved = true; 
          setTimeout(() => { 
            this.employeeSaved = false; 
          }, 2000); 
          // Add the current work experience to the array 
          this.employees.push({ ...this.employeeForm.value }); 
          // Reset the form fields 
      
            this.router.navigate(['/employee-registration/contact']); 
        }, 
        error: (response) => { 
          console.log(response); 
        } 
      }); 
console.log(this.employeeForm.value) 
    } 
     else { 
      this.validateAllFormFields(this.employeeForm); 
      console.log("error") 
    } 
  } 
validateAllFormFields(formGroup: FormGroup) { 
  Object.keys(formGroup.controls).forEach((field) => { 
    const control = formGroup.get(field); 
    if (control instanceof FormGroup) { 
      this.validateAllFormFields(control); 
    } else { 
      control.markAsTouched({ onlySelf: true }); 
    } 
  });} 
 
  getEmployeeName(empId: string): string { 
    const employee = this.employees.find((g) => g.empId === empId); 
    return employee ? `${employee.firstName}  ${employee.middleName} ${employee.lastName}`:'Unknown EMPLOYEE'; 
  } 
  } 
 
 
   
