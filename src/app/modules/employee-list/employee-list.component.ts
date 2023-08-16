import { ChangeDetectorRef, Component, SimpleChanges } from '@angular/core'; 
import { Router } from '@angular/router'; 
import { Employee, Supervisor } from 'app/models/employee.model'; 
import { EmployeeService } from 'app/service/employee.service'; 
import { MatDialog } from '@angular/material/dialog'; 
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component'; 

import { SupervisorService } from 'app/service/supervisor.service';

@Component({ 
  selector: 'app-employee-list', 
  templateUrl: './employee-list.component.html', 
  styleUrls: ['./employee-list.component.scss'] 
}) 
 
 
export class EmployeeListComponent { 
  searchTerm: string = ''; 
  pageSize: number = 10; 
  currentPage: number = 1; 

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
  private changeDetectorRef: ChangeDetectorRef, 
 
 private supervisorService:SupervisorService,
  // private snackBar: MatSnackBar, 
  private router: Router , 
  ){ 
    
  } 

ngOnInit(): void{ 

this.employeeservice.getAllEmployees() 
.subscribe({ 
  next: (employees) => { 
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
  
    this.employees=employees; 
    this.filteredEmployees = employees;
    const lastEmployee = this.employees.pop(); 
    this.employees.unshift(lastEmployee); 
    this.employees.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()); 
    this.filteredEmployees = this.employees.slice(startIndex, endIndex);
  }, 
     
  error(response){ 
    console.log(response) 
  } 
}); 
 

} 
 

onNextPage() {
  this.currentPage++;
  this.updateFilteredEmployees();
}

// Function to handle the "Previous" button click
onPreviousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.updateFilteredEmployees();
  }}
  
 
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
private updateFilteredEmployees() {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;

  this.filteredEmployees = this.employees.slice(startIndex, endIndex);
  
}

onSearch() {


 // this.filteredEmployees = this.employees; 
  if (this.searchTerm.trim() === '') {
 
    this.filteredEmployees = this.employees;
  } else {
 
    this.filteredEmployees = this.employees.filter(employee => {
      
      return (
        employee.firstName.toLowerCase().startsWith(this.searchTerm.toLowerCase()) ||
        employee.middleName.toLowerCase().startsWith(this.searchTerm.toLowerCase()) ||
        employee.sex.toLowerCase().startsWith(this.searchTerm.toLowerCase()) ||
        employee.ecxId.toLowerCase().includes(this.searchTerm.toLowerCase()) 
       
      );
      
      this.changeDetectorRef.detectChanges();
    });
  }
 
  }


  
  
 
deleteEmployee(id: string) { 
  // Open the confirmation dialog 
  const dialogRef = this.dialog.open(DeleteConfirmationComponent, { 
    width: '400px', 
  }); 
 
  // After the dialog is closed (by clicking Confirm or Cancel button) 
  dialogRef.afterClosed().subscribe((result) => { 
    // If the user confirms the deletion, proceed with the deletion 
    if (result === true) { 
      this.employeeservice.deleteEmployee(id).subscribe( 
        () => { 
          // Update the employee list by filtering out the deleted employee 
          this.employees = this.employees.filter((employee) => employee.empId !== id); 
          // Show a success message 
          // this.showSnackBar('Employee deleted successfully!'); 
          this.router.navigate(["/edit-employee"]); 
          alert('Contact deleted successfully!');
        }, 
        (error) => { 
          console.log(error); 
          // Show an error message 
          // this.showSnackBar('Failed to delete the employee. Please try again later.', 'mat-warn'); 
        } 
      ); 
    } 
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
  
  
 
 
getFirstSupervisorName(firstSupervisor: string): string { 
  const employee = this.employees.find((g) => g.empId === firstSupervisor); 
  return employee ? `${employee.firstName}  ${employee.middleName} ${employee.lastName}`:'Unknown EMPLOYEE'; 
} 
getSecondSupervisorName(secondSupervisor: string): string { 
  const employee = this.employees.find((g) => g.empId === secondSupervisor); 
  return employee ? `${employee.firstName}  ${employee.middleName} ${employee.lastName}`:'Unknown EMPLOYEE'; 
} 


}
