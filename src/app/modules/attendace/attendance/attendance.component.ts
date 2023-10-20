import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Attendance } from 'app/models/Attendance.model';
import { Employee } from 'app/models/employee.model';
import { AttendanceService } from 'app/service/attendance.service';
import { EmployeeService } from 'app/service/employee.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent {
  buttons = [
    { label: ' Attendance', route: '/attendance' },

  ];
  showAttendanceForm: boolean = false;
  AttendanceSaved:string;
  Attendances:Attendance[]=[]
  employees:Employee[]=[]; 
  selectedEmployee:string
  selectedAttendanceId:string
  employee:Employee
  attendanceUpdate:boolean=false
  filteredAttendances: Attendance[]; // Array to hold filtered attendances
  fromDate: string; // Variable to store the "From" date
  toDate: string;
  addAttendance(){

  }


  uploadSuccessMessage: string = '';
  uploadErrorMessage: string = '';
  selectedFile: File | null = null;

  constructor(private attendanceService: AttendanceService,
    private employeeService:EmployeeService, ) {}
    
    ngOnInit(): void { 
this.attendanceService.getAllAttendance().subscribe({
  next: (at) => { 
    // this.leaveRequest.empId = this.selectedEmployee; 
    this.Attendances=at 
   }, 
  error: (response) => { 
    console.log(response); 
  } 

})

  
      this.employee = {
        pId: 0, // You can add any specific validation rule here, like Validators.required 
        createdBy: "string",
        createdDate:  "2023-07-25T09:28:33.440Z", 
        updatedDate: "2023-07-25T09:28:33.440Z", 
        updatedBy: 'string', 
        empId: "9077603c-0a6b-40ce-9dc7-0b822af3ccb2", // You can add any specific validation rule here, like Validators.required 
        ecxId: 'ecx/pi', 
        adId: 'ad/pi', 
        firstName:'', 
        middleName: '', 
        lastName: '',
        joinDate: '2023-07-25T09:28:33.440Z', 
        sex: '', 
        dateOfBityh: '2023-07-25T09:28:33.440Z', 
        placeOfBith: '', 
        martialStatus: '', 
        salutation: '', 
        nationality: '', 
        pensionNo: '', 
        imageData: '', 
        crime: false, 
        crimeDescription: " ", 
        attendanceId:undefined,
        status: 0, 
      };
  
    this.employeeService.getAllEmployees()  
    .subscribe({  
      next: (employees) => { 
        // this.leaveRequest.empId = this.selectedEmployee; 
        this.employees=employees 
       }, 
      error: (response) => { 
        console.log(response); 
      } 
    }); 
    }

    filterByDateRange() {
      if (this.fromDate && this.toDate) {
        let fromDate = new Date(this.fromDate);
        let toDate = new Date(this.toDate);
    
        // Subtract one day from the "From" date
        fromDate.setDate(fromDate.getDate() - 1);
    
        this.filteredAttendances = this.Attendances.filter(at => {
          const attendanceDate = new Date(at.date);
          return attendanceDate >= fromDate && attendanceDate <= toDate;
        });
      } else {
        // If both dates are not selected, show all attendances
        this.filteredAttendances = this.Attendances;
      }
    }
    
    
    
    
    
    toggleAttendanceForm() {
      this.showAttendanceForm = !this.showAttendanceForm;
    }
    onEmployeeSelected(){
      this.employeeService.getEmployee(this.selectedEmployee)
.subscribe({
    
  next: (employees) => { 
    
    this.employee=employees;
    this.employee.attendanceId=this.selectedAttendanceId
  
  }})
    }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(): void {
    if (this.selectedFile) {
      console.log('Upload Response:', this.selectedFile);
      this.attendanceService.importAttendance(this.selectedFile)
        .subscribe(
          (response) => {
            
            this.uploadSuccessMessage = 'File uploaded successfully.';
            this.uploadErrorMessage = '';
            console.log('Upload Response:', response);
          },
          (error) => {
            this.uploadErrorMessage = 'Error uploading file. Please try again.';
            this.uploadSuccessMessage = '';
            console.error('Upload Error:', error);
          }
        );
    } else {
      this.uploadErrorMessage = 'Please select a file to upload.';
      this.uploadSuccessMessage = '';
    }
  }


  updateEmployee(): void {

    this.attendanceService.updateAttendance(this.employee,this.selectedEmployee )
    .subscribe({
    
      next: (contact) => { 
        
        this.attendanceUpdate=true;
        setTimeout(() => {
          this.attendanceUpdate= false;
        }, 2000);}})
}
getEmployeeName(empId: string): string { 
  const employee = this.employees.find((g) => g.empId === empId); 
  //console.log(employee.firstName)
  return employee ? `${employee.firstName}  ${employee.middleName} ${employee.lastName}`:'Unknown EMPLOYEE'; 
}}