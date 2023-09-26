import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Employee } from 'app/models/employee.model';
import { LeaveType } from 'app/models/leaveType.model';
import { LeaveRequest } from 'app/models/leaverequestmodel';
import { EmployeeIdService } from 'app/service/employee-id.service';
import { EmployeeService } from 'app/service/employee.service';
import { LeaveRequestService } from 'app/service/leaveRequest.service';
import { LeaveTypeService } from 'app/service/leaveType.service';

@Component({
  selector: 'app-admin-leaverequest',
  templateUrl: './admin-leaverequest.component.html',
  styleUrls: ['./admin-leaverequest.component.css']
})
export class AdminLeaverequestComponent {

  employees:Employee[]=[];
  leaveTypes:LeaveType[]=[]
  leavePenddings:LeaveRequest[]=[]
  leavependding:LeaveRequest;

  selectedLeaveType: string='';
  selectedEmployee: string='';

leaveApproved: boolean = false;
leaveRequests:LeaveRequest[]=[]; 
downloadFileUrl: string=''; 
buttons = [ 
  { label: ' Leave Request Form ', route: '/leave/leave-request-form' }, 
  { label: ' Leave Balance ', route: '/leave/leave-balance' }, 
  { label: ' Leave Approval ', route: '/leave/leave-approve' }, 
  { label: ' Employee Leave Balance ', route: '/leave/employeeleavebalance' }, 
  { label: 'Admin Leave Approval ', route: '/leave/leave-requests' }, 
]; 
  constructor(    private leaveRequestservice: LeaveRequestService,
    private router: Router,
    private employeeService:EmployeeService,
    private leavetypeservice: LeaveTypeService,
    private employeeIdService: EmployeeIdService,
    private dialog: MatDialog,
  ) { }
  leaveStatus:string="First-Approved";
  supervisor:string="bc314c90-d887-4733-9583-08203986b1c9";
  ngOnInit(): void {
    this.employeeService.getAllEmployees() 
.subscribe({ 
  next: (employees) => {
    // this.leaveRequest.empId = this.selectedEmployee;
    this.employees=employees
   },
  error: (response) => {
    console.log(response);
  }
});

this.leaveRequestservice.getAllLeaveRequestByStatus(this.leaveStatus).subscribe({
  next: (leaveRequest) => {
    this.leavePenddings = leaveRequest
    ;
    console.log(leaveRequest)
  },
  error: (response) => {
    console.log(response);
  }
});

this.leavetypeservice.getAllLeaveType().
subscribe({
  next: (leaveType) => {
  //this.leaveRequest.leaveTypeId = this.selectedLeaveType;
    this.leaveTypes= leaveType
    ;
  },
  error: (response) => {
    console.log(response);
  }
});    
  }

  fetchAndDisplayPDF(leave: LeaveRequest):void { 
    // Call your service method to fetch the PDF file  
    const leaveRequestToEdit = this.leaveRequests.find(leaveRequest => leaveRequest.leaveRequestId === leave.leaveRequestId); 
    leaveRequestToEdit.leaveRequestId 
    this.leaveRequestservice.getLeaveRequestFile(leaveRequestToEdit.leaveRequestId) 
    
      .subscribe( 
        (pdf: Blob) => { 
          const file = new Blob([pdf], { type: 'application/pdf' }); 
          this.downloadFileUrl = window.URL.createObjectURL(file); 
          window.open(this.downloadFileUrl, '_blank'); 
          //console.log(this.leaveRequest.leaveRequestId); 
           
        }, 
         
        (error) => { 
          console.error('Error loading PDF:', error); 
          // Handle the error, e.g., display an error message to the user. 
        } 
      ); 
  } 
  

getLeaveTypeName(leavetypeId: string): string {
  const leaveType = this.leaveTypes.find((leave) => leave.leaveTypeId === leavetypeId);
  return leaveType ? leaveType.leaveTypeName : '';
}
getEmployeeName(empId: string): string { 
  const employee = this.employees.find((g) => g.empId === empId); 
  return employee ? `${employee.firstName}  ${employee.middleName} ${employee.lastName}`:'Unknown EMPLOYEE'; 
} 
approveleavePendding(leaveRequest: LeaveRequest){
    
  var leaveRequestId=leaveRequest.leaveRequestId
  leaveRequest.leaveStatus="Approved"
 console.log(leaveRequest)
  this.leaveRequestservice
  .updateLeaveRequest(leaveRequest,leaveRequestId)
  .subscribe(() =>{
    this.leaveApproved = true;
console.log("updated")
      setTimeout(() => {
        this.leaveApproved= false;
      }, 2000);

    
    this.leaveRequestservice.getLeaveRequestByStatus(this.leaveStatus,this.supervisor).subscribe({
      next: (leaveRequest) => {
        this.leavePenddings = leaveRequest
        ;
      },
      error: (response) => {
        console.log(response);
      }
    });
  });
}
}

