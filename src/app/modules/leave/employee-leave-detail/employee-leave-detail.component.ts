import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LeaveType } from 'app/models/leaveType.model';
import { CombinedLeaveData } from 'app/models/leaverequestmodel';
import { LeaveRequestService } from 'app/service/leaveRequest.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-employee-leave-detail',
  templateUrl: './employee-leave-detail.component.html',
  styleUrls: ['./employee-leave-detail.component.css']
})
export class EmployeeLeaveDetailComponent {
  constructor(
    private leaveService: LeaveRequestService,
    public dialogRef: MatDialogRef<EmployeeLeaveDetailComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, private leaveRequestService: LeaveRequestService) {} // Replace with your actual backend service


      selectedEmployee: string;
      private isOpen = new BehaviorSubject<boolean>(false);
isOpen$ = this.isOpen.asObservable();




public employeeName = new BehaviorSubject<string | null>(null); // Corrected property name
employeeName$ = this.employeeName.asObservable();
leaveTypes:LeaveType[]=[] 
getLeaveTypeName(leavetypeId: string): string { 
  const leaveType = this.leaveTypes.find((leave) => leave.leaveTypeId === leavetypeId); 
  return leaveType ? leaveType.leaveTypeName : ''; 
} 


      leaveData: CombinedLeaveData;
openModal(empId: string) {
  this.selectedEmployee=empId
  this.leaveService.getLeaveData(this.selectedEmployee).subscribe(
    (data) => {
      this.leaveData = data;
      console.log('Employee:', data.employee);
      console.log('LeaveRequest:', data.leaveRequests);
      console.log('Annual:', data.annualLeaveBalances);
    
     
    },
    (error) => {
      console.error('Error:', error);
    }
  );

       
  }
  onCancelClick(): void {
    this.dialogRef.close(false);
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
