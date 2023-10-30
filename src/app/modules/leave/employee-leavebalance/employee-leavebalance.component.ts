import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Employee } from 'app/models/employee.model';
import { LeaveType } from 'app/models/leaveType.model';
import { AnnualLeaveBalance, OtherLeaveBalance } from 'app/models/leaverequestmodel';
import { EmployeeService } from 'app/service/employee.service';
import { LeaveTypeService } from 'app/service/leaveType.service';
import { LeaveBalanceService } from 'app/service/leavebalance.service';
import { OtherLeaveBalanceService } from 'app/service/otherleavebalance.service';

@Component({
  selector: 'app-employee-leavebalance',
  templateUrl: './employee-leavebalance.component.html',
  styleUrls: ['./employee-leavebalance.component.css']
})
export class EmployeeLeavebalanceComponent {

//  leaveBalance:AnnualLeaveBalance
//  otherleaveBalance:OtherLeaveBalance
 employee:Employee
   leaveTypes:LeaveType[]=[];
   
   buttons = [  
    { label: 'Leave Request',
    dropdownOptions: [
      { label: ' Employee LeaveRequest Form ', route: '/leave/leave-request-form' }, 
      { label: ' Self LeaveRequest Form', route: '/leave/self-leave' }, 
   
     ]},
   // { label: ' Leave Request Form ', route: '/leave/leave-request-form' }, 
    { label: ' Leave Balance ', route: '/leave/leave-balance' }, 
   // { label: ' Self LeaveRequest Form', route: '/leave/self-leave' }, 
    { label: ' Leave Approve ', route: '/leave/leave-approve' }, 
    { label: ' Employee Leave Balance ', route: '/leave/employeeleavebalance' }, 
    { label: 'Admin Leave Approval ', route: '/leave/leave-requests' },
    { label: 'Approved Leaves ', route: '/leave/approvedleaves' }, 


  ];  
  leaveBalance:AnnualLeaveBalance[]=[]


  otherleaveBalance:OtherLeaveBalance[]=[]
  
 

 constructor(
   private leaveTypeService: LeaveTypeService,
   private leaveBalanceService: LeaveBalanceService,
   private otherleaveBalanceService: OtherLeaveBalanceService,
   private employeeService:EmployeeService,
 
   private dialog: MatDialog,
   private router:Router){}
   ngOnInit(): void {
    console.log('Fetching employee...');
    this.employeeService.getEmployee("feae3a58-36a7-4c05-8041-ce71515d6813")
      .subscribe({
        next: (employee) => {
          this.employee = employee;
          console.log('Employee data:', this.employee);
        },
        error(response) {
          console.error('Error fetching employee:', response);
        }
      });
  
    console.log('Fetching leave balance...');
    this.leaveBalanceService.getLeaveBalance("feae3a58-36a7-4c05-8041-ce71515d6813")
      .subscribe({
        next: (leaveBalance) => {
          this.leaveBalance = leaveBalance;
      
          console.log('Leave balance data:', this.leaveBalance);
        },
        error(response) {
          console.error('Error fetching leave balance:', response);
        }
      });
  
    console.log('Fetching other leave balance...');
    this.otherleaveBalanceService.getOtherLeaveBalance("feae3a58-36a7-4c05-8041-ce71515d6813")
      .subscribe({
        next: (otherleaveBalance) => {
          this.otherleaveBalance = otherleaveBalance;
  console.log('Other leave balance data:', this.otherleaveBalance);
        },
        error(response) {
          console.error('Error fetching other leave balance:', response);
        }
      });         
  }
  

  
   getLeaveTypeName(Id: string): string { 
     const leaveType = this.leaveTypes.find((g) => g.leaveTypeId === Id); 
     return leaveType ? `${leaveType.leaveTypeName} `:'Unknown EMPLOYEE'; 
   }  }