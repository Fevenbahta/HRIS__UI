
import { Router } from '@angular/router';
import { EducationLevel } from 'app/models/job-description.model';
import { EducationLevelService } from 'app/service/educationlevel.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { Component, OnInit } from '@angular/core';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';

@Component({
  selector: 'app-education-level',
  templateUrl: './education-level.component.html',
  styleUrls: ['./education-level.component.css']
})
export class EducationLevelComponent implements OnInit {
  educationLevels:EducationLevel[]=[];
  educationLevelSaved:boolean=false
  addEducationLevelRequest: EducationLevel={
    educationName:'',
     pid:0,
  id: undefined,
createdBy: '',
createdDate: '2023-07-21T13:28:13.132Z',
updatedDate: '2023-07-21T13:28:13.132Z',
updatedBy: '',
status:0,

  }
  buttons = [
    { label: 'Structure',
    dropdownOptions: [
       { label: 'position',route:"/admin/position"  },
       { label: 'Department',  route:"/admin/department"  },
       { label: 'Division',  route:"/admin/division"  },
       { label: 'branch',  route:"/admin/branch"  }
   
     ]},
        { label: 'Step', route:"/admin/step" },
       { label: 'EducationLevel' , route:"/admin/education-level"},
        { label: 'grade', route:"/admin/grade" },
        { label: 'Supervisor', route:"/admin/supervisor" },
        { label: 'assign-supervisor', route:"/admin/assign-supervisor" },
        { label: 'leave-type', route:"/leave/leave-type" },

   
   
     ];
  constructor(private educationLevelService :EducationLevelService,private router:Router,private dialog:MatDialog,) { }

  ngOnInit(): void {
    this.educationLevelService.getAllEducationLevels()
    .subscribe({
      next: (educationlevels) => {
        this.educationLevels=educationlevels;
      },
      error(response){
        console.log(response)
      }
    });
  }
  addEducationLevel(){

    this.educationLevelService.addEducationLevel(this.addEducationLevelRequest)
    .subscribe({
    next:(educationLevel)=>{
      this.educationLevelSaved = true;
      setTimeout(() => {
        this.educationLevelSaved = false;
      }, 2000);
      this.educationLevels.push({ ...this.addEducationLevelRequest });

      this.addEducationLevelRequest = {
        educationName:'',
        pid:0,
     id: undefined,
   createdBy: '',
   createdDate: '2023-07-21T13:28:13.132Z',
   updatedDate: '2023-07-21T13:28:13.132Z',
   updatedBy: '',
   status:0,
       
    
      };
    },
     error(response){
      console.log(response)
    }
    })}
    deleteEducationLevel(id: string) {
      const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          // User confirmed deletion, proceed with the delete request
          this.educationLevelService.deleteEducationLevel(id).subscribe({
            next: () => {
              // Remove the deleted education level from the educationLevels array using filter
              this.dialog.open(DeletesucessfullmessageComponent)
              this.educationLevels = this.educationLevels.filter((educationLevel) => educationLevel.id !== id);
            },
            error(response) {
              console.log(response);
            },
          });
        }
      });}
}
