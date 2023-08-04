import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee, Supervisor } from 'app/models/employee.model';
import { EmployeeService } from 'app/service/employee.service';
import { SupervisorService } from 'app/service/supervisor.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.css']
})
export class SupervisorComponent {
  employees:Employee[]= [];
  selectedEmployee: string='';
  supervisors:Supervisor[]=[];

  addSupervisorRequest: Supervisor={

  id: undefined,
  empId: '',
createdBy: '',
createdDate: '2023-07-26T11:40:51.509Z',
updatedDate: '2023-07-26T11:40:51.509Z',
updatedBy: '',
status:0,
pId: 0,
supervisorLevel: '',

}
  buttons = [
    { label: 'Position' , route:"/admin/position" },
    { label: 'Supervisor', route:"/admin/Supervisor" },
{ label: 'EducationLevel' , route:"/admin/education-level"},
{ label: 'Grade', route:"/admin/grade" },
{ label: 'Branch', route:"/admin/branch" },
     { label: 'Supervisor', route:"/admin/supervisor" },

  ];

  constructor(private employeeservice: EmployeeService ,private dialog:MatDialog, private supervisorservice :SupervisorService ,private router:Router) { }

  ngOnInit(): void {
    this.employeeservice.getAllEmployees()
    .subscribe({
      next: (employees) => {
        this.employees=employees;
      },
      error(response){
        console.log(response)
      },
      
    });
    this.supervisorservice.getAllSupervisors()
    .subscribe({
      next: (supervisors) => {
        this.supervisors=supervisors;
      },
      error(response){
        console.log(response)
      }
    });
  }
  addSupervisor(){
    this.addSupervisorRequest.empId = this.selectedEmployee;
    this.supervisorservice.addSupervisor(this.addSupervisorRequest)
    .subscribe({
    next:(supervisor)=>{
    this.router.navigate(["admin/supervisor"])
    },
     error(response){
      console.log(response)
    }
    })}
    getemployeeName(empId: string): string {
      const employee = this.employees.find((g) => g.empId === empId);
      return employee ? (employee.firstName,employee.middleName, employee.lastName )  : 'Unknown EMPLOYEE';
    }
    deleteSupervisor(id: string) {
      const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          // User confirmed deletion, proceed with the delete request
          this.supervisorservice.deleteSupervisor(id).subscribe({
            next: () => {
              // Remove the deleted supervisor from the supervisors array using filter
              this.supervisors = this.supervisors.filter((supervisor) => supervisor.id !== id);
            },
            error(response) {
              console.log(response);
            },
          });
        }
      });
    }
}