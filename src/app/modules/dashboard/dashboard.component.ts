import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LeaveRequestService } from 'app/service/leaveRequest.service';
import { AttendanceService } from 'app/service/attendance.service';
import { EmployeeService } from 'app/service/employee.service';
import { LeaveRequest } from 'app/models/leaverequestmodel';
import { Attendance } from 'app/models/Attendance.model';
import { Employee } from 'app/models/employee.model';
import { PromotionhistoryComponent } from '../Promotion/promotionhistory/promotionhistory.component';
import { PromotionService } from 'app/service/promotion.service';
import { Promotion, PromotionRelation } from 'app/models/vacancy/promotion.model';
import { PromotionRelationService } from 'app/service/promotionrelation.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

leavedata:LeaveRequest[]=[];
attendancedata:Attendance[]=[];
employeedata:Employee[]=[];
promotion:PromotionRelation[]=[];
noemployees:Number;
noleaverequests:Number;
status:string="Admin-Approved"
nopromotion:Number=0;
  constructor( private leaveService: LeaveRequestService,
  
    private attendanceservice: AttendanceService,
    private employeeService: EmployeeService,
    private promotionservice:PromotionRelationService )
     {
   }

  ngOnInit() {
    this.leaveService.getAllLeaveRequestByStatus(this.status) 
    .subscribe({ 
      next: (lv) => { 
        const currentDate = new Date();
         const oneMonthLater = new Date();
         oneMonthLater.setMonth(currentDate.getMonth() + 1);
         
        this.leavedata = lv.filter(item => {
          const endDate = new Date(item.endDate);
        
          // Check if the endDate is within one month from the current date
          return endDate <= oneMonthLater;
        });
        this.noleaverequests=this.leavedata.length
  
            }, 
      error(response) { 
        console.log(response); 
      }, 
  });
  this.attendanceservice.getAllAttendance() 
  .subscribe({ 
    next: (at) => { 
      this.attendancedata = at;
      ; 
          }, 
    error(response) { 
      console.log(response); 
    }, 
});
this.employeeService.getAllEmployees() 
.subscribe({ 
  next: (em) => { 
    this.employeedata = em;
    this.noemployees=this.employeedata.length
    ; 
        }, 
  error(response) { 
    console.log(response); 
  }, 
});
this.promotionservice.getpromotionRelationByStatus(this.status) 
.subscribe({ 
  next: (pr) => { 
    this.promotion = pr
    this.nopromotion=this.promotion.length;
    ; 
        }, 
  error(response) { 
    console.log(response); 
  }, 
});

     }

}