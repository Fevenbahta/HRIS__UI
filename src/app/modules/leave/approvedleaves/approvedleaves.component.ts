import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Department } from 'app/models/education.model';
import { Employee } from 'app/models/employee.model';
import { Division, EmployeePosition, Position } from 'app/models/job-description.model';
import { LeaveType } from 'app/models/leaveType.model';
import { LeaveRequest } from 'app/models/leaverequestmodel';
import { DepartmentService } from 'app/service/department.service';
import { DivisionService } from 'app/service/division.service';
import { EmployeeIdService } from 'app/service/employee-id.service';
import { EmployeePositionService } from 'app/service/employee-position';
import { EmployeeService } from 'app/service/employee.service';
import { LeaveRequestService } from 'app/service/leaveRequest.service';
import { LeaveTypeService } from 'app/service/leaveType.service';
import { PositionService } from 'app/service/position.service';
import { Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-approvedleaves',
  templateUrl: './approvedleaves.component.html',
  styleUrls: ['./approvedleaves.component.css']
})
export class ApprovedleavesComponent {
  leaveTypes:LeaveType[]=[]
  selectedLeaveType: string='';
  selectedEmployee: string='';
  employees:Employee[]=[];
leaveApproved: boolean = false;
leaveRequests:LeaveRequest[]=[]; 
downloadFileUrl: string=''; 
divisions:Division[]= [];
  departments:Department[]=[];
   positions:Position[]= [];
   employeePosition:EmployeePosition;
   
 leaveStatus:string="Approved";
 supervisor:string="bc314c90-d887-4733-9583-08203986b1c9";
  buttons = [ 
    { label: ' Leave Request Form ', route: '/leave/leave-request-form' }, 
    { label: ' Leave Balance ', route: '/leave/leave-balance' }, 
    { label: ' Leave Approval ', route: '/leave/leave-approve' }, 
    { label: ' Employee Leave Balance ', route: '/leave/employeeleavebalance' }, 
    { label: 'Admin Leave Approval ', route: '/leave/leave-requests' }, 
    { label: 'Approved Leaves ', route: '/leave/approvedleaves' }, 
   



  ]; 
  approvedLeaves:LeaveRequest[]=[]
  leavependding:LeaveRequest;
  constructor(
 
    private leaveRequestservice: LeaveRequestService,
    private router: Router,
    private employeeService:EmployeeService,
    private leavetypeservice: LeaveTypeService,
    private employeeIdService: EmployeeIdService,
    private dialog: MatDialog,
    private divisionservice: DivisionService,
    private departmentservice: DepartmentService,
     private positionservice:PositionService ,
     private employeepositionservice:EmployeePositionService,

  ) { }

  ngOnInit(): void {

    this.positionservice.getAllPosition()
    .subscribe({
      next: (positions) => {
        this.positions=positions;
        
      },
      error(response){
        console.log(response)
      }
    });
    this.divisionservice.getAllDivisions()
    .subscribe({
      next: (division) => {
        this.divisions=division;
      },
      error(response){
        console.log(response)
      }
    });
    this.departmentservice.getAllDepartment()
    .subscribe({
      next: (department) => {
        this.departments=department;
      },
      error(response){
        console.log(response)
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


    this.leaveRequestservice.getLeaveRequestByStatus(this.leaveStatus,this.supervisor).subscribe({
      next: (leaveRequest) => {
        this.approvedLeaves = leaveRequest
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
this.leaveRequestservice.getAllLeaveRequest().
subscribe({
  next: (leave) => {
  //this.leaveRequest.leaveTypeId = this.selectedLeaveType;
    this.leaveRequests= leave
    ;
  },
  error: (response) => {
    console.log(response);
  }
});  
  }
//   getPosition(empId:string){

//     this.employeepositionservice.getEmployeePosition(empId) 
//   .subscribe({ 
//     next: (employeepositions) => { 
//       var position = employeepositions.position; 
//      console.log(this.getPositionName(position))
//       return  this.getPositionName(position);
//           }, 

// });

//   }
  // getPosition(empId: string): string{
    

  //   this.employeepositionservice.getAllEmployeePosition()
  //   .subscribe({
  //     next: (employeePositions) => {
  //       this.employeePosition = employeePositions.find(employeePositions => employeePositions.empId === empId);
            
             
  //     },
     
  //   });
  //   return this.employeePosition? this.getPositionName(this.employeePosition.position):'';
  // }
  getPosition(empId: string): Observable<string> {
    return this.employeepositionservice.getAllEmployeePosition().pipe(
      switchMap(employeePositions => {
        const position = employeePositions.find(employeePosition => employeePosition.empId === empId);
        return of(position ? this.getPositionName(position.position) : '');
      })
    );
  }
  
  getDivisionName(divisionId: string): string {
    const division = this.divisions.find((division) => division.divisionId === divisionId);
    return division ? division.description : '';
  }
  getDepartmentName(departmentId: string): string {
    const department = this.departments.find((de) => de.departmentId === departmentId);
    return department ? department.description : '';
  }
  getPositionName(positionId: string): string {

    const position = this.positions.find((position) => position.positionId === positionId);  
    
    return position ? position.name : '';
  }

  getLeaveTypeName(leavetypeId: string): string {
    const leaveType = this.leaveTypes.find((leave) => leave.leaveTypeId === leavetypeId);
    return leaveType ? leaveType.leaveTypeName : '';
  }
  getEmployeeName(empId: string): string { 
    const employee = this.employees.find((g) => g.empId === empId); 
    return employee ? `${employee.firstName}  ${employee.middleName} ${employee.lastName}`:'Unknown EMPLOYEE'; 
  } 
  fetchAndDisplayPDF(leave: LeaveRequest):void { 
    // Call your service method to fetch the PDF file  
    console.log(leave.leaveRequestId)
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
  
  approveleavePendding(leaveRequest: LeaveRequest){
    
    var leaveRequestId=leaveRequest.leaveRequestId
    leaveRequest.leaveStatus="First-Approved"
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
          this.approvedLeaves = leaveRequest
          ;
        },
        error: (response) => {
          console.log(response);
        }
      });
    });
}
  }

