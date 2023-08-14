
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


import { Employee } from 'app/models/employee.model';
import { Branch, Division, EducationLevel, EmployeePosition, Position, Step } from 'app/models/job-description.model';
import { DivisionService } from 'app/service/division.service';
import { EducationLevelService } from 'app/service/educationlevel.service';
import { EmployeeIdService } from 'app/service/employee-id.service';

import { EmployeePositionService } from 'app/service/employee-position';
import { PositionService } from 'app/service/position.service';
import { StepService } from 'app/service/step.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { BranchService } from 'app/service/branch.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jobdescription',
  templateUrl: './jobdescription.component.html',
  styleUrls: ['./jobdescription.component.scss']
})
export class JobdescriptionComponent implements OnInit {
  employeePositionSaved: boolean = false;
  employeePositionUpdated: boolean = false;
employeepositions:EmployeePosition[]=[]

  divisions:Division[]= [];
  selectedDivision: string='';


   positions:Position[]= [];
  selectedPosition: string='';
  branches:Branch[]= [];
  selectedBranch: string='';
 
  steps:Step[]= [];
  selectedStep: string='';
  
  buttons = [
    { label: ' Add Employee ' , route:"/employee-registration" },
         { label: '  List Employee ', route:"/employee-list" },
  
  ];
  employeePosition:EmployeePosition={
    pid:0,
    empId:"",
    id:undefined,
  divisionId:'',
  stepId: '',
  branchId: 'string',
  position: '',
  status:0,
  startDate: '',
  endDate: '2023-07-21T08:09:41.138Z',
createdBy: '',
createdDate: '2023-07-21T08:09:41.138Z',
updatedDate: '2023-07-21T08:09:41.138Z',
updatedBy: '',

  }
  



constructor(
  private divisionservice: DivisionService,
  private stepservice: StepService,
  private branchservice: BranchService,
  private employeepositionservice:EmployeePositionService,
  private positionservice:PositionService ,
  private employeeIdService:EmployeeIdService,
  private dialog: MatDialog,

  private router:Router){}
ngOnInit(): void{
this.divisionservice.getAllDivisions()
.subscribe({
  next: (divisions) => {
    this.divisions=divisions;
  },
  error(response){
    console.log(response)
  }
});
this.employeepositionservice.getAllEmployeePosition()
.subscribe({
  next: (employeePositions) => {
    this.employeepositions = employeePositions.filter(employeePositions => employeePositions.empId === this.employeeIdService.employeeId);
         
  },
  error(response){
    console.log(response)
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
this.stepservice.getAllStep()
.subscribe({
  next: (steps) => {
    this.steps=steps;
  },
  error(response){
    console.log(response)
  }
});
this.branchservice.getAllBranch()
.subscribe({
  next: (branchs) => {
    this.branches=branchs;
  },
  error(response){
    console.log(response)
  }
});


this.employeepositionservice.getEmployeePosition(this.employeeIdService.employeeId) 
  .subscribe({ 
    next: (employeepositions) => { 
      this.employeePosition = employeepositions; 
          }, 
    error(response) { 
      console.log(response); 
    }, 
});
}
updateEmployeePosition(): void {
 
  
  this.employeePosition.divisionId = this.selectedDivision;
  this.employeePosition.position = this.selectedPosition;
  this.employeePosition.stepId = this.selectedStep;
  this.employeePosition.branchId = this.selectedBranch;
  this.employeepositionservice.updateEmployeePosition
  (this.employeePosition, this.employeePosition.id)
  .subscribe({
  
    next: (employeePosition) => { 
        this.employeePositionUpdated=true;
      setTimeout(() => {
        this.employeePositionUpdated = false;
      }, 2000);
      this.employeepositionservice.getAllEmployeePosition().subscribe((employeePositions) => {
        this.employeepositions = employeePositions.filter(employeePositions => employeePositions.empId === this.employeeIdService.employeeId);})
      this.selectedDivision =  "";
      this.selectedPosition  ="" ;
       this.selectedStep= "" ;
       this.selectedBranch ="" ;
      this.employeePosition = {
          pid:0,
          empId:"",
          id:undefined,
        divisionId:'',
        stepId: '',
        branchId: 'string',
        position: '',
        status:0,
        startDate: '',
        endDate: '2023-07-21T08:09:41.138Z',
      createdBy: '',
      createdDate: '2023-07-21T08:09:41.138Z',
      updatedDate: '2023-07-21T08:09:41.138Z',
      updatedBy: '',
      };
    },
    error: (response) => {
      console.log(response);
    }
  });

}
addEmployeePosition(){
  this.employeePosition.empId = this.employeeIdService.employeeId;
  this.employeePosition.divisionId = this.selectedDivision;
  this.employeePosition.position = this.selectedPosition;
  this.employeePosition.stepId = this.selectedStep;
  this.employeePosition.branchId = this.selectedBranch;
  this.employeepositionservice.addEmployeePosition(this.employeePosition)
  .subscribe({
  next:()=>{
    this.employeePositionSaved = true;
  
    setTimeout(() => {
      this.employeePositionSaved = false;
    }, 2000);
    this.employeepositionservice.getEmployeePosition(this.employeeIdService.employeeId) 
  .subscribe({ 
    next: (employeepositions) => { 
      this.employeePosition = employeepositions; 
          }, 
    error(response) { 
      console.log(response); 
    }, 
});
    // Add the
     this.employeepositions.push({ ...this.employeePosition });
     this.selectedDivision =  "";
     this.selectedPosition  ="" ;
      this.selectedStep= "" ;
      this.selectedBranch ="" ;
    this.employeePosition={
      pid:0,
      empId:'',
      id: undefined,
    divisionId:'',
    stepId: '',
    branchId: '',
    position: '',
    status:0,
    startDate: '',
    endDate: '2023-07-21T08:09:41.138Z',
  createdBy: '',
  createdDate: '2023-07-21T08:09:41.138Z',
  updatedDate: '2023-07-21T08:09:41.138Z',
  updatedBy: '',
  
    }
  },
   error(response){
    console.log(response)
  }

  })}
  getDivisionName(divisionId: string): string {
    const division = this.divisions.find((division) => division.divisionId === divisionId);
    return division ? division.description : '';
  }

  getStepName(stepId: string): string {
    const step = this.steps.find((step) => step.id === stepId);
    return step ? step.description : '';
  }

  getBranchName(branchId: string): string {
    const branch = this.branches.find((branch) => branch.id === branchId);
    return branch ? branch.name : '';
  }
  getPositionName(positionId: string): string {
    const position = this.positions.find((position) => position.positionId === positionId);
    return position ? position.name : '';
  }
  editEmployeePosition(employeePosition: EmployeePosition): void {
 
    const contactToEdit = this.employeepositions.find(employeePosition => employeePosition.id === employeePosition.id);
    this.employeePosition = contactToEdit;

     this.selectedDivision =  this.employeePosition.divisionId;
  this.selectedPosition  =this.employeePosition.position ;
   this.selectedStep= this.employeePosition.stepId ;
   this.selectedBranch =this.employeePosition.branchId ;
  }

  deleteEmployeePosition(EmployeePosition: EmployeePosition): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      // If the user confirms the deletion, we can call the service to delete the EmployeePosition.
      this.employeepositionservice.deleteEmployeePosition(EmployeePosition.id).subscribe(
        () => {
          // EmployeePosition deleted successfully, we can update the list of EmployeePositions after deletion.
          // Here, we are simply filtering out the deleted EmployeePosition from the EmployeePositions array.
          this.employeepositions = this.employeepositions.filter((t) => t.id !== EmployeePosition.id);
  
          this.router.navigate(['employee-registration/job-description']);
          alert('EmployeePosition deleted successfully!');
        },
        (error) => {
          console.error(error);
          // If there was an error during deletion, you can show an error message.
          alert('Failed to delete the EmployeePosition. Please try again later.');
        }
      );
    }
  }
  
)}}
