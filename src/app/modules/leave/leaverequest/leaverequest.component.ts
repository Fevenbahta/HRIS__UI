import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';
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
    leaveRequestId:undefined,
    createdBy: "",
    createdDate: "2023-07-26T06:13:52.512Z",
    updatedDate: "2023-07-26T06:13:52.512Z",
    updatedBy: "",
    status: 0,
    empId:'0bd1295a-dd75-413a-9eef-811934e2880d',
    startDate: '',
    endDate: "",
    leaveTypeId: '',
    leaveStatus: 'pendding',
    approvedBy:'',
    approvedDate:'',
    reason: '',
    file:null,
    workingDays: 0,
    sickStartDate: "2023-07-26T06:13:52.512Z",
    sickEndDate: "2023-07-26T06:13:52.512Z",
  };

   selectedFile: File | null = null;


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

  openFileDialog(): void {
    // Trigger click on the file input element to open the image dialog
    const fileInput = document.getElementById('file') as HTMLInputElement;
    fileInput.click();
  }
  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.getBase64(file).then((data) => {
       this.selectedFile = data;
        
      });
    }
  }
  
  private getBase64(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }


  getLeaveTypeName(leavetypeId: string): string {
    const leaveType = this.leaveTypes.find((leave) => leave.leaveTypeId === leavetypeId);
    return leaveType ? leaveType.leaveTypeName : '';
  }

  addleaveRequest() {

    this.leaveRequest.leaveTypeId = this.selectedLeaveType;
    this.leaveRequest.empId = this.selectedEmployee;
   
  
    
      console.log( this.leaveRequest.file)
    this.leaveRequestservice.addLeaveRequest(this.leaveRequest).subscribe({
      next: (employee) => {
        
      //  this.router.navigate(['/employee-registration/work-experience']); 

      this.leaveRequestSaved=true
        setTimeout(() => {
          this.leaveRequestSaved = false;
        }, 2000);
        this.leaveRequestservice.getAllLeaveRequest().subscribe({
          next: (leaveRequests) => {
            this.leaveRequests = leaveRequests
            ;
          },
          error: (response) => {
            console.log(response);
          }
        });
        // Add the current leaveRequest to the array
        this.leaveRequests.push({ ...this.leaveRequest });
        // Reset the form fields

        this.selectedEmployee= '';
        this.selectedLeaveType= '';
        this.leaveRequest = {
          pId: 0,
    leaveRequestId:undefined,
    createdBy: "",
    createdDate: "2023-07-26T06:13:52.512Z",
    updatedDate: "2023-07-26T06:13:52.512Z",
    updatedBy: "",
    status: 0,
    empId:'0bd1295a-dd75-413a-9eef-811934e2880d',
    startDate: '',
    endDate: "",
    leaveTypeId: '',
    leaveStatus: 'pendding',
    approvedBy:'',
    approvedDate:'',
    reason: '',
    file: null,
    workingDays: 0,
    sickStartDate: "2023-07-26T06:13:52.512Z",
    sickEndDate: "2023-07-26T06:13:52.512Z",
        };
      } ,
      error(response) {
        console.log(response)
      }
    });
  }
  updateleaveRequest(): void { 
    console.log(this.leaveRequest)
    this.leaveRequest.updatedDate=new Date().toISOString();;
    if(this.leaveRequest.endDate < this.leaveRequest.updatedDate ){
   this.leaveRequest.leaveStatus='pendding'
    this.leaveRequest.leaveTypeId = this.selectedLeaveType;
    this.leaveRequest.file=this.selectedFile
    this.leaveRequestservice.updateLeaveRequest(this.leaveRequest, this.leaveRequest.leaveRequestId).subscribe({
      next: () => {
        this.leaveRequestUpdated = true;
        setTimeout(() => {
  this.leaveRequestUpdated = false;
        }, 2000);
        
        this.leaveRequestservice.getAllLeaveRequest().subscribe((leave) => {
          this.leaveRequests = leave;
        });
      },
      error: (response) => {
        console.log(response);
      }
    });
    this.selectedLeaveType=''
    this.selectedEmployee=''
    this.leaveRequest= {
      pId: 0,
      leaveRequestId:undefined,
      createdBy: "",
      createdDate: "2023-07-26T06:13:52.512Z",
      updatedDate: "2023-07-26T06:13:52.512Z",
      updatedBy: "",
      status: 0,
      empId:'0bd1295a-dd75-413a-9eef-811934e2880d',
      startDate: '',
      endDate: "",
      leaveTypeId: '',
      leaveStatus: 'pendding',
      approvedBy:'',
      approvedDate:'',
      reason: '',
      file: null,
      workingDays: 0,
      sickStartDate: "2023-07-26T06:13:52.512Z",
      sickEndDate: "2023-07-26T06:13:52.512Z",
  
    };}
  }




  editleaveRequest(leave: LeaveRequest): void {
    const leaveRequestToEdit = this.leaveRequests.find(leaveRequest => leaveRequest.leaveRequestId === leave.leaveRequestId);
    this.leaveRequest = leaveRequestToEdit;
    this.selectedLeaveType=leaveRequestToEdit.leaveTypeId
    this.selectedEmployee=leaveRequestToEdit.empId
    this.leaveRequestservice.getAllLeaveRequest().subscribe({
      next: (leaveRequest) => {
        this.leaveRequests = leaveRequest
        ;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }


  deleteleaveRequest(leaveRequest: LeaveRequest): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
      this.leaveRequestservice.deleteLeaveRequest(leaveRequest.leaveRequestId).subscribe({
        next: (response) => {
          this.dialog.open(DeletesucessfullmessageComponent)
          this.leaveRequestservice.getAllLeaveRequest().subscribe((leave) => {
            this.leaveRequests = leave;
          });
        },
        error(response) {
          console.log(response);}
        });
      }
    });
  }
  

  getEmployeeName(empId: string): string { 
    const employee = this.employees.find((g) => g.empId === empId); 
    return employee ? `${employee.firstName}  ${employee.middleName} ${employee.lastName}`:'Unknown EMPLOYEE'; 
  }  
   
  // getLeaveTypeName(Id: string): string { 
  //   const leaveType = this.leaveTypes.find((g) => g.leaveTypeId === Id); 
  //   return leaveType ? `${leaveType.leaveTypeName} `:'Unknown EMPLOYEE'; 
  // }

}
