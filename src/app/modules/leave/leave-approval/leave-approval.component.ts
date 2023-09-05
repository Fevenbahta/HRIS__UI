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
  selector: 'app-leave-approval',
  templateUrl: './leave-approval.component.html',
  styleUrls: ['./leave-approval.component.css']
})
export class LeaveApprovalComponent {

  leaveTypes:LeaveType[]=[]
  selectedLeaveType: string='';
  selectedEmployee: string='';
  employees:Employee[]=[];
leaveApproved: boolean = false;

 leaveStatus:string="pendding";

  buttons = [ 
    { label: ' Leave Request ', route: '/leave/leave-request' }, 
    { label: ' Leave Balance ', route: '/leave/leave-balance' }, 
    { label: ' Leave Approve ', route: '/leave/leave-approve' }, 
    { label: ' Employee Leave Balance ', route: '/leave/employeeleavebalance' }, 
  ]; 
  leavePenddings:LeaveRequest[]=[]
  leavependding:LeaveRequest;
  constructor(

    private leaveRequestservice: LeaveRequestService,
    private router: Router,
    private employeeService:EmployeeService,
    private leavetypeservice: LeaveTypeService,
    private employeeIdService: EmployeeIdService,
    private dialog: MatDialog,
  ) { }

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

    this.leaveRequestservice.getLeaveRequestByStatus(this.leaveStatus).subscribe({
      next: (leaveRequest) => {
        this.leavePenddings = leaveRequest
        ;
      },
      error: (response) => {
        console.log(response);
      }
    });
this.leavetypeservice.getAllLeaveType().
subscribe({
  next: (leaveType) => {
    // this.leaveRequest.leaveTypeId = this.selectedLeaveType;
    this.leaveTypes= leaveType
    ;
  },
  error: (response) => {
    console.log(response);
  }
});

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
    .subscribe(() => {
      this.leaveApproved = true;
      //  this.router.navigate(['employee-registration/job-description']);
        setTimeout(() => {
          this.leaveApproved= false;
        }, 2000);

      
      this.leaveRequestservice.getLeaveRequestByStatus(this.leaveStatus).subscribe({
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

