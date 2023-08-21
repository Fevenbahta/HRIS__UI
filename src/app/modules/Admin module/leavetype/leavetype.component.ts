import { Component } from '@angular/core';

@Component({
  selector: 'app-leavetype',
  templateUrl: './leavetype.component.html',
  styleUrls: ['./leavetype.component.css']
})
export class LeavetypeComponent {
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
     constructor(private LeaveTypeService :LeaveTypeService,private router:Router,private dialog:MatDialog,) { }

     ngOnInit(): void {
       this.LeaveTypeService.getAllLeaveTypes()
       .subscribe({
         next: (LeaveTypes) => {
           this.LeaveTypes=LeaveTypes;
         },
         error(response){
           console.log(response)
         }
       });
     }
     addLeaveType(){
   
       this.LeaveTypeService.addLeaveType(this.addLeaveTypeRequest)
       .subscribe({
       next:(LeaveType)=>{
         this.LeaveTypeSaved = true;
         setTimeout(() => {
           this.LeaveTypeSaved = false;
         }, 2000);
         this.LeaveTypes.push({ ...this.addLeaveTypeRequest });
   
         this.addLeaveTypeRequest = {
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
       deleteLeaveType(id: string) {
         const dialogRef = this.dialog.open(DeleteConfirmationComponent);
       
         dialogRef.afterClosed().subscribe((result) => {
           if (result) {
             // User confirmed deletion, proceed with the delete request
             this.LeaveTypeService.deleteLeaveType(id).subscribe({
               next: () => {
                 // Remove the deleted education level from the LeaveTypes array using filter
                 this.dialog.open(DeletesucessfullmessageComponent)
                 this.LeaveTypes = this.LeaveTypes.filter((LeaveType) => LeaveType.id !== id);
               },
               error(response) {
                 console.log(response);
               },
             });
           }
         });}
   }
   