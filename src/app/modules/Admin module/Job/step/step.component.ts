
import { Router } from '@angular/router';
import { Grade, Step} from 'app/models/job-description.model';
import { GradeService } from 'app/service/grade.service';
import { StepService } from 'app/service/step.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { Component, OnInit } from '@angular/core';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';


@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {
  stepSaved:boolean=false
  grades:Grade[]= [];
  selectedGrade: string='';
steps:Step[]=[];


  addStepRequest:Step={
    pId: 0,
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa8',
    salary:0,
   salaryTypeId: '3fa85f64-5717-4562-b3fc-2c963f66afa8',
   levelId: '',
    description:'',
    createdBy: '',
    createdDate: "2023-07-21T13:28:13.132Z",
  updatedDate: "2023-07-21T13:28:13.132Z",
    updatedBy: '',
    status:0,
   
}

buttons = [
  { label: 'Structure',
  dropdownOptions: [
     { label: 'Position',route:"/admin/position"  },
     { label: 'Department',  route:"/admin/department"  },
     { label: 'Division',  route:"/admin/division"  },
     { label: 'Branch',  route:"/admin/branch"  }
 
   ]},
   { label: 'Level',
   dropdownOptions: [
       { label: 'Step', route:"/admin/step" },
          { label: 'Grade', route:"/admin/grade" },
    ]},
    { label: 'Supervisor',
    dropdownOptions: [
     { label: 'Supervisor', route:"/admin/supervisor" },
      { label: 'Assign-Supervisor', route:"/admin/assign-supervisor" },
     ]},
 
     { label: 'Education-Level' , route:"/admin/education-level"},
      { label: 'Leave-Type', route:"/leave/leave-type" },

 
   ];
  constructor( private gradeservice: GradeService,private dialog:MatDialog, private stepservice: StepService,private router:Router) { }

  ngOnInit(): void {
    this.gradeservice.getAllGrade()
    .subscribe({
      next: (grades) => {
        this.grades=grades;
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
   
  }
  addstep(){
    this.addStepRequest.levelId = this.selectedGrade;
    this.stepservice.addStep(this.addStepRequest)
    .subscribe({
    next:(step)=>{
      this.stepSaved = true;
      setTimeout(() => {
        this.stepSaved = false;
      }, 2000);
      this.steps.push({ ...this.addStepRequest });

      this.addStepRequest={
        pId: 0,
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa8',
        salary:0,
       salaryTypeId: '3fa85f64-5717-4562-b3fc-2c963f66afa8',
       levelId: '',
        description:'',
        createdBy: '',
        createdDate: "2023-07-21T13:28:13.132Z",
      updatedDate: "2023-07-21T13:28:13.132Z",
        updatedBy: '',
        status:0,
       
    
      }
    },
     error(response){
      console.log(response)
    }
    })}
    getGradeName(levelId: string): string {
      const grade = this.grades.find((g) => g.levelId === levelId);
      return grade ? grade.description : 'Unknown Grade';
    }

    deleteStep(id: string) {
      const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          // User confirmed deletion, proceed with the delete request
          this.stepservice.deleteStep(id).subscribe({
            next: () => {
              // Remove the deleted step from the steps array using filter
              this.dialog.open(DeletesucessfullmessageComponent)
              this.steps = this.steps.filter((step) => step.id !== id);
            },
            error(response) {
              console.log(response);
            },
          });
        }
      });
    }
}
