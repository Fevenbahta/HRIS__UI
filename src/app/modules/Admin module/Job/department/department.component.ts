import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';
import { Department } from 'app/models/education.model';

import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { DepartmentService } from 'app/service/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
departments:Department[]=[];
departmentSaved:boolean=false
filteredDepartment: Department[] = []; 
searchTerm: string = ''; 

  addDepartmentRequest: Department={
    description:'',
     pid:0,
     departmentId:undefined,
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
   
   
     ];
  constructor(
    private departmentService :DepartmentService,
    private router:Router,private dialog:MatDialog,) { }

  ngOnInit(): void {
    this.departmentService.getAllDepartment()
    .subscribe({
      next: (departments) => {
        this.departments=departments;
        this.filteredDepartment=departments
      },
      error(response){
        console.log(response)
      }
    });
  }
  addDepartment(){

    this.departmentService.addDepartment(this.addDepartmentRequest)
    .subscribe({
    next:(department)=>{
      this.departmentSaved = true;
      setTimeout(() => {
        this.departmentSaved = false;
      }, 2000);
      this.departments.push({ ...this.addDepartmentRequest });

      this.addDepartmentRequest = {
        description:'',
        pid:0,
        departmentId:undefined,
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
    onSearch() {
      this.filteredDepartment = this.departments;
      if (this.searchTerm.trim() === '') {
     
        this.filteredDepartment = this.departments;
      } else {
     
        this.filteredDepartment = this.departments.filter(department => {
          
          return (
            department.description.toLowerCase().startsWith(this.searchTerm.toLowerCase()) 
           
          );
        });
      }
      }
    deleteDepartment(id: string) {
      const dialogRef: MatDialogRef<DeleteConfirmationComponent> 
      = this.dialog.open(DeleteConfirmationComponent);
    
      dialogRef.afterClosed().subscribe((result) => {
        if (result === true) {
          // User confirmed deletion, proceed with the delete request
          this.departmentService.deleteDepartment(id).subscribe({
            next: () => {
              this.dialog.open(DeletesucessfullmessageComponent)
              this.departmentService.getAllDepartment().subscribe((departments) => {
                this.filteredDepartment = departments;
              });
    
            },
            error(response) {
              console.log(response);
            },
          });
        }
      });}

      
}
