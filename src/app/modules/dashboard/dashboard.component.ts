import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LeaveRequestService } from 'app/service/leaveRequest.service';
import { AttendanceService } from 'app/service/attendance.service';
import { EmployeeService } from 'app/service/employee.service';
import { LeaveRequest } from 'app/models/leaverequestmodel';
import { Attendance } from 'app/models/Attendance.model';
import { Employee } from 'app/models/employee.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

leavedata:LeaveRequest[]=[];
attendancedata:Attendance[]=[];
employeedata:Employee[]=[];
  constructor( private leaveService: LeaveRequestService,
  
    private attendanceservice: AttendanceService,
    private employeeService: EmployeeService,)
     {
   }

  ngOnInit() {
    this.leaveService.getAllLeaveRequest() 
    .subscribe({ 
      next: (lv) => { 
        this.leavedata = lv
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
    ; 
        }, 
  error(response) { 
    console.log(response); 
  }, 
});
     }

}