import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { Employee } from 'app/models/employee.model';
import { Branch, Division, EducationLevel, EmployeePosition, Position, Step } from 'app/models/job-description.model';
import { DivisionService } from 'app/service/division.service';
import { EducationLevelService } from 'app/service/educationlevel.service';
import { EmployeeIdService } from 'app/service/employee-id.service';

import { EmployeePositionService } from 'app/service/employee-position';
import { PositionService } from 'app/service/position.service';
import { StepService } from 'app/service/step.service';

@Component({
  selector: 'app-jobdescription',
  templateUrl: './jobdescription.component.html',
  styleUrls: ['./jobdescription.component.scss']
})
export class JobdescriptionComponent implements OnInit {
  jobdescriptionSaved: boolean = false;
employeepositions:EmployeePosition[]=[]
employeePosition:EmployeePosition
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
  addEmployeePositionRequest:EmployeePosition={
    pid:0,
    empId:"",
    id:  "",
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
  private employeepositionservice:EmployeePositionService,
  private positionservice:PositionService ,
  private employeeIdService:EmployeeIdService,

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


this.employeepositionservice.getAllEmployeePosition() 
  .subscribe({ 
    next: (employeepositions) => { 
      this.employeepositions = employeepositions; 
          }, 
    error(response) { 
      console.log(response); 
    }, 
});
}

addEmployeePosition(){
  this.addEmployeePositionRequest.empId = this.employeeIdService.employeeId;
  this.addEmployeePositionRequest.divisionId = this.selectedDivision;
  this.addEmployeePositionRequest.position = this.selectedPosition;
  this.addEmployeePositionRequest.stepId = this.selectedStep;
  this.addEmployeePositionRequest.branchId = this.selectedBranch;
  this.employeepositionservice.addEmployeePosition(this.addEmployeePositionRequest)
  .subscribe({
  next:()=>{
    this.jobdescriptionSaved = true;
    setTimeout(() => {
      this.jobdescriptionSaved = false;
    }, 2000);
    // Add the
     this.employeepositions.push({ ...this.addEmployeePositionRequest });

    this.addEmployeePositionRequest={
      pid:0,
      empId:'',
      id:  "",
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
    // Here, we will navigate to the edit page for the selected EmployeePosition.
    this.router.navigate(["/edit-employeePosition", employeePosition.id]);
  }
  deleteEmployeePosition(EmployeePosition: EmployeePosition): void {
    // Here, we can show a confirmation dialog/modal to confirm the deletion.
    const confirmDelete = confirm('Are you sure you want to delete this EmployeePosition?');
  
    if (confirmDelete) {
      // If the user confirms the deletion, we can call the service to delete the EmployeePosition.
      this.employeepositionservice.deleteEmployeePosition(EmployeePosition.id).subscribe(
        () => {
          // EmployeePosition deleted successfully, we can update the list of EmployeePositions after deletion.
          // Here, we are simply filtering out the deleted EmployeePosition from the EmployeePositions array.
          this.employeepositions = this.employeepositions.filter((t) => t.id !== EmployeePosition.id);
  
          // You can also show a success message to the user.
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
  
}