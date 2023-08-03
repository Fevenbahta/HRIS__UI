import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Division, Position } from 'app/models/job-description.model';
import { DivisionService } from 'app/service/division.service';


import { PositionService } from 'app/service/position.service';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit {
  divisions:Division[]= [];
  selectedDivision: string='';

positions:Position[]=[];

  addPositionRequest:Position={
    pId: 0,
    positionId: undefined,
    divisionId:"",
    name: '',
    description:'',
    createdBy: '',
    createdDate: "2023-07-21T13:28:13.132Z",
  updatedDate: "2023-07-21T13:28:13.132Z",
    updatedBy: '',
    status:0,
   
}

buttons = [
    { label: 'Position' , route:"/admin/position" },
         { label: 'Step', route:"/admin/step" },
    { label: 'EducationLevel' , route:"/admin/education-level"},
     { label: 'grade', route:"/admin/grade" },
     { label: 'position', route:"/admin/position" },
     { label: 'Supervisor', route:"/admin/supervisor" },

  ];
 
constructor(private divisionservice: DivisionService,private positionservice: PositionService,private router:Router){}
ngOnInit():void {
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
}


addposition(){
  console.log(this.addPositionRequest)
  this.addPositionRequest.divisionId = this.selectedDivision;
this.positionservice.addPosition(this.addPositionRequest)
.subscribe({
next:(position)=>{
this.router.navigate(["employee-registration/position"])
},
 error(response){
  console.log(response)
}
})}
getDivisionName(divisionId: string): string {
  const division = this.divisions.find((g) => g.divisionId === divisionId);
  return division ? (division.description )  : 'Unknown division';
}
deletePosition(id:string){
  this.positionservice.deletePosition(id)
  .subscribe({
    next: (response) => {
      // Reload the grade list after successful deletion
      this.positionservice.getAllPosition().subscribe((positions) => {
        this.positions = positions;
      });
    },
    error(response) {
      console.log(response);
    }
})}
}

