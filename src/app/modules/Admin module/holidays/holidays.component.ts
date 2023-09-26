import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';
import { Holiday } from 'app/models/holiday';
import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { HolidayService } from 'app/service/holiday';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent {
  holidays:Holiday[]=[];
  holidaySaved:boolean=false
  addholidayRequest: Holiday={
    pId:0,
    id:undefined,
  createdBy: '',
  createdDate: '2023-07-21T13:28:13.132Z',
  updatedDate: '2023-07-21T13:28:13.132Z',
  updatedBy: '',
  status:0,
  year: "",
  date: " ",
  description: " ",

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
     constructor(private holidayService :HolidayService, private router:Router,private dialog:MatDialog,) { }

     ngOnInit(): void {
       this.holidayService.getAllHoliday()
       .subscribe({
         next: (holidays) => {
           this.holidays=holidays;
         },
         error(response){
           console.log(response)
         }
       });
     }
     addholiday(){
   
       this.holidayService.addHoliday(this.addholidayRequest)
       .subscribe({
       next:(holiday)=>{
         this.holidaySaved = true;
         setTimeout(() => {
           this.holidaySaved = false;
         }, 2000);
         this.holidays.push({ ...this.addholidayRequest });
   
         this.addholidayRequest = {

          pId:0,
          id:undefined,
        createdBy: '',
        createdDate: '2023-07-21T13:28:13.132Z',
        updatedDate: '2023-07-21T13:28:13.132Z',
        updatedBy: '',
        status:0,
        year: "",
        date: " ",
        description: " ",
          
       
         };
       },
        error(response){
         console.log(response)
       }
       })}
       deleteholiday(id: string) {
         const dialogRef = this.dialog.open(DeleteConfirmationComponent);
       
         dialogRef.afterClosed().subscribe((result) => {
           if (result) {
             // User confirmed deletion, proceed with the delete request
             this.holidayService.deleteHoliday(id).subscribe({
               next: () => {
                 // Remove the deleted education level from the holidays array using filter
                 this.dialog.open(DeletesucessfullmessageComponent)
                 this.holidayService.getAllHoliday()
       .subscribe({
         next: (holidays) => {
           this.holidays=holidays;
         },
         error(response){
           console.log(response)
         }
       });  },
               error(response) {
                 console.log(response);
               },
             });
           }
         });}

   }
   