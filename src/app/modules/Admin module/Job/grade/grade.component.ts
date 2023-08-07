
import { Router } from '@angular/router';
import { Grade, Position } from 'app/models/job-description.model';
import { GradeService } from 'app/service/grade.service';
import { PositionService } from 'app/service/position.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss']
})
export class GradeComponent implements OnInit {
  positions:Position[]= [];
  selectedPosition: string='';
  grades:Grade[]=[];

  addGradeRequest: Grade={
  levelId:undefined,
  positionId: '',
  description: '',
createdBy: '',
createdDate: '2023-07-21T13:28:13.132Z',
updatedDate: '2023-07-21T13:28:13.132Z',
updatedBy: '',
status:0,
}
  buttons = [
    { label: 'Position' , route:"/admin/position" },
         { label: 'Step', route:"/admin/step" },
    { label: 'EducationLevel' , route:"/admin/education-level"},
     { label: 'grade', route:"/admin/grade" },
     { label: 'Branch', route:"/admin/branch" },
     { label: 'Supervisor', route:"/admin/supervisor" },

  ];

  constructor(private positionservice: PositionService , private gradeservice :GradeService ,private dialog:MatDialog,private router:Router) { }

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
    this.gradeservice.getAllGrade()
    .subscribe({
      next: (grades) => {
        this.grades=grades;
      },
      error(response){
        console.log(response)
      }
    });
  }
  addGrade(){
    this.addGradeRequest.positionId = this.selectedPosition;
    this.gradeservice.addGrade(this.addGradeRequest)
    .subscribe({
    next:(grade)=>{
      this.grades.push({ ...this.addGradeRequest });

      this.addGradeRequest = {
        levelId:undefined,
        positionId: '',
        description: '',
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

    getPositionName(positionId: string): string {
      const position = this.positions.find((g) => g.positionId === positionId);
      return position ? position.name : 'Unknown Grade';
    }
    deleteGrade(id: string) {
      const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          // User confirmed deletion, proceed with the delete request
          this.gradeservice.deleteGrade(id).subscribe({
            next: () => {
              // Remove the deleted grade from the grades array using filter
              this.grades = this.grades.filter((grade) => grade.levelId!== id);
            },
            error(response) {
              console.log(response);
            },
          });
        }
      });
    }
}
