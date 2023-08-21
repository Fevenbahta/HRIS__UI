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
    id: undefined,
  createdBy: '',
  createdDate: '2023-07-21T13:28:13.132Z',
  updatedDate: '2023-07-21T13:28:13.132Z',
  updatedBy: '',
  status:0,
  name:'',
  maximum:''

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
       { label: 'LeaveType' , route:"/admin/education-level"},
        { label: 'grade', route:"/admin/grade" },
        { label: 'Supervisor', route:"/admin/supervisor" },
        { label: 'assign-supervisor', route:"/admin/assign-supervisor" },
        { label: 'leave-type', route:"/leave/leave-type" },

   
   
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
        id: undefined,
      createdBy: '',
      createdDate: '2023-07-21T13:28:13.132Z',
      updatedDate: '2023-07-21T13:28:13.132Z',
      updatedBy: '',
      status:0,
      name:'',
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
                 this.leaveTypes = this.leaveTypes.filter((leaveType) => leaveType.id !== id);
               },
               error(response) {
                 console.log(response);
               },
             });
           }
         });}
   }
   