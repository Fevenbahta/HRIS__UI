import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'app/models/employee.model';
import { EmployeeService } from 'app/service/employee.service';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {
  employees:Employee[]= [];
    buttons = [   
      { label: ' Add Employee ', route: '/employee-registration' },
      { label: '  List Employee ', route: '/employee-list' }
    ]
constructor(private employeeservice: EmployeeService,
  private router: Router ){}
ngOnInit(): void{
this.employeeservice.getAllEmployees()
.subscribe({
  next: (employees) => {
    this.employees=employees;
  },
  error(response){
    console.log(response)
  }
});
}

deleteEmployee(id:string){
  this.employeeservice.deleteEmployee(id)
  .subscribe({
    next: (response) => {
      // Reload the employee list after successful deletion
      this.employeeservice.getAllEmployees().subscribe((employees) => {
        this.employees = employees;
      });
    },
    error(response) {
      console.log(response);
    }
  })

}
editEmployee(employee: Employee): void {
  // Here, we will navigate to the edit page for the selected EmergencyContact.
  this.router.navigate(["/edit-employee", employee.empId]);
}
 
getFirstSupervisorName(firstSupervisor: string): string { 
  const employee = this.employees.find((g) => g.empId === firstSupervisor); 
  return employee ? `${employee.firstName}  ${employee.middleName} ${employee.lastName}`:'Unknown EMPLOYEE'; 
} 
getSecondSupervisorName(secondSupervisor: string): string { 
  const employee = this.employees.find((g) => g.empId === secondSupervisor); 
  return employee ? `${employee.firstName}  ${employee.middleName} ${employee.lastName}`:'Unknown EMPLOYEE'; 
} 
}