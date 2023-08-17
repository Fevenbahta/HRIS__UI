
import { Router } from '@angular/router';

import { Division, Position } from 'app/models/job-description.model';
import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { DivisionService } from 'app/service/division.service';
import { MatDialog } from '@angular/material/dialog';

import { PositionService } from 'app/service/position.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit {
  divisions:Division[]= [];
selectedDivision:string;


positions:Position[]=[];

  addPositionRequest:Position={
    pId: 0,
    positionId: undefined,
    divisionId: "",
    name: '',
    description: '',
    createdBy: '',
    createdDate: "2023-07-21T13:28:13.132Z",
    updatedDate: "2023-07-21T13:28:13.132Z",
    updatedBy: '',
    status: 0,
  firstSupervisor:"",
secondSupervisor:"",
thirdSupervisor:"",
forthSupervisor:"",
fifthSupervisor:"",

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
    //  { label: 'assign-supervisor', route:"/admin/assign-supervisor" },
     {
      label: 'Dropdown Example',
      dropdownOptions: [
        { label: 'Option 1', route: '/option1' },
        { label: 'Option 2', route: '/option2' },
        { label: 'Option 3', route: '/option3' }
      ]
    }


  ];
  
  filteredPosition: Position[] = []; 
  searchTerm: string = ''; 
 
constructor(private divisionservice: DivisionService,private positionservice: PositionService,private dialog:MatDialog,private router:Router){}
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
      this.filteredPosition=this.positions;
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
  this.positions.push({ ...this.addPositionRequest });

  this.addPositionRequest = {
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
    firstSupervisor:"",
    secondSupervisor:"",
    thirdSupervisor:"",
    forthSupervisor:"",
    fifthSupervisor:"",

  };
},
 error(response){
  console.log(response)
}
})}
getDivisionName(divisionId: string): string {
  const division = this.divisions.find((g) => g.divisionId === divisionId);
  return division ? (division.description )  : 'Unknown division';
}
onSearch() {
  this.filteredPosition = this.positions;
  if (this.searchTerm.trim() === '') {
 
    this.filteredPosition = this.positions;
  } else {
 
    this.filteredPosition = this.positions.filter(postion => {
      
      return (
        postion.name.toLowerCase().startsWith(this.searchTerm.toLowerCase()) 
       
      );
    });
  }
  }
deletePosition(id: string) {
  const dialogRef = this.dialog.open(DeleteConfirmationComponent);

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      // User confirmed deletion, proceed with the delete request
      this.positionservice.deletePosition(id).subscribe({
        next: () => {
          // Remove the deleted position from the positions array using filter
          this.positions = this.positions.filter((position) => position.positionId !== id);
        },
        error(response) {
          console.log(response);
        },
      });
    }
  });
}
}

