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
import { EmployeeLeaveDetailComponent } from '../employee-leave-detail-modal/employee-leave-detail.component';
import { EmployeePositionService } from 'app/service/employee-position';
import { AssignSupervisor, Division, EmployeePosition, Position } from 'app/models/job-description.model';
import { PositionService } from 'app/service/position.service';
import { DivisionService } from 'app/service/division.service';
import { AssignSupervisorService } from 'app/service/AssignSupervisor';
import { Department } from 'app/models/education.model';
import { DepartmentService } from 'app/service/department.service';

// function dateRangeValidator(control: AbstractControl): ValidationErrors | null {
//   const startDate = control.get('startDate').value;
//   const endDate = control.get('endDate').value;

//   if (startDate && endDate && startDate > endDate) {
//     return { invalidDateRange: true };
//   }


//   return null;
// }

function dateRangeValidator(selectedLeaveBalance: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startDate = control.get('startDate').value;
    const endDate = control.get('endDate').value;

    if (startDate && endDate) {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
    const timeDifference = endDateObj.getTime() - startDateObj.getTime();
      const durationInDays = timeDifference / (1000 * 3600 * 24);
      if (startDateObj > endDateObj) {
       
        
        return { invalidDateRange: true, message: 'End date must be after start date' };
        
      }

      if (durationInDays >= selectedLeaveBalance) { 
        console.log(selectedLeaveBalance);
        return { invalidLeaveBalance: true, message: 'Date difference exceeds selected leave balance' };
      }
    }

    return null;
  };
}
 
@Component({ 
  selector: 'app-leaverequest', 
  templateUrl: './leaverequest.component.html', 
  styleUrls: ['./leaverequest.component.scss'] 
}) 
export class LeaverequestComponent { 
  showLeaveForm: boolean = false;
  currentSupervisorPosition:string
  currentEmployee:string='17320a72-e4bd-46b9-894a-dfe5bf3d967c';
  leaveRequestForm: FormGroup;
  positionsOfSupervisor:string[]=[]
  departments:Department[]=[]
  selectedEmployeeDepartment:string;
  leaveRequests:LeaveRequest[]=[]; 
  leaveTypes:LeaveType[]=[] 
  employeePostions :EmployeePosition[]=[]
  selectedEmployeepostion:string='';
  selectedPosition:string=''
  selectedDepartment:string='';
  leaveBalances:AnnualLeaveBalance[]=[] 
  selectedLeaveBalance:number=0; 
  selectedPreviousYear:number=0; 
  selectedTwoPerviousYear:number=0; 
  selectedLeaveType: string=''; 
  leaveName: string='' 
  downloadFileUrl: string=''; 
  pdfUrl:string='' 
  selectedEmployee: string='b6c5a662-34e3-4acf-845e-b9524dceaf14'; 
  leaveRequestSaved: boolean = false; 
  leaveRequestUpdated: boolean = false; 
  employees:Employee[]=[]; 
  supervisorPositions:AssignSupervisor[]=[]
  supervisorEmployees:Employee[]=[]; 
  supervisoremployees:EmployeePosition[]=[]
  otherLeaveBalances:OtherLeaveBalance[]=[] 
  selectedOtherLeaveBalance:number=0 
  fileType: string = 'other'; // Initialize as 'other' by default 
  fileData: string = ''; 
    IsPdf:boolean = false;
  IsBig:boolean = false;
  FileNull:boolean = false;
  id:string;
  selectedFullPay:number;
  selectedHalfPay:number;
  selectedWoPay:number;
  positions:Position[]= [];
  divisions:Division[]= [];
  assignedSupervisors:AssignSupervisor[]=[];
  selectedFirstSupervisor:string='';
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
  
  leaveRequest: LeaveRequest = { 
    pId: 0, 
    leaveRequestId:undefined, 
    createdBy: "", 
    createdDate: "2023-07-26T06:13:52.512Z", 
    updatedDate: "2023-07-26T06:13:52.512Z", 
    updatedBy: "", 
    status: 0, 
    empId:'b6c5a662-34e3-4acf-845e-b9524dceaf14', 
    startDate: null, 
    endDate: null, 
    leaveTypeId: '', 
    leaveStatus: 'Pendding', 
    approvedBy:'', 
    approvedDate:'', 
    reason: '', 
    file:"", 
    employeePositionId:'',
    workingDays: null, 
    sickStartDate: "2023-07-26T06:13:52.512Z", 
    sickEndDate: "2023-07-26T06:13:52.512Z", 
    supervisor:" ",
    departmentId:""
  }; 
 
   selectedFile: File | null = null; 
 
 
  constructor( 
   
    private divisionservice: DivisionService,
   private formBuilder: FormBuilder,
    private leaveRequestservice: LeaveRequestService, 
    private router: Router, 
    private employeeService:EmployeeService, 
    private otherLeaveBalanceService:OtherLeaveBalanceService, 
    private employeepostionservice : EmployeePositionService,
    private leavetypeservice: LeaveTypeService, 
    private leaveBalanceService: LeaveBalanceService, 
    private employeeIdService: EmployeeIdService, 
    private positionservice:PositionService ,
    private assignSupervisorService:AssignSupervisorService,
    private departmentService:DepartmentService,

    private dialog: MatDialog, 
    private http: HttpClient, 
  ) {  
      this.leaveRequestForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      
    },  {  validator: dateRangeValidator(this.selectedLeaveBalance)}); // Add the custom validator here
    console.log(this.selectedLeaveBalance);
  } 

  
 
  ngOnInit(): void { 
    this.divisionservice.getAllDivisions()
.subscribe({
  next: (division) => {
    this.divisions=division;
  },
  error(response){
    console.log(response)
  }
});
this.departmentService.getAllDepartment()
.subscribe({
  next: (dep) => {
    this.departments=dep;
  },
  error(response){
    console.log(response)
  }
});
            console.log(this.selectedEmployee )
    this.leaveRequestservice.getAllLeaveRequest().subscribe({ 
      next: (leaveRequestd) => { 
        this.leaveRequests = leaveRequestd.filter(leave=>leave.createdBy==this.currentEmployee); 
         

      }, 
      error: (response) => { 
        console.log(response); 
      } 
    }); 
  
    this.positionservice.getAllPosition()
    .subscribe({
      next: (positions) => {
        this.positions=positions;
        
      },
      error(response){
        console.log(response)
      }
    });
    this.assignSupervisorService.getAllAssignSupervisor()
.subscribe({
  next: (assignedSupervisors) => {



    this.employeepostionservice.getAllEmployeePosition()  
.subscribe({  
  next: (employeePostions) => { 
    // this.leaveRequest.empId = this.selectedEmployee; 
   
    const supervisoremployeePostions=employeePostions.find(emp=>emp.empId === this.currentEmployee)
console.log("s",supervisoremployeePostions)
    this.currentSupervisorPosition=supervisoremployeePostions.position
    console.log("spostion", this.currentSupervisorPosition)

    
    this.assignedSupervisors=assignedSupervisors;
     this.supervisorPositions=assignedSupervisors.filter(sup=>sup.firstSupervisor===this.currentSupervisorPosition)
    console.log("list of pos",assignedSupervisors)
   console.log("sec list of pos",this.currentSupervisorPosition)

   console.log("supervisorpostion",this.supervisorPositions)
  //this.positionsOfSupervisor=this.supervisorPositions.positionId;
    //console.log("sup pos",this.positionsOfSupervisor)
    this.employeePostions=employeePostions 
  this.supervisorPositions.forEach(element => {
      this.supervisoremployees=employeePostions.filter(emp=>emp.position === element.positionId)
   
      console.log(" employees", this.supervisoremployees)

     
});
    

   this.employeeService.getAllEmployees()  
   .subscribe({  
     next: (employees) => { 
       // this.leaveRequest.empId = this.selectedEmployee; 
       this.employees=employees 
       this.supervisoremployees.forEach(element=> {
      const sup=employees.find(emp => emp.empId === element.empId);
       this.supervisorEmployees.push(sup)


       
       }); console.log(" suvemp", this.supervisorEmployees)
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


  },
  error(response){
    console.log(response)
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
  // onFileSelected(event: any) { 
   
  //   const file: File = event.target.files[0]; 
  //   const reader = new FileReader(); 
  //   reader.onload = () => { 
  //       const base64String = reader.result.toString().split(',')[1]; // Extract the base64 part 
  //       this.leaveRequest.file = base64String; 
  //   }; 
  //   reader.readAsDataURL(file); 
  // } 
 
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
  
    if (file.type !== 'application/pdf') {
      this.IsPdf=true;
    console.error('Selected file is not a PDF.');
   return;
    }
  
    if (file.size > 200 * 1024 * 1024) {
      this.IsBig=true;
 console.error('File size exceeds 200MB.');
return;
    }
    this.IsPdf=false;
    this.IsBig=false;
    const reader = new FileReader();
  
    reader.onload = () => {
      const base64String = reader.result.toString().split(',')[1];
      this.leaveRequest.file =base64String;
   
    };
    reader.readAsDataURL(file);
  }
  
  addleaveRequest() { 

    this.leaveRequest.leaveTypeId = this.selectedLeaveType; 
    this.leaveRequest.empId = this.selectedEmployee;
    this.leaveRequest.createdBy=this.currentEmployee;
    
    this.leaveRequest.employeePositionId = this.selectedEmployeepostion; 
    this.leaveRequest.departmentId=this.selectedDepartment
console.log(this.leaveRequest.employeePositionId)
    this.leaveRequest.supervisor = "bc314c90-d887-4733-9583-08203986b1c9"; 
    const selectedStartDate = new Date(this.leaveRequestForm.get('startDate').value);
    const selectedEndDate = new Date(this.leaveRequestForm.get('endDate').value);
    
    // Add one day to both the start and end dates
    selectedStartDate.setDate(selectedStartDate.getDate() + 1);
    selectedEndDate.setDate(selectedEndDate.getDate() + 1);
    
    // Assign the modified dates to this.leaveRequest
    this.leaveRequest.startDate = selectedStartDate;
    this.leaveRequest.endDate = selectedEndDate;
    this.leaveRequest.supervisor=this.selectedFirstSupervisor;
    const startDate = this.leaveRequestForm.get('startDate').value;
  const endDate = this.leaveRequestForm.get('endDate').value;


  // Get the current date
  const currentDate = new Date();

  // Check if start date is greater than current date and end date is greater than start date
  if (startDate <= endDate) {
     
  
    this.leaveRequestservice.addLeaveRequest(this.leaveRequest).subscribe({ 
      next: (employee) => { 
        console.log( this.leaveRequest
          )
         
      //  this.router.navigate(['/employee-registration/work-experience']);  
 
      this.leaveRequestSaved=true 
        setTimeout(() => { 
          this.leaveRequestSaved = false; 
        }, 2000); 
        this.leaveRequestservice.getLeaveRequestByEmp(this.selectedEmployee).subscribe({ 
          next: (leaveRequestd) => { 
            this.leaveRequests = leaveRequestd.filter(leave=>leave.createdBy==this.currentEmployee); 
           
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
    empId:'b6c5a662-34e3-4acf-845e-b9524dceaf14', 
    startDate: null, 
    endDate: null, 
    leaveTypeId: '', 
    leaveStatus: 'Pendding', 
    approvedBy:'', 
    approvedDate:'', 
    reason: '', 
    file: "", 
    employeePositionId:'',
    workingDays: null, 
    sickStartDate: "2023-07-26T06:13:52.512Z", 
    sickEndDate: "2023-07-26T06:13:52.512Z",
    supervisor:"" ,
    departmentId:""
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

  fetchAndDisplayPDF(leave: LeaveRequest): void {
    const leaveRequestToEdit = this.leaveRequests.find(
      (leaveRequest) => leaveRequest.leaveRequestId === leave.leaveRequestId
    );

  
    this.leaveRequestservice.getLeaveRequestFile(leaveRequestToEdit.leaveRequestId).subscribe(
      (pdf: Blob) => {
   
        var file = new Blob([pdf], { type: 'application/pdf' });

        this.downloadFileUrl = window.URL.createObjectURL(file);
        window.open(this.downloadFileUrl, '_blank');    
      },
      (error) => {
        this.FileNull=true
        console.error('Error loading PDF:', error);
       this.id= leaveRequestToEdit.leaveRequestId
      }
    );
  }
  onemployeeselected() :void{
    console.log( "emp",this.employeePostions)
    const postion= this.employeePostions.find((balance) => balance.empId === this.selectedEmployee) 
    this.selectedPosition = this.getPositionName( postion.position)
    this.selectedEmployeepostion=postion.position
   
    const selectedDivision=postion.divisionId 
    const division=this.divisions.find(division => division.divisionId === selectedDivision);
    console.log(selectedDivision)
    const selectedDepartment = this.departments.find(department => department.departmentId === division.departmentId)

      this.selectedDepartment = selectedDepartment.departmentId;
      this.selectedEmployeeDepartment=this.getDepartmentName(this.selectedDepartment )
   console.log("deppartment",  this.selectedEmployeeDepartment);
 
    const selectedPosition = this.selectedEmployeepostion;
   
   
    if (selectedPosition ) {
      
      //const selectedDivision = this.divisions.find(division => division.divisionId === selectedPosition.divisionId);

console.log(this.assignedSupervisors)
const selectedassignedSupervisor= this.assignedSupervisors.find(assignedSupervisor => assignedSupervisor.positionId === selectedPosition);
console.log("Selected Position:", selectedPosition);
console.log("Selected Assigned Supervisor:", selectedassignedSupervisor);

if(selectedassignedSupervisor){
  this.selectedFirstSupervisor=selectedassignedSupervisor.firstSupervisor;

}
}
}
getSupervisorName(positionId: string): string {
  const position = this.positions.find((position) => position.positionId === positionId);
  return position ? position.name : '';
}
  getPositionName(positionId: string): string {
    

        const position = this.positions.find((position) => position.positionId === positionId);  
        console.log('position  ',position.name)
   
        return position ? position.name  : '';
      }
      getDepartmentName(departmentId: string): string {
        const department = this.departments.find((division) => division.departmentId === departmentId);
        return department ? department.description : '';
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
    this.selectedFullPay=selectedBalance.sickRemainingBalance-150;
    this.selectedHalfPay=this.selectedLeaveBalance-this.selectedFullPay-90;
    this.selectedWoPay=  this.selectedLeaveBalance-this.selectedFullPay-this.selectedHalfPay;


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
     
    this.leaveRequestForm.setValidators(dateRangeValidator(this.selectedLeaveBalance));
    this.leaveRequestForm.updateValueAndValidity(); // Update form validation
  
     
  } 
 
  updateleaveRequest(): void {  

    // this.leaveRequest.updatedDate=new Date().toISOString();
    // if(this.leaveRequest.endDate < this.leaveRequest.updatedDate ){ 
      this.leaveRequest.supervisor=this.selectedFirstSupervisor;
      this.leaveRequest.createdBy=this.currentEmployee;
   this.leaveRequest.leaveStatus='Pendding' 
    this.leaveRequest.leaveTypeId = this.selectedLeaveType; 
    this.leaveRequest.employeePositionId = this.selectedEmployeepostion; 
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
         
        this.leaveRequestservice.getLeaveRequestByEmp(this.selectedEmployee).subscribe({ 
      next: (leaveRequestd) => { 
        this.leaveRequests = leaveRequestd.filter(leave=>leave.createdBy==this.currentEmployee); 
         
       
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
      empId:'b6c5a662-34e3-4acf-845e-b9524dceaf14', 
      startDate: null, 
      endDate: null, 
      leaveTypeId: '', 
      leaveStatus: 'Pendding', 
      approvedBy:'', 
      approvedDate:'', 
      reason: '', 
      file: '', 
      workingDays: 0, 
      sickStartDate: "2023-07-26T06:13:52.512Z", 
      sickEndDate: "2023-07-26T06:13:52.512Z", 
      supervisor:"",
      employeePositionId:'',
      departmentId:""
   
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
     
  
    this.leaveRequestservice.getLeaveRequestByEmp(this.selectedEmployee).subscribe({ 
      next: (leaveRequestd) => { 
        this.leaveRequests = leaveRequestd; 
         
       
      }, 
      error: (response) => { 
        console.log(response); 
      } 
    }); 
  } 
  toggleLeaveForm() {
    this.showLeaveForm = !this.showLeaveForm;
  }
 
  deleteleaveRequest(leaveRequest: LeaveRequest): void { 
    const dialogRef = this.dialog.open(DeleteConfirmationComponent); 
 
    dialogRef.afterClosed().subscribe((result) => { 
      if (result === true) { 
        this.leaveRequestservice.getLeaveRequestByEmp(this.selectedEmployee).subscribe({ 
          next: (leaveRequestd) => { 
            this.leaveRequests = leaveRequestd; 
             
           
          }, 
          error: (response) => { 
            console.log(response); 
          } 
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