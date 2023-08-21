import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LeaveType } from 'app/models/leaveType.model';
import { LeaveRequest } from 'app/models/leaverequestmodel';
import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { EmployeeIdService } from 'app/service/employee-id.service';
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
  leaveRequestSaved: boolean = false;
  leaveRequestUpdated: boolean = false;

  buttons = [ 
    { label: ' Leave Request ', route: '/leave/leave-request' }, 

  ]; 
 
  leaveRequest: LeaveRequest = {
    pId: 0,
    id:undefined,
    createdBy: "",
    createdDate: "2023-07-26T06:13:52.512Z",
    updatedDate: "2023-07-26T06:13:52.512Z",
    updatedBy: "",
    status: 0,
    empId: undefined,
    startDate: '',
    endDate: "",
    leaveType: '',
    leaveStatus: '',
    approvedBy:'',
    approvedDate:'',
  };

  constructor(

    private leaveRequestservice: LeaveRequestService,
    private router: Router,

    private leavetypeservice: LeaveTypeService,
    private employeeIdService: EmployeeIdService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.leaveRequestservice.getAllLeaveRequest().subscribe({
      next: (leaveRequests) => {
        this.leaveRequests = leaveRequests.filter(leaveRequest => leaveRequest.empId === this.employeeIdService.employeeId);
        ;
      },
      error: (response) => {
        console.log(response);
      }
    });
this.leavetypeservice.getAllLeaveType().
subscribe({
  next: (leaveRequestlevels) => {
    this.leaveTypes= leaveRequestlevels
    ;
  },
  error: (response) => {
    console.log(response);
  }
});

  }

  getLeaveTypeName(leavetypeId: string): string {
    const leaveType = this.leaveTypes.find((leaveType) => leaveType.id === leavetypeId);
    return leaveType ? leaveType.name : '';
  }

  addleaveRequest() {
    this.leaveRequest.empId = this.employeeIdService.employeeId;
    this.leaveRequest.leaveType = this.selectedLeaveType;
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
          empId: undefined,
          startDate: '',
          endDate: "",
          leaveType: '',
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
   
    this.leaveRequest.leaveType = this.selectedLeaveType;
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
      empId: undefined,
      startDate: '',
      endDate: "",
      leaveType: '',
      leaveStatus: '',
      approvedBy:'',
      approvedDate:'',
  
    };
  }




  editleaveRequest(leaveRequest: LeaveRequest): void {
    const leaveRequestToEdit = this.leaveRequests.find(leaveRequest => leaveRequest.id === leaveRequest.id);
    this.leaveRequest = leaveRequestToEdit;
    this.selectedLeaveType=leaveRequestToEdit.leaveType
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


}
