import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Employee } from 'app/models/employee.model';
import { LeaveType } from 'app/models/leaveType.model';
import { LeaveRequest } from 'app/models/leaverequestmodel';
import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { EmployeeIdService } from 'app/service/employee-id.service';
import { EmployeeService } from 'app/service/employee.service';
import { LeaveRequestService } from 'app/service/leaveRequest.service';
import { LeaveTypeService } from 'app/service/leaveType.service';

@Component({
  selector: 'app-leaverequest',
  templateUrl: './leaverequest.component.html',
  styleUrls: ['./leaverequest.component.scss']
})
export class LeaverequestComponent {
  leaveRequests:LeaveRequest[]=[];
  leaveTypes:LeaveType[]=[]
  selectedLeaveType: string='';
  selectedEmployee: string='';
  leaveRequestSaved: boolean = false;
  leaveRequestUpdated: boolean = false;
  employees:Employee[]=[];

  buttons = [ 
    { label: ' Leave Request ', route: '/leave/leave-request' }, 
    { label: ' Leave Balance ', route: '/leave/leave-balance' }, 

  ]; 
 
  leaveRequest: LeaveRequest = {
    pId: 0,
    id:undefined,
    createdBy: "",
    createdDate: "2023-07-26T06:13:52.512Z",
    updatedDate: "2023-07-26T06:13:52.512Z",
    updatedBy: "",
    status: 0,
    empId:'0bd1295a-dd75-413a-9eef-811934e2880d',
    startDate: '',
    endDate: "",
    leaveTypeId: '',
    leaveStatus: '',
    approvedBy:'',
    approvedDate:'',
  };

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

    this.leaveRequestservice.getAllLeaveRequest().subscribe({
      next: (leaveRequest) => {
        this.leaveRequests = leaveRequest
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

  // getLeaveTypeName(leavetypeId: string): string {
  //   const leaveType = this.leaveTypes.find((leaveType) => leaveType.leaveTypeId === leavetypeId);
  //   return leaveType ? leaveType.leaveTypeName : '';
  // }

  addleaveRequest() {

    this.leaveRequest.leaveTypeId = this.selectedLeaveType;
    this.leaveRequest.empId = this.selectedEmployee;
    this.leaveRequestservice.addLeaveRequest(this.leaveRequest).subscribe({
      next: (employee) => {
        
      //  this.router.navigate(['/employee-registration/work-experience']); 

      this.leaveRequestSaved=true
        setTimeout(() => {
          this.leaveRequestSaved = false;
        }, 2000);
        this.leaveRequestservice.getAllLeaveRequest().subscribe({
          next: (leaveRequests) => {
            this.leaveRequests = leaveRequests.filter(leaveRequest => leaveRequest.empId === this.employeeIdService.employeeId);
            ;
          },
          error: (response) => {
            console.log(response);
          }
        });
        // Add the current leaveRequest to the array
        this.leaveRequests.push({ ...this.leaveRequest });
        // Reset the form fields
        this.leaveRequest = {
          pId: 0,
          id:undefined,
          createdBy: "",
          createdDate: "2023-07-26T06:13:52.512Z",
          updatedDate: "2023-07-26T06:13:52.512Z",
          updatedBy: "",
          status: 0,
          empId: "0bd1295a-dd75-413a-9eef-811934e2880d",
          startDate: '',
          endDate: "",
          leaveTypeId: '',
          leaveStatus: '',
          approvedBy:'',
          approvedDate:'',
        };
      },
      error(response) {
        console.log(response)
      }
    });
  }
  updateleaveRequest(): void { 
    console.log(this.leaveRequest)
   
    this.leaveRequest.leaveTypeId = this.selectedLeaveType;
    this.leaveRequestservice.updateLeaveRequest(this.leaveRequest, this.leaveRequest.id).subscribe({
      next: () => {
        this.leaveRequestUpdated = true;
        setTimeout(() => {
  this.leaveRequestUpdated = false;
        }, 
        )
        this.leaveRequestservice.getAllLeaveRequest().subscribe({
          next: (leaveRequests) => {
            this.leaveRequests = leaveRequests.filter(leaveRequest => leaveRequest.empId === this.employeeIdService.employeeId);
            ;
          },
          error: (response) => {
            console.log(response);
          }
        });
      },
      error: (response) => {
        console.log(response);
      }
    });
    this.leaveRequest= {
      pId: 0,
      id:undefined,
      createdBy: "",
      createdDate: "2023-07-26T06:13:52.512Z",
      updatedDate: "2023-07-26T06:13:52.512Z",
      updatedBy: "",
      status: 0,
      empId: "0bd1295a-dd75-413a-9eef-811934e2880d",
      startDate: '',
      endDate: "",
      leaveTypeId: '',
      leaveStatus: '',
      approvedBy:'',
      approvedDate:'',
  
    };
  }




  editleaveRequest(leaveRequest: LeaveRequest): void {
    const leaveRequestToEdit = this.leaveRequests.find(leaveRequest => leaveRequest.id === leaveRequest.id);
    this.leaveRequest = leaveRequestToEdit;
    this.selectedLeaveType=leaveRequestToEdit.leaveTypeId
  }


  deleteleaveRequest(leaveRequest: LeaveRequest): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
      this.leaveRequestservice.deleteLeaveRequest(leaveRequest.id).subscribe(
        () => {
         
          this.leaveRequests = this.leaveRequests.filter((t) => t.id !== leaveRequest.id);

          // You can also show a success message to the user.
          //alert('leaveRequest deleted successfully!');
          this.router.navigate(['employee-registration/leaveRequest']);
        },
        (error) => {
          console.error(error);
          // If there was an error during deletion, you can show an error message.
         // alert('Failed to delete the leaveRequest. Please try again later.');
        }
        );
      }
    });
  }
  getEmployeeName(empId: string): string { 
    const employee = this.employees.find((g) => g.empId === empId); 
    return employee ? `${employee.firstName}  ${employee.middleName} ${employee.lastName}`:'Unknown EMPLOYEE'; 
  }  
   
  getLeaveTypeName(Id: string): string { 
    const leaveType = this.leaveTypes.find((g) => g.leaveTypeId === Id); 
    return leaveType ? `${leaveType.leaveTypeName} `:'Unknown EMPLOYEE'; 
  }

}
