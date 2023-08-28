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
  selectedEmployee: Employee[]=[];
 empIdsWithLeaveBalances;
  buttons = [ 
    { label: ' Leave Request ', route: '/leave/leave-request' }, 
    { label: ' Leave Balance ', route: '/leave/leave-balance' }, 

  ]; 

 leaveBalance:LeaveBalance={
    pId:0,
    empId:"",
    id:undefined,
isExpired:0,
  status:0,
  startDate: '2023-07-21T08:09:41.138Z',
  endDate: '2023-07-21T08:09:41.138Z',
createdBy: '',
createdDate: '2023-07-21T08:09:41.138Z',
updatedDate: '2023-07-21T08:09:41.138Z',
updatedBy: '',

annualDefaultBalance: 0,
annualRemainingBalance: 0,
previousYearAnnualBalance: 0,
sickDefaultBalance: 0,
sickRemainingBalance: 0,
maternityDefaultBalance: 0,
maternityRemainingBalance: 0,
paternityDefaultBalance: 0,
paternityRemainingBalance: 0,
compassinateDefaultBalance: 0,
compassinateRemainingBalance: 0,
educationDefaultBalance: 0,
educationRemainingBalance: 0,
marriageDefaultBalance: 0,
marraiageRemainingBalance: 0,
leaveWotPayDefaultBalance: 0,
leaveWotPayRemainingBalance: 0,
courtLeaveDefaultBalance: 0,
courtLeaveRemainingBalance: 0,
sickEndDate: '2023-07-21T08:09:41.138Z',


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
  next: (employees) => { 
    this.employees=employees


    this.leaveBalanceService.getAllLeaveBalance()
    .subscribe({
      next: (leaveBalances) => {
        this.leaveBalances =leaveBalances;
        this.filteredLeaveBalances=leaveBalances;
        const empIdsWithLeaveBalances = leaveBalances.map((lb) => lb.empId);
        this.selectedEmployee = this.employees.filter((employee) => !empIdsWithLeaveBalances.includes(employee.empId));
  
             
      },
      error(response){
        console.log(response)
      }
    });
  
   
  },
  error(response){
    console.log(response)
  }
});

 


}

hasLeaveBalance(empId: string): boolean {
  return this.leaveBalances.some(leaveBalance => leaveBalance.empId === empId);
}

addLeaveBalancesForSelectedEmployees() {
  for (const employee of this.selectedEmployee) {
    const newLeaveBalance: LeaveBalance = {
      pId:this.leaveBalance.pId,
      empId: employee.empId,

      isExpired: this.leaveBalance.isExpired,
      status: this.leaveBalance.status,
      startDate: this.leaveBalance.startDate,
      endDate: this.leaveBalance.endDate,
      createdBy: this.leaveBalance.createdBy,
      createdDate: this.leaveBalance.createdDate,
      updatedDate: this.leaveBalance.updatedDate,
      updatedBy: this.leaveBalance.updatedBy,   
annualDefaultBalance: this.leaveBalance.annualDefaultBalance,
annualRemainingBalance: this.leaveBalance.annualRemainingBalance,
previousYearAnnualBalance: this.leaveBalance.previousYearAnnualBalance,
sickDefaultBalance: this.leaveBalance.sickDefaultBalance,
sickRemainingBalance: this.leaveBalance.sickRemainingBalance,
maternityDefaultBalance: this.leaveBalance.maternityDefaultBalance,
maternityRemainingBalance: this.leaveBalance.maternityRemainingBalance,
paternityDefaultBalance: this.leaveBalance.maternityDefaultBalance,
paternityRemainingBalance: this.leaveBalance.paternityRemainingBalance,
compassinateDefaultBalance: this.leaveBalance.compassinateDefaultBalance,
compassinateRemainingBalance: this.leaveBalance.compassinateRemainingBalance,
educationDefaultBalance: this.leaveBalance.educationDefaultBalance,
educationRemainingBalance: this.leaveBalance.educationRemainingBalance,
marriageDefaultBalance: this.leaveBalance.marriageDefaultBalance,
marraiageRemainingBalance: this.leaveBalance.marraiageRemainingBalance,
leaveWotPayDefaultBalance: this.leaveBalance.leaveWotPayDefaultBalance,
leaveWotPayRemainingBalance: this.leaveBalance.leaveWotPayRemainingBalance,
courtLeaveDefaultBalance: this.leaveBalance.courtLeaveDefaultBalance,
courtLeaveRemainingBalance: this.leaveBalance.courtLeaveRemainingBalance,
sickEndDate: this.leaveBalance.sickEndDate,

    };

    this.leaveBalanceService.addLeaveBalance(newLeaveBalance).subscribe({
      next: (employees) => {
  
      
        this.leaveBalanceSaved = true;
        setTimeout(() => {
          this.leaveBalanceSaved = false;
        }, 2000);

        // Fetch updated leave balances
        this.leaveBalanceService.getAllLeaveBalance().subscribe({
          next: (leave) => {
            this.leaveBalances = leave;
            this.filteredLeaveBalances=leave;
            const empIdsWithLeaveBalances = leave.map((lb) => lb.empId);
            this.selectedEmployee = this.employees.filter((employee) => !empIdsWithLeaveBalances.includes(employee.empId));
      
          },
          error: (response) => {
            console.log(response);
          }
        });

        // Add the current leave balance to the array
        this.filteredLeaveBalances.push({ ...newLeaveBalance });
      },
      error(response) {
        console.log(response);
      }
    });
  }
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