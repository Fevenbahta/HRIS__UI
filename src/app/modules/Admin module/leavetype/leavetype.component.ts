import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';
import { LeaveType } from 'app/models/leaveType.model';
import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { LeaveTypeService } from 'app/service/leaveType.service';

@Component({
  selector: 'app-leavetype',
  templateUrl: './leavetype.component.html',
  styleUrls: ['./leavetype.component.css']
})
export class LeavetypeComponent {
  leaveTypes:LeaveType[]=[];
  leaveTypeSaved:boolean=false
  addLeaveTypeRequest: LeaveType={
    pId:0,
    leaveTypeId: undefined,
  createdBy: '',
  createdDate: '2023-07-21T13:28:13.132Z',
  updatedDate: '2023-07-21T13:28:13.132Z',
  updatedBy: '',
  status:0,
  leaveTypeName:'',
  maximum:''

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
     constructor(private leaveTypeService :LeaveTypeService,private router:Router,private dialog:MatDialog,) { }

     ngOnInit(): void {
       this.leaveTypeService.getAllLeaveType()
       .subscribe({
         next: (LeaveTypes) => {
           this.leaveTypes=LeaveTypes;
         },
         error(response){
           console.log(response)
         }
       });
     }
     addLeaveType(){
   
       this.leaveTypeService.addLeaveType(this.addLeaveTypeRequest)
       .subscribe({
       next:(LeaveType)=>{
         this.leaveTypeSaved = true;
         setTimeout(() => {
           this.leaveTypeSaved = false;
         }, 2000);
         this.leaveTypes.push({ ...this.addLeaveTypeRequest });
   
         this.addLeaveTypeRequest = {

           pId:0,
           leaveTypeId: undefined,
      createdBy: '',
      createdDate: '2023-07-21T13:28:13.132Z',
      updatedDate: '2023-07-21T13:28:13.132Z',
      updatedBy: '',
      status:0,
      leaveTypeName:'',
      maximum:''
          
       
         };
       },
        error(response){
         console.log(response)
       }
       })}
       deleteLeaveType(id: string) {
         const dialogRef = this.dialog.open(DeleteConfirmationComponent);
       
         dialogRef.afterClosed().subscribe((result) => {
           if (result) {
             // User confirmed deletion, proceed with the delete request
             this.leaveTypeService.deleteLeaveType(id).subscribe({
               next: () => {
                 // Remove the deleted education level from the LeaveTypes array using filter
                 this.dialog.open(DeletesucessfullmessageComponent)
                 this.leaveTypes = this.leaveTypes.filter((leaveType) => leaveType.leaveTypeId !== id);
               },
               error(response) {
                 console.log(response);
               },
             });
           }
         });}

         getLeaveTypeName(Id: string): string { 
          const leaveType = this.leaveTypes.find((g) => g.leaveTypeId === Id); 
          return leaveType ? `${leaveType.leaveTypeName} `:'Unknown EMPLOYEE'; 
        } 
   }
   