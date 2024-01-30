import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LeaveRequestService } from 'app/service/leaveRequest.service';
import { AttendanceService } from 'app/service/attendance.service';
import { EmployeeService } from 'app/service/employee.service';
import { LeaveRequest } from 'app/models/leaverequestmodel';
import { Attendance } from 'app/models/Attendance.model';
import { Employee } from 'app/models/employee.model';


import * as Dashboards from '@highcharts/dashboards/dashboards';
import DataGrid from '@highcharts/dashboards/es-modules/DataGrid/DataGrid';
import * as Highcharts from 'highcharts';
import HighchartsPlugin from '@highcharts/dashboards/es-modules/Dashboards/Plugins/HighchartsPlugin';
import DataGridPlugin from '@highcharts/dashboards/es-modules/Dashboards/Plugins/DataGridPlugin';
import { EmployeePosition } from 'app/models/job-description.model';
import { EmployeePositionService } from 'app/service/employee-position';

HighchartsPlugin.custom.connectHighcharts(Highcharts as any);
(Dashboards.PluginHandler as any).addPlugin(HighchartsPlugin);

DataGridPlugin.custom.connectDataGrid(DataGrid);
(Dashboards.PluginHandler as any).addPlugin(DataGridPlugin);


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

leavedata:LeaveRequest[]=[];
attendancedata:Attendance[]=[];
employeedata:Employee[]=[];
employeepostion:EmployeePosition[]=[];
chartData: any[] = [];

private options = {};
private readonly isAsync = true;


  constructor( public elementRef: ElementRef,private leaveService: LeaveRequestService,
  
    private attendanceservice: AttendanceService,
    private employeeService: EmployeeService,
    private employeepostionservice:EmployeePositionService)
     {
   }
   @ViewChild('genderChartContainer') genderChartContainer!: ElementRef;
   @ViewChild('departmentChartContainer') departmentChartContainer!: ElementRef;
  ngOnInit() {

    this.loadData();

}
buttons = [
 

];

private loadData() {
  // Fetch employee data
  this.employeeService.getAllEmployees()  
    .subscribe({  
      next: (data) => { 
        // this.leaveRequest.empId = this.selectedEmployee; 
        this.employeedata=data 
       
        this.chartData = this.prepareChartData(data)
        this.initChart();  
        console.log("emm", this.chartData.length)
       }, 
      error: (error) => { 
        console.error('Error fetching employee data:', this.chartData );
      } 
    }); 
    
  }

  

private prepareChartData(employees: Employee[]): any[] {
  // Example: Count employees by gender for the chart
  const totalCount = employees.length;
  const maleCount = employees.filter((emp) => emp.sex === 'male').length;
  const femaleCount = employees.filter((emp) => emp.sex === 'female').length;

  return [

    { name: 'Male', y: maleCount },
    { name: 'Female', y: femaleCount },

  ];
}


private initChart() {
  // Check if chartData is available
  if (this.chartData && this.chartData.length > 0) {
    const departmentData = this.getDepartmentData();
    // Initialize Highcharts chart
    Highcharts.chart(this.genderChartContainer.nativeElement, {
      chart: {
        type: 'column', // Set chart type to 'column' for clustered columns
      },
      title: {
        text: 'Employee Gender Distribution',
      },
      xAxis: {
     
        categories: this.chartData.map(dataPoint => dataPoint.name),
        title: {
          text: 'Gender',
        },
      },
      yAxis: {
       
        title: {
          text: 'Number of Employees',
        },
      },
      plotOptions: {
        column: {
         // groupPadding: 0.11, // Adjust groupPadding to minimize gap between groups
          pointPadding: 0.22, // Adjust pointPadding to minimize gap between points within a group
        },
      },
      series: [{
        type:'column',
        name: 'Male', // You can customize these names as needed
        data: this.chartData.map(dataPoint => (dataPoint.name === 'Male' ? dataPoint.y : null)),
      }, {
        type:'column',
        name: 'Female', // You can customize these names as needed
        data: this.chartData.map(dataPoint => (dataPoint.name === 'Female' ? dataPoint.y : null)),
      }],
    });
  

  Highcharts.chart(this.departmentChartContainer.nativeElement, {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Employee Distribution by Department',
    },
    series: [{
      type:"pie",
      name: 'Employees',
      data: departmentData,
    }],
  });
}

else {
    console.error('No chart data available.');
  }
}
 private getDepartmentData(): any[] {
  // Example: Extracting department data (replace this with your actual data)
  return [
    { name: 'Department A', y: 20 },
    { name: 'Department B', y: 30 },
    // ... Add data for other departments
  ];
}
}