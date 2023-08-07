import { Component, SimpleChanges } from '@angular/core'; 
import { Router } from '@angular/router'; 
import { Employee } from 'app/models/employee.model'; 
import { EmployeeService } from 'app/service/employee.service'; 
import { MatDialog } from '@angular/material/dialog'; 
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component'; 
import { Ng2FilterPipeModule } from 'ng2-filter-pipe'; 
 
@Component({ 
  selector: 'app-employee-list', 
  templateUrl: './employee-list.component.html', 
  styleUrls: ['./employee-list.component.scss'] 
}) 
 
 
export class EmployeeListComponent { 
  searchTerm: string = ''; 
   
  filteredEmployees: any[] = []; 
  employees:Employee[]= []; 
  allEmployees:any=[]; 
  searchText:string[]; 
    buttons = [    
      { label: ' Add Employee ', route: '/employee-registration' }, 
      { label: '  List Employee ', route: '/employee-list' } 
    ] 
  dataSource: any; 
 
constructor(private employeeservice: EmployeeService, 
  private dialog: MatDialog, 
 
 
  // private snackBar: MatSnackBar, 
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
    this.employees.sort((a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()); 
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
// ngOnChanges(changes: SimpleChanges) { 
//   if (changes.searchTerm) { 
//     if (this.searchTerm === '') { 
//       this.filteredEmployees = this.employees; 
//     } else { 
//       this.filteredEmployees = this.employees.filter((employees) => { 
//         return employees.firstName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1; 
        
//       }); 
//     } 
//   }} 
 
onSearch() { 
 this.filteredEmployees = []; 
 this.filteredEmployees = this.employees; 
    this.employees = this.employees.filter((employees) => { 
      return employees.firstName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1; 
      
    }); 
     
    if (this.searchTerm === '') { 
     this.filteredEmployees = this.employees; 
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
