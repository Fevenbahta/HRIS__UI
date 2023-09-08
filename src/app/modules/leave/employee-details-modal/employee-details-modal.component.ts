import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Division, EmployeePosition, Position } from 'app/models/job-description.model';
import { LeaveRequest } from 'app/models/leaverequestmodel';
import { EmployeePositionService } from 'app/service/employee-position';
import { LeaveRequestService } from 'app/service/leaveRequest.service';
import { PositionService } from 'app/service/position.service';
import { BehaviorSubject, forkJoin } from 'rxjs';

@Component({
  selector: 'app-employee-details-modal',
  templateUrl: './employee-details-modal.component.html',
  styleUrls: ['./employee-details-modal.component.css']
})
export class EmployeeDetailsModalComponent {


  constructor(
    public dialogRef: MatDialogRef<EmployeeDetailsModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,private postionService: PositionService, private leaveRequestService: LeaveRequestService,private employeePosition:EmployeePositionService) {} // Replace with your actual backend service

      selectedEmployee: string;
      selectedPosition:string;
      selectedDivision:string;
      selectedBranch:string;
      division:Division[];
      positions:Position[]
      employePosition:EmployeePosition[]
      leaveRequest:LeaveRequest[]


 onCancelClick(): void {
  this.dialogRef.close(false);
}
ngOnInit(): void {
  this.employeePosition.getAllEmployeePosition()
.subscribe({ 
next: (employees) => {
  // this.leaveRequest.empId = this.selectedEmployee;
  this.employePosition=employees
  
 },
error: (response) => {
  console.log(response);
},

});
this.postionService.getAllPosition()
.subscribe({ 
next: (postion) => {
  // this.leaveRequest.empId = this.selectedEmployee;
  this.positions=postion
  console.log(this.positions)
 },
error: (response) => {
  console.log(response);
}})
}

private isOpen = new BehaviorSubject<boolean>(false);
isOpen$ = this.isOpen.asObservable();




public employeeName = new BehaviorSubject<string | null>(null); // Corrected property name
employeeName$ = this.employeeName.asObservable();

getPositionName(positionId: string): string {
  
  const position = this.positions.find((g) => g.positionId === positionId);
  return position ? (position.name )  : 'Unknown position';
  

}
openModal(leaverequest: LeaveRequest) {
  this.selectedEmployee=leaverequest.empId
    this.employeePosition.getEmployeePosition(leaverequest.empId).subscribe({ 
      next: (employees) => {
        // this.leaveRequest.empId = this.selectedEmployee;
     

       // this.selectedPosition= employees.position
        this.selectedPosition= employees.position;
        this.selectedDivision=employees.divisionId;
        this.selectedBranch=employees.branchId;
        console.log(this.selectedDivision)
       }})

       
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
