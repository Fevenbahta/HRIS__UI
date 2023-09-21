import { HttpClient } from '@angular/common/http'; 
import { Component } from '@angular/core'; 
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog'; 
import { Router } from '@angular/router'; 
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component'; 
import { Employee } from 'app/models/employee.model'; 
import { LeaveType } from 'app/models/leaveType.model'; 
import { AnnualLeaveBalance, LeaveRequest, OtherLeaveBalance } from 'app/models/leaverequestmodel'; 
import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component'; 
import { EmployeeIdService } from 'app/service/employee-id.service'; 
import { EmployeeService } from 'app/service/employee.service'; 
import { LeaveRequestService } from 'app/service/leaveRequest.service'; 
import { LeaveTypeService } from 'app/service/leaveType.service'; 
import { LeaveBalanceService } from 'app/service/leavebalance.service'; 
import { OtherLeaveBalanceService } from 'app/service/otherleavebalance.service';
import { EmployeeLeaveDetailComponent } from '../employee-leave-detail/employee-leave-detail.component';
import { NgxImageCompressService } from 'ngx-image-compress';
import * as JSZip from 'jszip';

function dateRangeValidator(control: AbstractControl): ValidationErrors | null {
  const startDate = control.get('startDate').value;
  const endDate = control.get('endDate').value;

  if (startDate && endDate && startDate > endDate) {
    return { invalidDateRange: true };
  }


  return null;
}
 
@Component({ 
  selector: 'app-leaverequest', 
  templateUrl: './leaverequest.component.html', 
  styleUrls: ['./leaverequest.component.scss'] 
}) 
export class LeaverequestComponent { 
  leaveRequestForm: FormGroup;
  leaveRequests:LeaveRequest[]=[]; 
  leaveTypes:LeaveType[]=[] 
  leaveBalances:AnnualLeaveBalance[]=[] 
  selectedLeaveBalance:number=0; 
  selectedPreviousYear:number=0; 
  selectedTwoPerviousYear:number=0; 
  selectedLeaveType: string=''; 
  leaveName: string='' 
  downloadFileUrl: string=''; 
  pdfUrl:string='' 
  selectedEmployee: string='cdd54097-fb5e-44e2-bfd1-dca6a169bbbd'; 
  leaveRequestSaved: boolean = false; 
  leaveRequestUpdated: boolean = false; 
  employees:Employee[]=[]; 
  otherLeaveBalances:OtherLeaveBalance[]=[] 
  selectedOtherLeaveBalance:number=0 
  fileType: string = 'other'; // Initialize as 'other' by default 
  fileData: string = ''; 
  buttons = [  
    { label: ' Leave Request ', route: '/leave/leave-request' },  
    { label: ' Leave Balance ', route: '/leave/leave-balance' },
    { label: ' Leave Approve ', route: '/leave/leave-approve' }, 
    { label: ' Employee Leave Balance ', route: '/leave/employeeleavebalance' },   
 
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
    startDate: null, 
    endDate: null, 
    leaveTypeId: '', 
    leaveStatus: 'pendding', 
    approvedBy:'', 
    approvedDate:'', 
    reason: '', 
    file:null, 
    workingDays: null, 
    sickStartDate: "2023-07-26T06:13:52.512Z", 
    sickEndDate: "2023-07-26T06:13:52.512Z", 
    supervisor:"bc314c90-d887-4733-9583-08203986b1c9"
  }; 
 
   selectedFile: File | null = null; 
 
 
  constructor( 
   
    private imageCompress: NgxImageCompressService,
   private formBuilder: FormBuilder,
    private leaveRequestservice: LeaveRequestService, 
    private router: Router, 
    private employeeService:EmployeeService, 
    private otherLeaveBalanceService:OtherLeaveBalanceService, 

    private leavetypeservice: LeaveTypeService, 
    private leaveBalanceService: LeaveBalanceService, 
    private employeeIdService: EmployeeIdService, 
    private dialog: MatDialog, 
    private http: HttpClient, 
  ) {  
      this.leaveRequestForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    },  { validator: dateRangeValidator }); // Add the custom validator here
  
  } 

  
 
  ngOnInit(): void { 
     
    this.leaveRequestservice.getLeaveRequestByEmp(this.selectedEmployee).subscribe({ 
      next: (leaveRequestd) => { 
        this.leaveRequests = leaveRequestd; 
         
       
      }, 
      error: (response) => { 
        console.log(response); 
      } 
    }); 
  
   
     
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
this.leaveBalanceService.getAllLeaveBalance()  
.subscribe({  
  next: (leaveBalances) => { 
    // this.leaveRequest.empId = this.selectedEmployee; 
    this.leaveBalances=leaveBalances 
 
   }, 
  error: (response) => { 
    console.log(response); 
  } 
}); 
this.otherLeaveBalanceService.getAllOtherLeaveBalance()  
.subscribe({  
  next: (otherLeaveBalance) => { 
    //
this.leaveRequest
.empId = this.selectedEmployee; 
    this.otherLeaveBalances=otherLeaveBalance 
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
 
    
  // private getBase64(file: File): Promise<any> { 
  //   return new Promise((resolve, reject) => { 
  //     const reader = new FileReader(); 
  //     reader.readAsDataURL(file); 
  //     reader.onload = () => resolve(reader.result); 
  //     reader.onerror = (error) => reject(error); 
  //   }); 
  // } 
  
 
 
  getLeaveTypeName(leavetypeId: string): string { 
    const leaveType = this.leaveTypes.find((leave) => leave.leaveTypeId === leavetypeId); 
    return leaveType ? leaveType.leaveTypeName : ''; 
  } 
  onFileSelected(event: any) { 
   
    const file: File = event.target.files[0]; 
    const reader = new FileReader(); 
    reader.onload = () => { 
        const base64String = reader.result.toString().split(',')[1]; // Extract the base64 part 
        this.leaveRequest.file = base64String; 
    }; 
    reader.readAsDataURL(file); 
  } 

//   onFileSelected(event: any) {
//     const file: File = event.target.files[0];

//     const formData = new FormData();
//     formData.append('zipFile', file);

//  this.leaveRequestservice.uploadZipFile(formData).subscribe(
//         (response) => {
//             console.log('ZIP file uploaded successfully', response);
//         },
//         (error) => {
//             console.error('Error uploading ZIP file', error);
//         }
//     );
// }
 
  addleaveRequest() { 
 
    this.leaveRequest.leaveTypeId = this.selectedLeaveType; 
    this.leaveRequest.empId = this.selectedEmployee; 
    this.leaveRequest.supervisor = "bc314c90-d887-4733-9583-08203986b1c9"; 
    const selectedStartDate = new Date(this.leaveRequestForm.get('startDate').value);
    const selectedEndDate = new Date(this.leaveRequestForm.get('endDate').value);
    
    // Add one day to both the start and end dates
    selectedStartDate.setDate(selectedStartDate.getDate() + 1);
    selectedEndDate.setDate(selectedEndDate.getDate() + 1);
    
    // Assign the modified dates to this.leaveRequest
    this.leaveRequest.startDate = selectedStartDate;
    this.leaveRequest.endDate = selectedEndDate;
    const startDate = this.leaveRequestForm.get('startDate').value;
  const endDate = this.leaveRequestForm.get('endDate').value;

  // Get the current date
  const currentDate = new Date();

  // Check if start date is greater than current date and end date is greater than start date
  if (startDate < endDate) {
     
  
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
    leaveRequestId:this.leaveRequest.leaveRequestId, 
    createdBy: "", 
    createdDate: "2023-07-26T06:13:52.512Z", 
    updatedDate: "2023-07-26T06:13:52.512Z", 
    updatedBy: "", 
    status: 0, 
    empId:'0bd1295a-dd75-413a-9eef-811934e2880d', 
    startDate: null, 
    endDate: null, 
    leaveTypeId: '', 
    leaveStatus: 'pendding', 
    approvedBy:'', 
    approvedDate:'', 
    reason: '', 
    file: null, 
    workingDays: null, 
    sickStartDate: "2023-07-26T06:13:52.512Z", 
    sickEndDate: "2023-07-26T06:13:52.512Z",
    supervisor:"" 
        }; 
      } , 
      error(response) { 
        console.log(response) 
      } 
    }); }
   else {
    // Display an error message or handle invalid dates
    console.log('Invalid date range');
  }
    
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
  
availableLeaveBalance(): void { 
    
  const leaveType = this.leaveTypes.find((leave) => leave.leaveTypeId === this.selectedLeaveType); 
  const balance= this.leaveBalanceService.getLeaveBalance(this.selectedEmployee); 
  
  this.leaveName= leaveType.leaveTypeName 
     
    if ( this.leaveName === "Annual") { 
    const selectedBalance = this.leaveBalances.find((balance) => balance.empId === this.selectedEmployee) 
    this.selectedLeaveBalance = selectedBalance.annualRemainingBalance; 
    this.selectedPreviousYear = selectedBalance.previousYearAnnualBalance; 
    this.selectedTwoPerviousYear= selectedBalance.previousTwoYear; 
    console.log( selectedBalance)
 
  } 
    if( this.leaveName === "Sick") 
    { 
     const selectedBalance= this.otherLeaveBalances.find((balance) => balance.empId === this.selectedEmployee) 
    this.selectedLeaveBalance=selectedBalance.sickRemainingBalance; 
    } 
    if( this.leaveName === "Maternal") 
    { 
    const selectedBalance = this.otherLeaveBalances.find((balance) => balance.empId === this.selectedEmployee) 
    this.selectedLeaveBalance=selectedBalance.maternityRemainingBalance; 
    } 
    if( this.leaveName === "Paternal") 
    { 
    const selectedBalance = this.otherLeaveBalances.find((balance) => balance.empId === this.selectedEmployee) 
    this.selectedLeaveBalance=selectedBalance.paternityRemainingBalance; 
    } 
    if( this.leaveName === "Compassinate") 
    { 
    const selectedBalance = this.otherLeaveBalances.find((balance) => balance.empId === this.selectedEmployee) 
    this.selectedLeaveBalance=selectedBalance.compassinateRemainingBalance; 
    } 
    if( this.leaveName === "Education") 
    { 
    const selectedBalance = this.otherLeaveBalances.find((balance) => balance.empId === this.selectedEmployee) 
    this.selectedLeaveBalance=selectedBalance.educationRemainingBalance; 
    } 
    if( this.leaveName === "Court") 
    { 
    const selectedBalance = this.otherLeaveBalances.find((balance) => balance.empId === this.selectedEmployee) 
    this.selectedLeaveBalance=selectedBalance.courtLeaveRemainingBalance; 
    } 
    if( this.leaveName === "LeaveWithOutPay") 
    { 
    const selectedBalance = this.otherLeaveBalances.find((balance) => balance.empId === this.selectedEmployee) 
    this.selectedLeaveBalance=selectedBalance.leaveWotPayRemainingBalance; 
    } 
    if( this.leaveName === "Abortion") 
    { 
    const selectedBalance = this.otherLeaveBalances.find((balance) => balance.empId === this.selectedEmployee) 
    this.selectedLeaveBalance=selectedBalance.abortionLeaveRemainingBalance; 
    } 
    if( this.leaveName === "Marriage") 
    { 
    const selectedBalance = this.otherLeaveBalances.find((balance) => balance.empId === this.selectedEmployee) 
    this.selectedLeaveBalance=selectedBalance.marriageDefaultBalance; 
    } 
     
     
     
  } 
 
  updateleaveRequest(): void {  

    // this.leaveRequest.updatedDate=new Date().toISOString();
    // if(this.leaveRequest.endDate < this.leaveRequest.updatedDate ){ 
   this.leaveRequest.leaveStatus='pendding' 
    this.leaveRequest.leaveTypeId = this.selectedLeaveType; 
    // Get the selected start and end dates from the form controls
const selectedStartDate = new Date(this.leaveRequestForm.get('startDate').value);
const selectedEndDate = new Date(this.leaveRequestForm.get('endDate').value);

// Add one day to both the start and end dates
selectedStartDate.setDate(selectedStartDate.getDate() + 1);
selectedEndDate.setDate(selectedEndDate.getDate() + 1);

// Assign the modified dates to this.leaveRequest
this.leaveRequest.startDate = selectedStartDate;
this.leaveRequest.endDate = selectedEndDate;

     console.log(this.leaveRequest.endDate) 
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
      startDate: null, 
      endDate: null, 
      leaveTypeId: '', 
      leaveStatus: 'pendding', 
      approvedBy:'', 
      approvedDate:'', 
      reason: '', 
      file: '', 
      workingDays: 0, 
      sickStartDate: "2023-07-26T06:13:52.512Z", 
      sickEndDate: "2023-07-26T06:13:52.512Z", 
      supervisor:""
   
    };} 
  
 
 
 
 
  editleaveRequest(leave:
LeaveRequest): void { 
    const leaveRequestToEdit = this.leaveRequests.find(leaveRequest => leaveRequest.leaveRequestId === leave.leaveRequestId); 
    this.leaveRequest = leaveRequestToEdit; 
    this.selectedLeaveType=leaveRequestToEdit.leaveTypeId 
    this.selectedEmployee=leaveRequestToEdit.empId 
    this.leaveRequestForm.patchValue({
      startDate: leaveRequestToEdit.startDate,
      endDate: leaveRequestToEdit.endDate
    });
    this.leaveRequestservice.getLeaveRequestFile(leaveRequestToEdit.leaveRequestId).subscribe( 
      (pdf: Blob) => { 
        const file = new Blob([pdf], { type: 'application/pdf' }); 
        this.leaveRequest.file = window.URL.createObjectURL(file); 
      }, 
      (error) => { 
        console.error('Error loading PDF:', error); 
        // Handle the error, e.g., display an error message to the user. 
      } 
    ); 
     
  
    this.leaveRequestservice.getAllLeaveRequest().subscribe({ 
      next: (leaveRequest) => { 
        this.leaveRequests = leaveRequest; 
       
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
    

  openLeaveDetailsModal(empId: string) {
    const dialogRef =this.dialog.open(EmployeeLeaveDetailComponent,{
       // Set the width to 100% to maximize
      // Apply your custom CSS class
    })
    dialogRef.componentInstance.openModal(empId)
  
  }
  // getLeaveTypeName(Id: string): string {  
  //   const leaveType = this.leaveTypes.find((g) => g.leaveTypeId === Id);  
  //   return leaveType ? ${leaveType.leaveTypeName} :'Unknown EMPLOYEE';  
  // } 
 
}