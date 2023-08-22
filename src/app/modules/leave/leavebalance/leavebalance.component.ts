import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Employee } from 'app/models/employee.model';
import { LeaveType } from 'app/models/leaveType.model';
import { LeaveBalance } from 'app/models/leaverequestmodel';
import { EmployeeService } from 'app/service/employee.service';
import { LeaveTypeService } from 'app/service/leaveType.service';
import { LeaveBalanceService } from 'app/service/leavebalance.service';

@Component({
  selector: 'app-leavebalance',
  templateUrl: './leavebalance.component.html',
  styleUrls: ['./leavebalance.component.scss']
})
export class LeavebalanceComponent {
 leaveBalanceSaved: boolean = false;
 leaveBalanceUpdated: boolean = false;
leaveBalances:LeaveBalance[]=[]
employees:Employee[]=[]
  leaveTypes:LeaveType[]= [];
  selectedLeaveType: string='';
  buttons = [ 
    { label: ' Leave Request ', route: '/leave/leave-request' }, 
    { label: ' Leave Balance ', route: '/leave/leave-balance' }, 

  ]; 

 leaveBalance:LeaveBalance={
    pId:0,
    empId:"",
    id:undefined,
  leaveTypeId:'',
defaultBalance:0,
remainingBalance:0,
isExpired:0,
  status:0,
  startDate: '',
  endDate: '2023-07-21T08:09:41.138Z',
createdBy: '',
createdDate: '2023-07-21T08:09:41.138Z',
updatedDate: '2023-07-21T08:09:41.138Z',
updatedBy: '',

  }
 

 searchTerm: string = ''; 

  filteredLeaveBalances: LeaveBalance[]=[]; 

constructor(
  private leaveTypeService: LeaveTypeService,
  private leaveBalanceService: LeaveBalanceService,
  private employeeService:EmployeeService,

  private dialog: MatDialog,
  private router:Router){}
ngOnInit(): void{


  this.employeeService.getAllEmployees() 
.subscribe({ 
  next: (employees) => { },
  error(response){
    console.log(response)
  }
});

 
this.leaveTypeService.getAllLeaveType()
.subscribe({
  next: (LeaveType) => {
    this.leaveTypes=LeaveType;
  },
  error(response){
    console.log(response)
  }
});


this.leaveBalanceService.getAllLeaveBalance()
.subscribe({
  next: (leaveBalances) => {
    this.leaveBalances =leaveBalances;
    this.filteredLeaveBalances=leaveBalances;
         
  },
  error(response){
    console.log(response)
  }
});
}


onSearch() {


  // this.filteredEmployees = this.employees; 
   if (this.searchTerm.trim() === '') {
  
     this.filteredLeaveBalances = this.leaveBalances;
   } else {
  
     this.filteredLeaveBalances = this.leaveBalances.filter(leaveBalance => {
       
       return (
        this.getEmployeeName(leaveBalance.empId).toLowerCase().startsWith(this.searchTerm.toLowerCase()) 

       );
       

     });
   }
  
   }
 
  getEmployeeName(empId: string): string { 
    const employee = this.employees.find((g) => g.empId === empId); 
    return employee ? `${employee.firstName}  ${employee.middleName} ${employee.lastName}`:'Unknown EMPLOYEE'; 
  }  
   
  getLeaveTypeName(Id: string): string { 
    const leaveType = this.leaveTypes.find((g) => g.leaveTypeId === Id); 
    return leaveType ? `${leaveType.leaveTypeName} `:'Unknown EMPLOYEE'; 
  }  }