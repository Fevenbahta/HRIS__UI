import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Employee } from 'app/models/employee.model';
import { EmployeeService } from 'app/service/employee.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  searchTerm: string = ''; 

  filteredEmployees: Employee[] = []; 
  employees:Employee[]= []; 
  allEmployees:any=[]; 
  searchText:string[]; 
    buttons = [    
      { label: ' Add Employee ', route: '/employee-registration' }, 
      { label: '  List Employee ', route: '/employee-list' },
      {label:'Employee History', route:'/history'}
    ] 
  dataSource: any; 

 
constructor(private employeeservice: EmployeeService, 
  private dialog: MatDialog, 
  private router: Router , 
  ){ 
    
  } 
ngOnInit(): void{ 

this.employeeservice.getAllEmployees() 
.subscribe({ 
  next: (employees) => { 
    this.employees=employees; 

    const lastEmployee = this.employees.pop(); 
    this.employees.unshift(lastEmployee); 
    this.employees.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()); 
  }, 
     
  error(response){ 
    console.log(response) 
  } 
}); 
 

} 
 
 
 
getEmployees() {  
  this.employeeservice.getAllEmployees().subscribe(  
    (employees) => {  
      this.employees = employees;  
    },  
    (error) => {  
      console.log(error);  
    }  
  );  
}  

onSearch() {
  this.filteredEmployees = this.employees.filter(employee => {
    return (
      employee.ecxId.toLowerCase() === this.searchTerm.toLowerCase() &&
      employee.status === 1
    );
  });
}




  
  
 

 
// private showSnackBar(message: string, panelClass: string = 'mat-toolbar') { 
//   this.snackBar.open(message, 'Close', { 
//     duration: 3000, 
//     panelClass: ['mat-toolbar', panelClass], 
//   }); 
// } 
editEmployee(employee: Employee): void { 
  // Here, we will navigate to the edit page for the selected EmergencyContact. 
  this.router.navigate(["/edit-employee", employee.empId]); 
} 
  
  



  // buttons = [    
  //   { label: ' Add Employee ', route: '/employee-registration' }, 
  //   { label: '  List Employee ', route: '/employee-list' },
  //   {label:'Employee History', route:'/history'}
  // ] 
}



