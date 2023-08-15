import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Supervisor } from 'app/models/employee.model';
import { AssignSupervisor, Division, Position } from 'app/models/job-description.model';
import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { AssignSupervisorService } from 'app/service/AssignSupervisor';
import { DivisionService } from 'app/service/division.service';
import { PositionService } from 'app/service/position.service';
import { SupervisorService } from 'app/service/supervisor.service';

@Component({
  selector: 'app-assign-supervisor',
  templateUrl: './assign-supervisor.component.html',
  styleUrls: ['./assign-supervisor.component.css']
})
export class AssignSupervisorComponent {
  selectedPosition: string='';
  selectedFirstSupervisor: string='';
  selectedSecondSupervisor: string='';
  selectedThirdSupervisor: string='';
  selectedFourthSupervisor: string='';
  selectedFifthSupervisor: string='';
  assignSupervisorsaved:Boolean=false;
  supervisors:Supervisor[]=[];
  divisions:Division[]=[]
  firstSupervisors:Supervisor[]=[];
  secondSupervisors:Supervisor[]=[];
  thirdSupervisors:Supervisor[]=[];
  fourthSupervisors:Supervisor[]=[];
  fifthSupervisors:Supervisor[]=[];
  selectedDivision:string=''
assignSupervisors:AssignSupervisor[]=[]

positions:Position[]=[];

assignSupervisor:AssignSupervisor={
    pId: 0,
    Id:undefined,
    positionId: "",
    createdBy: '',
    createdDate: "2023-07-21T13:28:13.132Z",
    updatedDate: "2023-07-21T13:28:13.132Z",
    updatedBy: '',
    status: 0,
  firstSupervisor:"",
secondSupervisor:"",
thirdSupervisor:"",
fourthSupervisor:"",
fifthSupervisor:"",

  }

buttons = [
    { label: 'Position' , route:"/admin/position" },
         { label: 'Step', route:"/admin/step" },
    { label: 'EducationLevel' , route:"/admin/education-level"},
     { label: 'grade', route:"/admin/grade" },
     { label: 'Branch', route:"/admin/branch" },
     { label: 'Supervisor', route:"/admin/supervisor" },
     { label: 'assign-supervisor', route:"/admin/assign-supervisor" },

  ];
 
constructor(
  private positionservice: PositionService,
  private AssignSupervisorservice: AssignSupervisorService,
  private supervisorService :SupervisorService,private dialog:MatDialog,private router:Router){}
ngOnInit():void {
  this.supervisorService.getAllSupervisors()
.subscribe({
  next: (supervisor) => {
    this.supervisors=supervisor;
    this.firstSupervisors = this.supervisors.filter((supervisor) => supervisor.supervisorLevel == 'First Supervisor'); 
    this.secondSupervisors = this.supervisors.filter((supervisor) => supervisor.supervisorLevel == 'Second Supervisor'); 
    this.thirdSupervisors = this.supervisors.filter((supervisor) => supervisor.supervisorLevel == 'Third Supervisor'); 
    this.fourthSupervisors = this.supervisors.filter((supervisor) => supervisor.supervisorLevel == 'Fourth Supervisor'); 
    this.fifthSupervisors = this.supervisors.filter((supervisor) => supervisor.supervisorLevel == 'Fifth Supervisor'); 
   
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

  this.AssignSupervisorservice.getAllAssignSupervisor()
  .subscribe({
    next: (assignSupervisors) => {
      this.assignSupervisors=assignSupervisors;
    },
    error(response){
      console.log(response)
    }
  });
}


addAssignSupervisor(){


  this.assignSupervisor.positionId = this.selectedPosition;
   this.assignSupervisor.firstSupervisor = this.selectedFirstSupervisor;
  this.assignSupervisor.secondSupervisor = this.selectedSecondSupervisor;
  this.assignSupervisor.thirdSupervisor = this.selectedThirdSupervisor;
  this.assignSupervisor.fourthSupervisor = this.selectedFourthSupervisor;
  this.assignSupervisor.fifthSupervisor = this.selectedFifthSupervisor;

this.AssignSupervisorservice.addAssignSupervisor(this.assignSupervisor)
.subscribe({
next:()=>{
  this.assignSupervisorsaved=true;
  setTimeout(() => {
    this.assignSupervisorsaved = false;
  }, 2000);
        
  this.selectedFirstSupervisor =  "";
  this.selectedPosition  ="" ;
   this.selectedFifthSupervisor= "" ;
   this.selectedFourthSupervisor ="" ;      
   this.selectedSecondSupervisor =  "";
   this.selectedThirdSupervisor  ="" ;


   this.AssignSupervisorservice.getAllAssignSupervisor()
  .subscribe({
    next: (assignSupervisors) => {
      this.assignSupervisors=assignSupervisors;
    },
    error(response){
      console.log(response)
    }
  });
  this.assignSupervisors.push({ ...this.assignSupervisor });

  this.assignSupervisor = {
    pId: 0,
    positionId: undefined,
         Id:"",
    createdBy: '',
    createdDate: "2023-07-21T13:28:13.132Z",
  updatedDate: "2023-07-21T13:28:13.132Z",
    updatedBy: '',
    status:0,
    firstSupervisor:"",
    secondSupervisor:"",
    thirdSupervisor:"",
    fourthSupervisor:"",
    fifthSupervisor:"",

  };
},
 error(response){
  console.log(response)
}
})}
getPositionName(positionId: string): string {
  const position = this.positions.find((g) => g.positionId === positionId);
  return position ? (position.name )  : 'Unknown position';
}
getFirstPositionName(firstSupervisor: string): string {
  const position = this.positions.find((g) => g.positionId === firstSupervisor);
  return position ? (position.name )  : 'Unknown position' ;
}
getSecondPositionName(secondSupervisor: string): string {
  const position = this.positions.find((g) => g.positionId === secondSupervisor);
  return position?this.getPositionName(position.positionId):"" ;
}
getThirdPositionName(thirdSupervisor: string): string {
  const position = this.positions.find((g) => g.positionId === thirdSupervisor);
  return position ? this.getPositionName(position.positionId) : '';
}
getFourthPositionName(fourthSupervisor: string): string {
  const position = this.positions.find((g) => g.positionId === fourthSupervisor);
  return position ? this.getPositionName(position.positionId) : '';
}
getFifthPositionName(fifthSupervisor: string): string {
  const position = this.positions.find((g) => g.positionId === fifthSupervisor);
  return position ? this.getPositionName(position.positionId) : '';
}


deletePosition(id: string) {
  const dialogRef = this.dialog.open(DeleteConfirmationComponent);

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      // User confirmed deletion, proceed with the delete request
      this.AssignSupervisorservice.deleteAssignSupervisor(id).subscribe({
        next: () => {
          // Remove the deleted position from the positions array using filter
          this.assignSupervisors = this.assignSupervisors.filter((assignSupervisor) => assignSupervisor.Id !== id);
        },
        error(response) {
          console.log(response);
        },
      });
    }
  });
}
}


