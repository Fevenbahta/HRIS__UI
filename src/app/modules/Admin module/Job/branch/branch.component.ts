
import { Router } from '@angular/router';
import { Branch } from 'app/models/job-description.model';
import { BranchService } from 'app/service/branch.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { Component } from '@angular/core';
@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent  {
  branchs:Branch[]=[]
  branchSaved:boolean=false
  addBranchRequest:Branch={
  
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    pid:0,
    name: "",
    city:  "",
    createdBy: '',
    createdDate: "2023-07-21T13:28:13.132Z",
  updatedDate: "2023-07-21T13:28:13.132Z",
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
 
 
   ];
  constructor(private branchservice: BranchService,private router:Router,
    private dialog:MatDialog,
  ){}
  ngOnInit():void {
    this.branchservice.getAllBranch()
    .subscribe({
      next: (branchs) => {
        this.branchs=branchs;
      },
      error(response){
        console.log(response)
      }
    });
  }
  addBranch(){
   
  this.branchservice.addBranch(this.addBranchRequest)
  .subscribe({
  next:(branch)=>{
    this.branchSaved = true;
    setTimeout(() => {
      this.branchSaved = false;
    }, 2000);
    this.branchs.push({ ...this.addBranchRequest });

    this.addBranchRequest = {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      pid:0,
      name: "",
      city:  "",
      createdBy: '',
      createdDate: "2023-07-21T13:28:13.132Z",
    updatedDate: "2023-07-21T13:28:13.132Z",
      updatedBy: '',
      status:0,
     
  
    };
  },
   error(response){
    console.log(response)
  }
  })}
  deleteBranch(id: string) {
    const dialogRef: MatDialogRef<DeleteConfirmationComponent> = this.dialog.open(DeleteConfirmationComponent);
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.branchservice.deleteBranch(id).subscribe({
          next: (response) => {
            // Reload the branch list after successful deletion
            this.branchservice.getAllBranch().subscribe((branchs) => {
              this.branchs = branchs;
            });
  
            // Show a snackbar message to indicate successful deletion
          
          },
          error(response) {
            console.log(response);
          },
        });
      }
    });
  }
  
}
