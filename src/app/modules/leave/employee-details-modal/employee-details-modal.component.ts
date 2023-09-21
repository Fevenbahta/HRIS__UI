import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Department } from 'app/models/education.model';
import { CombinedEmployeeData } from 'app/models/employee.model';
import { Branch, Division, EducationLevel, EmployeePosition, Grade, Position, Step } from 'app/models/job-description.model';
import { LeaveType } from 'app/models/leaveType.model';

import { EmployeePositionService } from 'app/service/employee-position';
import { EmployeeService } from 'app/service/employee.service';
import { LeaveRequestService } from 'app/service/leaveRequest.service';
import { PositionService } from 'app/service/position.service';
import { BehaviorSubject, forkJoin } from 'rxjs';

@Component({
  selector: 'app-employee-details-modal',
  templateUrl: './employee-details-modal.component.html',
  styleUrls: ['./employee-details-modal.component.css']
})
export class EmployeeDetailsModalComponent {

  divisions:Division[]= [];
  departments:Department[]=[];

  branches:Branch[]= [];
  steps:Step[]= [];
  levels: Grade[]=[];
  educationlevels:EducationLevel[]= [];
  constructor(
    private employeeservice: EmployeeService,
    public dialogRef: MatDialogRef<EmployeeDetailsModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,private postionService: PositionService, private employeePosition:EmployeePositionService) {} // Replace with your actual backend service

      selectedEmployee: string;
      selectedPosition:string;
      selectedDivision:string;
      selectedBranch:string;
      division:Division[];
      positions:Position[]
      employePosition:EmployeePosition[]
    


 onCancelClick(): void {
  this.dialogRef.close(false);
}
ngOnInit(): void {
  
}

private isOpen = new BehaviorSubject<boolean>(false);
isOpen$ = this.isOpen.asObservable();




public employeeName = new BehaviorSubject<string | null>(null); // Corrected property name
employeeName$ = this.employeeName.asObservable();
leaveTypes:LeaveType[]=[] 
getLeaveTypeName(leavetypeId: string): string { 
  const leaveType = this.leaveTypes.find((leave) => leave.leaveTypeId === leavetypeId); 
  return leaveType ? leaveType.leaveTypeName : ''; 
} 
getEducationName(educationLevelId: string): string {
  const educationLevel = this.educationlevels.find((educationLevel) => educationLevel.id === educationLevelId);
  return educationLevel ? educationLevel.educationName : '';
}
getSupervisorName(positionId: string): string {
  const position = this.positions.find((position) => position.positionId === positionId);
  return position ? position.name : '';
}
getDivisionName(divisionId: string): string {
  const division = this.divisions.find((division) => division.divisionId === divisionId);
  return division ? division.description : '';
}

getStepName(stepId: string): string {
  const step = this.steps.find((step) => step.id === stepId);
  return step ? step.description : '';
}

getBranchName(branchId: string): string {
  const branch = this.branches.find((branch) => branch.id === branchId);
  return branch ? branch.name : '';
}
ge
getPositionName(positionId: string): string {
  
  const position = this.positions.find((g) => g.positionId === positionId);
  return position ? (position.name )  : 'Unknown position';
  

}
employeeData: CombinedEmployeeData;
openModal(empId: string) {
  this.selectedEmployee=empId
  this.employeeservice.getEmployeeData(this.selectedEmployee).subscribe(
    (data) => {
      this.employeeData = data;
      console.log('Employee:', data.employee);
      console.log('Addresses:', data.addresses);
      console.log('Emergency Contacts:', data.spouses);
    
     
    },
    (error) => {
      console.error('Error:', error);
    }
  );

       
  }

closeModal() {
  this.isOpen.next(false);
}
printEmployeeDetails() {
  // Implement printing functionality here
  // You can use browser-specific printing techniques or a library like ngx-print to handle printing.
  window.print();
  console.log(this.selectedEmployee);
}
}
